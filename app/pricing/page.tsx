import type { Metadata } from "next";
import { InfoPage } from "@/app/components/InfoPage";
import { infoPages } from "@/app/info-content";

export const metadata: Metadata = {
  title: "Open Limits Pricing",
  description: "Custom Shopify design pricing, flexible payments, Fiverr, and Upwork options.",
};

export default function PricingPage() {
  return <InfoPage content={infoPages.pricing} />;
}
