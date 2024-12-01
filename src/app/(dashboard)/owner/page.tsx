import Header from "@/components/Header/Header";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import Link from "next/link";


export default function page() {
  return (
    <div>
      <Header/>
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
