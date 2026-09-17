import type { Metadata } from "next";
import { InfoPage } from "@/tenants/fullstack/components/InfoPage";
import { infoPages } from "@/tenants/fullstack/info-content";

export const metadata: Metadata = {
  title: "Morgan Retailers Support",
  description: "Post-launch support terms and how to contact Morgan Retailers.",
};

export default function SupportPage() {
  return <InfoPage content={infoPages.support} />;
}
