import { redirect } from "next/navigation";

export default function AdminAutoresRedirectPage() {
  redirect("/admin/configuracoes#autores");
}
