import type { Metadata } from "next";
import { InfoPage } from "@/tenants/fullstack/components/InfoPage";
import { infoPages } from "@/tenants/fullstack/info-content";

export const metadata: Metadata = {
  title: "Morgan Retailers Terms of Use",
  description: "Plain-language terms for using Morgan Retailers and starting a project.",
};

export default function TermsOfUsePage() {
  return <InfoPage content={infoPages["terms-of-use"]} />;
}
