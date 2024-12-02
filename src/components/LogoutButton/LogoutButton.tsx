"use client";

import { Button } from "antd";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleClick = async () => {
    await signOut({ callbackUrl: "/login-as" });
  };
  return (
    <Button
      style={{ width: "80px", minHeight: "30px !important" }}
      onClick={handleClick}
      type="primary"
    >
      Logout
    </Button>
  );
}
