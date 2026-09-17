import type { Metadata } from "next";
import { InfoPage } from "@/tenants/fullstack/components/InfoPage";
import { infoPages } from "@/tenants/fullstack/info-content";

export const metadata: Metadata = {
  title: "About Morgan Retailers",
  description: "The story, team philosophy, and working style behind Morgan Retailers.",
};

export default function AboutPage() {
  return <InfoPage content={infoPages.about} />;
}
