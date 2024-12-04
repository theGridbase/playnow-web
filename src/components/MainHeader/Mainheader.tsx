import React, { useState } from 'react';
import { Drawer, Button, Input } from 'antd';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import CustomImage from '../ui/CustomImage/CustomImage';
import styles from '../../styles/components/Mainheader.module.scss';

const MainHeader: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.logo}>
        <CustomImage
          name="logo-black.svg"
          alt="black variant logo"
          width={100}
          height={70}
        />
      </div>

      <nav className={styles.desktopNav}>
        <ul className={styles.navList}>
          <li><a href="/">Home</a></li>
          <li><a href="/find-coach">Find Coach</a></li>
          <li><a href="/community">Community</a></li>
        </ul>
      </nav>

      <Input
        className={styles.searchInput}
        prefix={<SearchOutlined />}
        placeholder="Search Destinations..."
      />

      <div className={styles.authButtons}>
        <Button type="link" className={styles.loginButton}>Login</Button>
        <Button type="primary" className={styles.signUpButton}>Sign Up</Button>
      </div>

      <Button
        className={styles.mobileMenuButton}
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />

      <Drawer
        title=""
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        className={styles.mobileDrawer}
      >
        <ul className={styles.mobileNavList}>
          <li><a href="/">Home</a></li>
          <li><a href="/find-coach">Find Coach</a></li>
          <li><a href="/community">Community</a></li>
        </ul>
        <Input
        className={styles.searchInput}
        prefix={<SearchOutlined />}
        placeholder="Search Destinations..."
      />
        <div className={styles.mobileAuthButtons}>
          <Button type="link" className={styles.loginButton}>Login</Button>
          <Button type="primary" className={styles.signUpButton}>Sign Up</Button>
        </div>
      </Drawer>
    </header>
  );
};

export default MainHeader;
