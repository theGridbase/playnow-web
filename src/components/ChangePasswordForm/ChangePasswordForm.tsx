"use client";
import Link from "next/link";
import React, { useState } from "react";
import Icon from "../ui/Icon/Icon";
import styles from "@/styles/components/changepasswordform.module.scss";
import { Button, Empty, Form, Input, message } from "antd";
import { IChangePasswordProps } from "@/app/_lib/interfaces";
import { changePasswordRequest } from "./action";
import { signIn } from "next-auth/react";
import { useNotification } from "../context/NotificationContext/NotificationContextProvider";

type FieldType = {
  password: string;
  confirmPassword?: string;
};

export default function ChangePasswordForm({ token }: IChangePasswordProps) {
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();

  const onFinish = async (d: FieldType) => {
    setLoading(true);
    const response = await changePasswordRequest(token, d.password);
    if (response.status !== 200) {
      setLoading(false);
      openNotification("error", "Error!", response.message);
      return;
    }

    if (response.data) {
      const response2 = await signIn("credentials", {
        user: JSON.stringify(response.data.user),
        access_token: response.data.tokens.access.token,
        refresh_token: response.data.tokens.refresh.token,
        redirect: false,
      });
      setLoading(false);
      if (response2?.status === 200) {
        openNotification("success", "Success!", "successfull login");
        window.location.reload();
      }
      return;
    }
    setLoading(false);
  };
  const onFinishFailed = () => {};

  if (!token) {
    return <Empty description="Invalid exception" />;
  }

  return (
    <div className={styles.changePasswordContainer}>
      <Link href={"/forget-password"} className="mb-large">
        <Icon name="back-arrow.svg" size="24" />
      </Link>
      <h1 className={styles.stepHeading}>Change Password</h1>
      <p className={styles.stepDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        condimentum, lacus
      </p>

      <Form
        layout="vertical"
        name="forget-password"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          className="mb-ex-large"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" size="large" />
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            shape="round"
            disabled={loading}
            loading={loading}
          >
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
