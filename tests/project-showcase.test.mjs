import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const dataUrl = (source) =>
  "data:text/javascript;base64," +
  Buffer.from(
    ts.transpile(source, {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    }),
  ).toString("base64");

test("studio motion retains reduced-motion and cleanup paths", async () => {
  const motion = await readFile(
    new URL("app/lib/use-studio-motion.ts", root),
    "utf8",
  );
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const styles = await readFile(new URL("app/studio.css", root), "utf8");
  assert.match(motion, /lenis\.destroy\(\)/);
  assert.match(motion, /cancelAnimationFrame\(frame\)/);
  assert.match(motion, /syncTouch: false/);
  assert.match(motion, /if \(!enabled\) return/);
  assert.match(page, /onPointerCancel/);
  assert.match(page, /const direction =/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /--tile-radius: 16px/);
  assert.match(styles, /linear-gradient\(/);
});

test("every real project is assigned to exactly one homepage section", async () => {
  const projectModule = dataUrl(
    await readFile(new URL("app/lib/projects.ts", root), "utf8"),
  );
  const { projects } = await import(projectModule);
  const allocationSource = await readFile(
    new URL("app/lib/project-showcase.ts", root),
    "utf8",
  );
  const {
    heroProjects,
    reelProjects,
    serviceProjects,
    workProjects,
    pendingProjectCaptures,
    showcaseProjects,
  } = await import(
    dataUrl(
      allocationSource.replace('"./projects"', JSON.stringify(projectModule)),
    )
  );
  const allocated = [
    ...heroProjects,
    ...reelProjects,
    ...serviceProjects.flat(),
    ...workProjects,
  ];
  assert.equal(projects.length, 61);
  assert.equal(
    allocated.length + pendingProjectCaptures.length,
    projects.length,
  );
  assert.equal(allocated.length, showcaseProjects.length);
  assert.equal(allocated.length, 59);
  for (const field of ["title", "image", "url"]) {
    assert.equal(
      new Set(allocated.map((project) => project[field])).size,
      allocated.length,
      field + " must not repeat across sections",
    );
  }
  assert.equal(serviceProjects.length, 6);
  assert.ok(serviceProjects.every((group) => group.length === 3));
  for (const project of allocated) {
    assert.match(project.url, /^https:\/\//);
    assert.doesNotMatch(
      project.image,
      /studio-hero|mobile-product|automation-product/,
    );
  }
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.doesNotMatch(
    page,
    /Product concept|serviceMedia|studio-hero|mobile-product|automation-product/,
  );
  assert.match(page, /serviceProjects\[service\]\.map/);
  assert.match(page, /reelProjects\.slice/);
  assert.match(page, /\? workProjects/);
});
