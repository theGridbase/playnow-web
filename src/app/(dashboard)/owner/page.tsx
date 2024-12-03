"use client";

import Header from "@/components/Header/Header";
import Leftcalendar from "@/components/Leftccalendar/leftcakendar";

import { Col, Flex, Row } from "antd";
import dynamic from "next/dynamic";

const Scheduler = dynamic(() => import("@/components/Scheduler/Scheduler"), {
  ssr: false,
});

export default function page() {
  return (
    <div>
      <Header />
      <Flex align="stretch" justify="flex-start" gap={10}>
        <Leftcalendar />
        <div style={{ flex: "1", padding: "57px 57px 57px 0" }}>
          <Scheduler />
        </div>
      </Flex>
    </div>
  );
}
