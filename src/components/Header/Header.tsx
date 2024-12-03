"use client";

import React from "react";
import Link from "next/link";
import { Menu, Button, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CustomImage from "../ui/CustomImage/CustomImage";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../styles/components/header.module.scss";
import LogoutButton from "../LogoutButton/LogoutButton";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname()

  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <LogoutButton />
      </Menu.Item>
    </Menu>
  );  

  console.log(pathname);
  

  return (
    <div className={styles.headerContainer}>
      <CustomImage
        name="logo-black.svg"
        alt="black variant logo"
        width={100}
        height={70}
      />
      <ul className={styles.menu}>
        <li key="today">
          <Link href="/owner" className={pathname === '/owner' ? styles.active : ''}>Today</Link>
        </li>
        <li key="listings">
          <Link href="/owner/my-listing" className={pathname === '/owner/my-listing' ? styles.active : ''}>Listings</Link>
        </li>

        <li key="reservations">
          <Link href="/owner/reservations" className={pathname === '/owner/reservations' ? styles.active : ''}>Reservations</Link>
        </li>
        <li key="earnings">
          <Link href="/owner/earnings" className={pathname === '/owner/earnings' ? styles.active : ''}>Earnings</Link>
        </li>

      </ul>

      <div className={styles.actions}>
        <Button
          type="default"
          className={styles.createListing}
          onClick={() => router.push("/owner/ground-register")}
        >
          Create new listing
        </Button>

        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
