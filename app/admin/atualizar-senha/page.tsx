import Link from "next/link";
import { AtualizarSenhaForm } from "../../../src/publisher/admin/AtualizarSenhaForm";

export default function AtualizarSenhaPage() {
  return (
    <div className="admin-login-backdrop flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Varejo Investidor</p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight text-paper">Nova senha</h1>
          <p className="mt-2 text-sm text-paper/55">Defina sua senha para acessar o VI Publisher.</p>
        </div>
        <div className="rounded-xl border border-line/15 bg-ink/80 p-8 shadow-premium backdrop-blur-sm">
          <AtualizarSenhaForm />
          <p className="mt-6 text-center text-sm">
            <Link href="/admin/login" className="text-gold hover:underline">
              Voltar ao login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
