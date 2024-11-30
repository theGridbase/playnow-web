"use client";

import { Button } from "antd";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleClick = async () => {
    await signOut({ callbackUrl: "/login-as" });
  };
  return (
    <Button type="primary" size="large" shape="round" onClick={handleClick}>
      Logout
    </Button>
  );
}
