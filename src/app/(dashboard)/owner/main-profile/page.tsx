

import React from "react";
import { Row, Col } from "antd";
import Header from "@/components/Header/Header";

import styles from "../../../../styles/components/Mainprofilesections.module.scss";
import Icon from "../../../../components/ui/Icon/Icon";
import Link from "next/link"
const AccountPage: React.FC = () => {
  const cards = [
    { title: "Personal info", description: "Provide personal details and how we can reach you", name: "profile.svg" ,link: "/owner/profile"},
    { title: "My Bookings", description: "Update your password and secure your account", name: "booking.svg" ,link: "/owner/reservations"},
    { title: "Transactions", description: "Review payments, payouts, coupons, and gift cards", name: "transaction.svg",link: "/owner/earnings" },
    // { title: "Preferences", description: "Manage taxpayer information and tax documents", name: "preferences", },
   
  
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.account}>Account</h1>
          <p className={styles.email}>
            Sam, sam@gmail.com : <Link href="/owner/profile">Go to profile</Link>
          </p>
        </header>
        <Row gutter={[20, 20]}>
          {cards.map((card, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <div className={styles.card}>
                <Icon name={card.name} size="48" />
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.description}>{card.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AccountPage;
