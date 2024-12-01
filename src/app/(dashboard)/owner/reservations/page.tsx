"use client"

import React from "react";
import { Tabs, Typography } from "antd";
import styles from "../../../../styles/components/reservations.module.scss";
import Header from "@/components/Header/Header";

const { Title } = Typography;

const Reservations: React.FC = () => {
    const tabs = [
        { label: "Upcoming", key: "upcoming", content: "You have no upcoming reservations" },
        { label: "Completed", key: "completed", content: "No completed reservations" },
        { label: "Canceled", key: "canceled", content: "No canceled reservations" },
        { label: "All", key: "all", content: "No reservations available" },
    ];

    return (
        <>
            <Header />
            <div className={styles.reservations}>
                <p> Reservations</p>
                <Tabs defaultActiveKey="upcoming">
                    {tabs.map((tab) => (
                        <Tabs.TabPane tab={tab.label} key={tab.key}>
                            <div className={styles.tabContent}>
                                <Title className={styles.tabContent} level={5}>{tab.content}</Title>
                            </div>
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </div>
        </>
    );
};

export default Reservations;
