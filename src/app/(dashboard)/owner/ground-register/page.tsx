import { DynamicImport } from "@/components/dynamicImport";
import { PlayNowApi } from "@/utils/playnow/api";
import React from "react";



export default function page() {
  return (
    <div>
      <DynamicImport components={[{ type: "groundRegistration" }]} />
    </div>
  );
}
