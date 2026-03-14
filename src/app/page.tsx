import { getCookie } from "@/utils/cookies";
import { redirect } from "next/navigation";

export default function Home() {
  getCookie("token") ? redirect("/overview") : redirect("/login");
}
