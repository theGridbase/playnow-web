"use client";
import { Button, Divider } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

type loginType = "owner" | "customer" | "social";

export default function LoginAs() {
  const router = useRouter();

  const handleClick = (type: loginType) => {
    const params = new URLSearchParams();
    params.set("type", type);
    router.push(`/login/?${params.toString()}`);
  };

  return (
    <div>
      <Button
        type="primary"
        shape="round"
        block
        size="large"
        className="mb-middle"
        onClick={() => handleClick("customer")}
      >
        Login as customer
      </Button>
      <Button
        type="default"
        shape="round"
        block
        size="large"
        className="mb-middle"
        onClick={() => handleClick("owner")}
      >
        Login as owner
      </Button>

      <Divider>or</Divider>

      <Button
        type="primary"
        shape="round"
        block
        size="large"
        className="mb-middle"
        onClick={() => handleClick("social")}
      >
        Login With Google
      </Button>
    </div>
  );
}
