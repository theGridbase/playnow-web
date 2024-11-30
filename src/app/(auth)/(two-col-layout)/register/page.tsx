import { DynamicImport } from "@/components/dynamicImport";
import React from "react";

export default function page() {
  return (
    <div>
      <DynamicImport components={[{ type: "registerForm" }]} />
    </div>
  );
}
