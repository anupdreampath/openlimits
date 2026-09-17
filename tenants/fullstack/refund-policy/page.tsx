import type { Metadata } from "next";
import { InfoPage } from "@/tenants/fullstack/components/InfoPage";
import { infoPages } from "@/tenants/fullstack/info-content";

export const metadata: Metadata = {
  title: "Morgan Retailers Refund Policy",
  description: "Lenient refund and milestone terms for Morgan Retailers service projects.",
};

export default function RefundPolicyPage() {
  return <InfoPage content={infoPages["refund-policy"]} />;
}
