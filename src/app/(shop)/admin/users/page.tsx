export const revalidate = 0;

import { redirect } from "next/navigation";

import { UsersTable } from "./ui/UsersTable";
import { Title } from "@/components/ui/title/Title";
import { getUsers } from "@/actions/users/get-users.action";

export default async function OrdersPage() {
  const { ok, users = [] } = await getUsers();

  if (!ok) {
    redirect("/login");
  }

  return (
    <>
      <Title title="Users" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
