import HomePage from "@/components/HomePage";
import { NavbarDemo } from "@/components/NavbarDemo";



export default function Home() {
  return (
    <>
    <div className="h-[100vh]">
      <NavbarDemo/>
      <HomePage/>
    </div>
    </>
  );
}
