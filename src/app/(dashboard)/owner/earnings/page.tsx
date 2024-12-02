"use client";

import React from "react";
import { Card, Typography, Table } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Text as RechartsText,
} from "recharts";
import styles from "../../../../styles/components/earnings.module.scss";
import Header from "@/components/Header/Header";

const { Title, Text } = Typography;

const data = [
  { month: "Mar", earnings: 0 },
  { month: "Apr", earnings: 0 },
  { month: "May", earnings: 0 },
  { month: "Jun", earnings: 0 },
  { month: "Jul", earnings: 0 },
  { month: "Aug", earnings: 0 },
  { month: "Sep", earnings: 0 },
  { month: "Oct", earnings: 0 },
  { month: "Nov", earnings: 0 },
  { month: "Dec", earnings: 0 },
  { month: "Jan", earnings: 0 },
  { month: "Feb", earnings: 0 },
];

const EarningsSummary: React.FC = () => {
  const summaryData = [
    { key: "gross", label: "Gross earnings", value: "$0.00" },
    { key: "adjustments", label: "Adjustments", value: "$0.00" },
    { key: "serviceFee", label: "Service fee", value: "$0.00" },
    { key: "tax", label: "Tax withheld", value: "$0.00" },
    { key: "total", label: "Total (USD)", value: "$0.00" },
  ];

  const renderSummaryTable = () => (
    <Table
      dataSource={summaryData}
      pagination={false}
      bordered={false}
      showHeader={false}
      size="small"
      rowKey="key"
      columns={[
        {
          dataIndex: "label",
          key: "label",
          render: (text) => <Text>{text}</Text>,
        },
        { dataIndex: "value", key: "value", align: "right" },
      ]}
    />
  );

  const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-20} y={0} width="35" height="20">
          <div
            style={{
              background: "red",
              color: "white",
              textAlign: "center",
              borderRadius: "10px",
              padding: "2px",
              fontSize: "12px",
            }}
          >
            {payload.value}
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <>
      <Header />
      <div className={styles.earningsSummary}>
        <div className={styles.leftPane}>
          <p>
            You’ve made <br /> <span>$0.00</span> this month
          </p>
          <div className={styles.chart}>
            <LineChart width={700} height={300} data={data}>
              <XAxis dataKey="month" tick={<CustomXAxisTick />} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#ff4d4f"
                strokeWidth={2}
              />
            </LineChart>
          </div>
          <div className={styles.status}>
            <Title level={5}>Upcoming</Title>
            <Text>No upcoming reservations at the moment.</Text>
            <Title level={5}>Paid</Title>
            <Text>Payouts are sent after guests check in.</Text>
          </div>
        </div>
        <div className={styles.rightPane}>
          <Card title="Year-to-date summary">{renderSummaryTable()}</Card>
        </div>
      </div>
    </>
  );
};

export default EarningsSummary;
