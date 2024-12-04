"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Button, Avatar, Dropdown, Drawer } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import CustomImage from "../ui/CustomImage/CustomImage";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../styles/components/header.module.scss";
import LogoutButton from "../LogoutButton/LogoutButton";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerVisible, setDrawerVisible] = useState(false); // State for drawer visibility

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/owner/main-profile" passHref>
          <Button
            style={{
              width: "80px",
              minHeight: "30px !important",
              border: "1px #E73725 solid",
            }}
            className="small-btn"
            type="secondary"
          >
            Account
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutButton />
      </Menu.Item>
    </Menu>
  );

  // Toggle drawer visibility
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <div className={styles.headerContainer}>
      <CustomImage
        name="logo-black.svg"
        alt="black variant logo"
        width={100}
        height={70}
      />

      {/* Menu for Desktop */}
      <ul className={styles.menu}>
        <li key="today">
          <Link href="/owner" className={pathname === "/owner" ? styles.active : ""}>
            Today
          </Link>
        </li>
        <li key="listings">
          <Link href="/owner/my-listing" className={pathname === "/owner/my-listing" ? styles.active : ""}>
            Listings
          </Link>
        </li>
        <li key="reservations">
          <Link href="/owner/reservations" className={pathname === "/owner/reservations" ? styles.active : ""}>
            Reservations
          </Link>
        </li>
        <li key="earnings">
          <Link href="/owner/earnings" className={pathname === "/owner/earnings" ? styles.active : ""}>
            Earnings
          </Link>
        </li>
      </ul>

      {/* Actions Section */}
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

        {/* Menu Icon for Mobile (visible on small screens) */}
        <MenuOutlined
          onClick={showDrawer}
          className={styles.menuIcon}
        />
      </div>

      {/* Drawer for Mobile */}
      <Drawer
  title={
    <CustomImage
      name="logo-black.svg"
      alt="black variant logo"
      width={100}
      height={70}
    />
  }
  placement="right"
  onClose={closeDrawer}
  visible={drawerVisible}
  width={250}
>
        <Menu>
          <Menu.Item key="today">
            <Link href="/owner" className={pathname === "/owner" ? styles.active : ""}>
              Today
            </Link>
          </Menu.Item>
          <Menu.Item key="listings">
            <Link href="/owner/my-listing" className={pathname === "/owner/my-listing" ? styles.active : ""}>
              Listings
            </Link>
          </Menu.Item>
          <Menu.Item key="reservations">
            <Link href="/owner/reservations" className={pathname === "/owner/reservations" ? styles.active : ""}>
              Reservations
            </Link>
          </Menu.Item>
          <Menu.Item key="earnings">
            <Link href="/owner/earnings" className={pathname === "/owner/earnings" ? styles.active : ""}>
              Earnings
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Header;
