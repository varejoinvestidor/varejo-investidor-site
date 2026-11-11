import { redirect } from "next/navigation";

export default function AdminCategoriasRedirectPage() {
  redirect("/admin/configuracoes#categorias");
}
