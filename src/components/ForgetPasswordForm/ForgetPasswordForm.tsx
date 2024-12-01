"use client";

import { Button, Form, Input, message } from "antd";
import styles from "@/styles/components/forgetpasswordform.module.scss";
import Icon from "../ui/Icon/Icon";
import Link from "next/link";
import { forgetPasswordRequest } from "./action";
import { useState } from "react";
import { useNotification } from "../context/NotificationContext/NotificationContextProvider";

type FieldType = {
  email: string;
};

export default function ForgetPasswordForm() {
  const [laoding, setLoading] = useState(false);
  const { openNotification } = useNotification();

  const onFinish = async (d: FieldType) => {
    setLoading(true);
    const response = await forgetPasswordRequest(d.email);
    setLoading(false);
    if (response.status !== 200) {
      openNotification(
        "error",
        "Error!",
        response.message || "something went wrong"
      );
      return;
    }

    openNotification(
      "success",
      "Success!",
      "Verifification has beend send to your email!"
    );
  };
  const onFinishFailed = () => {};
  return (
    <div className={styles.forgetPasswordContainer}>
      <Link href={"/login"} className="mb-large">
        <Icon name="back-arrow.svg" size="24" />
      </Link>
      <h1 className={styles.stepHeading}>Forget Password</h1>
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
          label="Email address"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          className="mb-ex-large"
        >
          <Input placeholder="Email address" size="large" />
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            shape="round"
            disabled={laoding}
            loading={laoding}
          >
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
