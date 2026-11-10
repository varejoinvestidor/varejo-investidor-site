"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { installViAnalyticsSchemaFromAdmin } from "../actions";

/** Tentativa única automática de instalar schema (admin). */
export function ViAnalyticsAutoInstall({
  state,
}: {
  state: "missing" | "partial" | "unconfigured";
}) {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (state === "unconfigured" || ran.current) return;
    ran.current = true;
    void (async () => {
      const result = await installViAnalyticsSchemaFromAdmin();
      if (result.ok) router.refresh();
    })();
  }, [state, router]);

  return null;
}
