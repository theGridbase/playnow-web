"use client";
import { Button, Checkbox, Divider, Form, Input, message, Select } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import Icon from "../ui/Icon/Icon";
import { IRegisterUser } from "@/app/_lib/interfaces";
import { registerUserRequest } from "./action";
import styles from "@/styles/components/loginstepform.module.scss";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Downarrow from "../../../public/assets/icons/downarrow.svg";
import Image from "next/image";
import { useNotification } from "../context/NotificationContext/NotificationContextProvider";
interface Props {}

interface FieldType extends IRegisterUser {
  terms: boolean;
}

export default function RegisterForm({}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();

  const onFinish = async (d: FieldType) => {
    try {
      setLoading(true);
      const { terms, ...rest } = d;
      if (!terms) {
        setLoading(false);
        openNotification(
          "error",
          "Error!",
          "please accept the terms and conditions"
        );
        return;
      }
      const response = await registerUserRequest(rest);
      setLoading(false);
      if (response.status !== 200) {
        openNotification(
          "error",
          "Error!",
          response.message || "Something went wrong"
        );
        return;
      }

      openNotification("success", "Success!", "registeration successfull");
      router.replace("/login");
    } catch (error) {
      openNotification("error", "Error!", "Something went wrong");
      setLoading(false);
    }
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
          rules={[
            { required: true, message: "Please input your full name!" },
            {
              pattern: /^[a-zA-Z\s]*$/,
              message: "Full name cannot contain numbers, '@', or '.'!",
            },
          ]}
        >
          <Input
            placeholder="Full name"
            size="large"
            className={styles.signupinput}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input
            placeholder="Email address"
            size="large"
            className={styles.signupinput}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              min: 8,
              message: "Password must be at least 8 characters long!",
            },
            {
              pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
              message:
                "Password must contain one number and one special character!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className={styles.signupinput}
          />
        </Form.Item>

        <Form.Item
          label="Register as"
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
          style={{ flex: 1 }}
        >
          <Select
            size="large"
            placeholder="Register as"
            suffixIcon={<Icon size="12" name="downarrow.svg" />}
            options={[{ value: "owner", label: "Owner" }]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="terms"
          valuePropName="checked"
          rules={[
            { required: true, message: "Please accept terms and conditions" },
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
        onClick={() => signIn("google")}
      >
        Sign up with Google
      </Button>

      <p className={styles.registerPara}>
        Already have an Account? <Link href={"/login"}>Login Now</Link>
      </p>
    </div>
  );
}
