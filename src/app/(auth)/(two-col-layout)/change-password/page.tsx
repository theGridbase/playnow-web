import { DynamicImport } from "@/components/dynamicImport";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: { token?: string };
}

export default function page({ searchParams }: PageProps) {
  const token = searchParams.token;
  if (!token) {
    redirect("/forget-password");
  }
  return (
    <div>
      <DynamicImport
        components={[{ type: "changePasswordForm", token: token }]}
      />
    </div>
  );
}
