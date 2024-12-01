"use client";
import { Button, Divider, Flex } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "@/styles/components/loginas.component.module.scss";
import {
  GoogleOutlined,
  FacebookOutlined,
  FacebookFilled,
} from "@ant-design/icons";
type loginType = "owner" | "customer" | "social";

export default function LoginAs() {
  const router = useRouter();

  const handleClick = (type: loginType) => {
    const params = new URLSearchParams();
    params.set("type", type);
    router.push(`/login/?${params.toString()}`);
  };

  return (
    <div className={styles.loginAsSection}>
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
        onClick={() => handleClick("owner")}
        className={styles.borderedBtn}
      >
        Login as owner
      </Button>

      <Divider>or</Divider>

      <Flex align="center" justify="start" gap={10}>
        <Button
          type="primary"
          shape="round"
          size="large"
          className={styles.socialBtn}
          onClick={() => handleClick("social")}
          icon={<GoogleOutlined />}
        >
          Login With Google
        </Button>

        <Button
          type="primary"
          shape="round"
          size="large"
          className={`${styles.socialBtn} ${styles.facebookBtn}`}
          onClick={() => handleClick("social")}
          icon={<FacebookFilled />} // Add Google icon here
          disabled
        >
          Login With Facebook
        </Button>
      </Flex>
    </div>
  );
}
