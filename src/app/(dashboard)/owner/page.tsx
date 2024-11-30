import LogoutButton from "@/components/LogoutButton/LogoutButton";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Owner registration</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Link href={"/owner/ground-register"}>Register Ground</Link>
        <LogoutButton />
      </div>
    </div>
  );
}
