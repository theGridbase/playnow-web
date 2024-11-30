"use client";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Select,
} from "antd";
import React, { useState } from "react";
import Link from "next/link";
import Icon from "../ui/Icon/Icon";
import { IRegisterUser } from "@/app/_lib/interfaces";
import { registerUserRequest } from "./action";
import styles from "@/styles/components/loginstepform.module.scss";
import { useRouter } from "next/navigation";

interface Props {}

interface FieldType extends IRegisterUser {
  terms: string;
}

export default function RegisterForm({}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinish = async (d: FieldType) => {
    setLoading(true)
    const { terms, ...rest } = d;
    const response = await registerUserRequest(rest);
    setLoading(false)
    if (response.status !== 200) {
      message.error(response.message || "something went wrong");
      return;
    }
    message.success("registeration successfull");
    router.replace("/login-as");
  };
  const onFinishFailed = () => {};
  return (
    <div className={styles.stepContainer}>
      <h1 className={styles.stepHeading}>Create Account</h1>
      <p className={styles.stepDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        condimentum, lacus
      </p>

      <Form
        layout="vertical"
        name="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Full name"
          name="fullName"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input placeholder="Full name" size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email address"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email address" size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="password" size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Register as"
          name="role"
          rules={[{ required: true, message: "Please input your selection!" }]}
          style={{ flex: 1 }}
        >
          <Select
            size="large"
            placeholder="Login as"
            options={[
              // { value: "guest", label: "guest" },
              // { value: "customer", label: "customer" },
              { value: "owner", label: "owner" },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="terms"
          valuePropName="checked"
          label={null}
          rules={[
            { required: true, message: "Please accepts terms and conditions" },
          ]}
        >
          <Checkbox>I accept all the terms and conditions</Checkbox>
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
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>

      <Divider>or Sign up with</Divider>

      <Button
        size="large"
        shape="round"
        block
        icon={<Icon name="google.svg" size="24" />}
        className="mb-large"
      >
        Sign up with Google
      </Button>

      <p className={styles.registerPara}>
        Already have an Account? <Link href={"/login"}>Login Now</Link>
      </p>
    </div>
  );
}
