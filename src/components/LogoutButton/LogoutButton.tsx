"use client";

import { Button } from "antd";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleClick = async () => {
    await signOut({ callbackUrl: "/login-as" });
  };
  return (
    <Button style={{width:"80px",height:"30px !important"}} onClick={handleClick}>
      Logout
    </Button>
  );
}
