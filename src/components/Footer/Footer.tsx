import { Button, Flex, Input } from "antd";
import CustomImage from "../ui/CustomImage/CustomImage";
import Link from "next/link";
import styles from "@/styles/components/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footerMain}>
      <Flex align="flex-start" justify="flex-start" wrap gap={40}>
        <div>
          <CustomImage
            name="logo-black.svg"
            alt="black variant logo"
            width={150}
            height={100}
          />
          <p className={styles.tagLine}>
            We give you the best stadiums in town
          </p>
        </div>
        <Flex align="flex-start" justify="space-between" wrap flex={1}>
          <ul className={styles.linksHolder}>
            <li className={styles.linksheading}>Company</li>
            <li>
              <Link href={"#"}>About</Link>
            </li>
            <li>
              <Link href={"#"}>Local service provider</Link>
            </li>
            <li>
              <Link href={"#"}>Travel agencies</Link>
            </li>
          </ul>
          <ul className={styles.linksHolder}>
            <li className={styles.linksheading}>HELP</li>
            <li>
              <Link href={"#"}>terms & conditions</Link>
            </li>
            <li>
              <Link href={"#"}>Privacy Policy</Link>
            </li>
          </ul>
          <div className={styles.formHolder}>
            <p className={styles.formHeading}>News letter</p>

            <Input
              variant="filled"
              placeholder="Enter your email address"
              size="large"
              className="mb-small"
            />
            <Button block shape="round" type="default">
              Subscribe Now
            </Button>
          </div>
        </Flex>
      </Flex>
    </footer>
  );
}
