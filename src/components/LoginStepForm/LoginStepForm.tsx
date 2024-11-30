"use client";
import { message, Steps } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import InitiateLogin from "./InitiateLogin";
import VerifyLogin from "./VerifyLogin";
import ProfileComplete from "./ProfileComplete";
import styles from "@/styles/components/loginstepform.module.scss";
import { IUser } from "@/app/_lib/interfaces";
import { signIn } from "next-auth/react";
import { getVerifyCookie } from "./action";

export type NextStepType = Partial<IUser>;

export default function LoginStepForm() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<IUser>({
    email: "",
    role: "",
    profile: null,
    accessToken: "",
    refreshToken: "",
  });

  useEffect(() => {
    (async () => {
      const verifyStep = await getVerifyCookie();
      if (
        verifyStep.data?.name === "VERIFY_ACCOUNT" &&
        verifyStep.data?.value
      ) {
        setStep(1);
        setUserData((prev) => ({ ...prev, email: verifyStep.data?.value }));
      }
    })();
  }, []);

  const next = useCallback(
    async (data: NextStepType) => {
      setUserData((prev) => ({ ...prev, ...data }));
      if (step === 1 && userData.profile) return;
      setStep((prev) => (prev < 2 ? prev + 1 : prev));
    },
    [step, userData]
  );

  const prev = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className={styles.loginStepForm}>
      <Steps
        className={styles.steps}
        responsive={false}
        progressDot
        current={step}
        items={[
          {
            title: "Login Process",
          },
          {
            title: "2 step verification",
          },
          {
            title: "Profile completion",
          },
        ]}
      />

      {step === 0 && <InitiateLogin next={next} />}
      {step === 1 && (
        <VerifyLogin userData={userData} next={next} prev={prev} />
      )}
      {step === 2 && <ProfileComplete userData={userData} />}
    </div>
  );
}
