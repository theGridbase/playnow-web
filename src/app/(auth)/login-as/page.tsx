import React from "react";
import CustomImage from "@/components/ui/CustomImage/CustomImage";
import styles from "@/styles/pages/login-as.page.module.scss";
import { DynamicImport } from "@/components/dynamicImport";

export default function page() {
  return (
    <div className={styles.page}>
      <section className={styles.bannerSection}>
        <CustomImage
          name="banner-auth.svg"
          fill
          alt="auth banner image"
          className={styles.bannerImage}
        />
      </section>
      <div className={styles.displayer}>
        <CustomImage
          name="logo.svg"
          width={80}
          height={81}
          alt="logo"
          className={styles.logo}
        />
        <p className={styles.tagLine}>Sign in to your account to continue.</p>
        <DynamicImport components={[{ type: "loginAs" }]} />
      </div>
    </div>
  );
}
