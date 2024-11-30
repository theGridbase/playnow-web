import { DynamicImport } from "@/components/dynamicImport";




export default function page() {
  return (
    <div>
      <DynamicImport components={[{ type: "groundRegistration" }]} />
    </div>
  );
}
