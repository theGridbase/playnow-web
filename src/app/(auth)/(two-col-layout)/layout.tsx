import CustomImage from "@/components/ui/CustomImage/CustomImage";
import styles from "@/styles/layouts/auth.two.col.module.scss";

export default function AuthTwoColLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <div className={styles.contentSection}>{children}</div>
      <div className={styles.imageSection}>
        <CustomImage
          name="auth-side-banner.png"
          fill={true}
          alt="auth side banner"
          className={styles.sideImage}
        />
      </div>
    </div>
  );
}
