import { DynamicImport } from "@/components/dynamicImport";
import React from "react";

export default function page() {
  return (
    <div style={{ maxWidth: "450px", margin: "0 auto" }}>
      <DynamicImport components={[{ type: "registerForm" }]} />
    </div>
  );
}
