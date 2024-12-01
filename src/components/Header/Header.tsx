"use client"

import React from 'react';
import Link from 'next/link';
import { Menu, Button, Badge, Avatar } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import CustomImage from '../ui/CustomImage/CustomImage';
import { useRouter } from 'next/navigation';
import styles from '../../styles/components/header.module.scss';

const Header: React.FC = () => {
  const router = useRouter()
  return (
    <div className={styles.headerContainer}>
      <CustomImage
        name="logo-black.svg"
        alt="black variant logo"
        width={100}
        height={70}
      />
      <ul className={styles.menu}>
        <li key="today"><Link href={'#'}>Today</Link></li>
        <li key="listings"><Link href={'#'}>Listings</Link></li>
        <li key="messages"><Link href={'#'}>Messages</Link></li>
        <li key="reservations"><Link href={'#'}>Reservations</Link></li>
        <li key="earnings"><Link href={'#'}>Earnings</Link></li>
      </ul>

      <div className={styles.actions}>
        <Button type="default" className={styles.createListing} onClick={() => router.push('/owner/ground-register')}>
          Create new listing
        </Button>

        <Avatar icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default Header;
