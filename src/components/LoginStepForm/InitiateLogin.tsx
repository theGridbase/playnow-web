import { Button, Checkbox, Divider, Flex, Form, Input, message } from "antd";
import React, { useState } from "react";
import Link from "next/link";

import Icon from "../ui/Icon/Icon";
import { NextStepType } from "./LoginStepForm";
import { initiateLogin } from "./action";
import { signIn, signOut } from "next-auth/react";
import styles from "@/styles/components/loginstepform.module.scss";

interface Props {
  next: (args: NextStepType) => void;
}

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

export default function InitiateLogin({ next }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async () => {
    signIn("google");
  };

  const onFinish = async (d: FieldType) => {
    setLoading(true);
    const { remember, ...rest } = d;
    const response = await initiateLogin(rest);
    setLoading(false);
    if (response.status !== 200) {
      message.error(response.message);
      return;
    }

    next({ ...response.data });
  };
  const onFinishFailed = () => {};
  return (
    <div className={styles.stepContainer}>
      <h1 className={styles.stepHeading}>Login Now!</h1>
      <p className={styles.stepDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        condimentum, lacus
      </p>

      <Form
        layout="vertical"
        name="login-initiate"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.loginInitiateForm}
      >
        <Form.Item<FieldType>
          label="Email address"
          name="email"
          className={styles.formItem}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            placeholder="Email address"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          className={styles.formItem}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="password"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Flex align="flex-end" justify="flex-end">
          <Link
            href={"/forget-password"}
            className={`primary-link ${styles.linkTextForgetPwd}`}
          >
            Forget Password?
          </Link>
        </Flex>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            shape="round"
            loading={loading}
            disabled={loading}
            className={styles.button}
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <Divider>or login with</Divider>

      <Button
        size="large"
        shape="round"
        block
        icon={<Icon name="google.svg" size="24" />}
        onClick={() => handleSocialLogin()}
        className={`${styles.button} mb-middle`}
      >
        Sign in with Google
      </Button>

      <p className={styles.registerPara}>
        Not registered yet? <Link href={"/register"}>Create an Account</Link>
      </p>
    </div>
  );
}
