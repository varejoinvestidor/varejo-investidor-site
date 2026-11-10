import { Suspense } from "react";
import { AdminLoginClient } from "../../../src/publisher/admin/AdminLoginClient";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { returnTo?: string; error?: string };
}) {
  const returnTo = searchParams?.returnTo?.startsWith("/admin") ? searchParams.returnTo : "/admin";
  const urlError = searchParams?.error;

  return (
    <div className="admin-login-backdrop flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Varejo Investidor</p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight text-paper">VI Publisher</h1>
          <p className="mt-2 text-sm text-paper/55">Ambiente editorial privado</p>
        </div>
        <div className="rounded-xl border border-line/15 bg-ink/80 p-8 shadow-premium backdrop-blur-sm">
          <Suspense fallback={<p className="text-sm text-paper/60">Carregando…</p>}>
            <AdminLoginClient returnTo={returnTo} urlError={urlError} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
