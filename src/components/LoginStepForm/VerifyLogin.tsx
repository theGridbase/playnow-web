import React, { useState } from "react";
import { NextStepType } from "./LoginStepForm";
import styles from "@/styles/components/loginstepform.module.scss";
import { Button, Flex, Form, Input, message } from "antd";
import { resendOtp, verifyLogin } from "./action";
import { IUser } from "@/app/_lib/interfaces";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Icon from "../ui/Icon/Icon";
import CustomImage from "../ui/CustomImage/CustomImage";

interface Props {
  userData: IUser;
  next: (args: NextStepType) => void;
  prev: () => void;
}
type FieldType = {
  otp: string;
};

export default function VerifyLogin({ userData, next, prev }: Props) {
  const [loading, setLoading] = useState(false);

  const handleResendOtp = async () => {
    setLoading(true);
    await resendOtp({ email: userData.email });

    setLoading(false);
  };

  const onFinish = async (d: FieldType) => {
    setLoading(true);
    const response = await verifyLogin({
      email: userData.email,
      otp: d.otp,
      process: "login",
    });
    setLoading(false);

    if (response.status !== 200) {
      message.error("verification failed");
      return;
    }

    if (response.data) {
      const response2 = await signIn("credentials", {
        user: JSON.stringify(userData),
        access_token: response.data.access.token,
        refresh_token: response.data.refresh.token,
        redirect: false,
      });
      if (response2?.status === 200) {
        message.success("successfull login");
        window.location.reload();
      }
      return;
    }

    message.success("verified success");
    next({});
  };
  const onFinishFailed = () => {};
  return (
    <div className={styles.stepContainer}>
      <h1 className={styles.stepHeading}>Verification Code!</h1>
      <p className={styles.stepDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        condimentum, lacus
      </p>

      <Form
        layout="vertical"
        name="verify-login"
        className={styles.verifyForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="otp"
          rules={[{ required: true, message: "Please input your otp!" }]}
          className={styles.otpInput}
        >
          <Input.OTP
            className={styles.otpInput}
            size="large"
            length={4}
            
          />
        </Form.Item>
 
        <Flex justify="flex-end" className="mb-middle">
          <Button
            type="text"
            className={styles.resendBtn}
            disabled={loading}
            onClick={handleResendOtp}
          >
            Resend Code
          </Button>
        </Flex>

        <Flex justify="center" className="mb-middle">
          <Button type="text" className={styles.resendBtn} disabled={loading}>
            Change Email
          </Button>
        </Flex>

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
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
