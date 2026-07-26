import { getAdminFromCookies } from "@/app/lib/admin-auth";
import { AdminDashboard } from "@/app/components/AdminDashboard";
import { AdminLogin } from "@/app/components/AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getAdminFromCookies();

  return admin ? <AdminDashboard admin={admin} /> : <AdminLogin />;
}
