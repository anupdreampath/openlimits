import { getAdminFromCookies } from "@/app/lib/admin-auth";
import { AdminDashboard, AdminView } from "@/app/components/AdminDashboard";
import { AdminLogin } from "@/app/components/AdminLogin";

export async function AdminRoute({ view }: { view: AdminView }) {
  const admin = await getAdminFromCookies();

  return admin ? <AdminDashboard admin={admin} view={view} /> : <AdminLogin />;
}
