"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "../i18n";
import type { SiteSearchResult } from "../search/types";

const COPY: Record<string, { placeholder: string; title: string; empty: string; hint: string; loading: string }> = {
  pt: {
    placeholder: "Buscar temas, artigos, mercados…",
    title: "Pesquisar no site",
    empty: "Nenhum resultado. Tente forex, elite, educação ou um ativo.",
    hint: "Mínimo 2 caracteres",
    loading: "Buscando…",
  },
  en: {
    placeholder: "Search topics, articles, markets…",
    title: "Search the site",
    empty: "No results. Try forex, elite, education, or an asset.",
    hint: "At least 2 characters",
    loading: "Searching…",
  },
  es: {
    placeholder: "Buscar temas, artículos, mercados…",
    title: "Buscar en el sitio",
    empty: "Sin resultados.",
    hint: "Mínimo 2 caracteres",
    loading: "Buscando…",
  },
};

function labels(locale: Locale) {
  return COPY[locale] ?? COPY.en;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

type SearchContextValue = { open: () => void; openState: boolean; dialogId: string };

const SearchContext = createContext<SearchContextValue | null>(null);

export function SiteSearchProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const copy = labels(locale);
  const dialogId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SiteSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  const openSearch = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, open]);

  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q, locale, limit: "14" });
        const res = await fetch(`/api/site-search?${params}`, { signal: controller.signal, cache: "no-store" });
        const data = (await res.json()) as { results?: SiteSearchResult[] };
        setResults(data.results ?? []);
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 220);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, locale, open]);

  return (
    <SearchContext.Provider value={{ open: openSearch, openState: open, dialogId }}>
      {children}
      {open ? (
        <div className="site-search-layer" role="presentation">
          <button type="button" className="site-search-backdrop" aria-label={locale === "pt" ? "Fechar" : "Close"} onClick={close} />
          <div className="site-search-dialog" id={dialogId} role="dialog" aria-modal="true" aria-label={copy.title}>
            <div className="site-search-dialog-head">
              <SearchIcon className="text-gold" />
              <span>{copy.title}</span>
              <kbd className="site-search-kbd">Esc</kbd>
            </div>
            <input
              ref={inputRef}
              type="search"
              className="site-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.placeholder}
              autoComplete="off"
              enterKeyHint="search"
            />
            <div className="site-search-body">
              {query.trim().length < 2 ? (
                <p className="site-search-hint">{copy.hint}</p>
              ) : loading ? (
                <p className="site-search-hint">{copy.loading}</p>
              ) : results.length === 0 ? (
                <p className="site-search-hint">{copy.empty}</p>
              ) : (
                <ul className="site-search-results">
                  {results.map((item) => (
                    <li key={item.id}>
                      <a href={item.href} className="site-search-result" onClick={close}>
                        <span className="site-search-result-group">{item.group}</span>
                        <span className="site-search-result-title">{item.title}</span>
                        {item.description ? (
                          <span className="site-search-result-desc">{item.description}</span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </SearchContext.Provider>
  );
}

export function SiteSearchTrigger({
  locale,
  variant,
}: {
  locale: Locale;
  variant: "header" | "mobile";
}) {
  const ctx = useContext(SearchContext);
  if (!ctx) return null;

  const ariaSearch =
    locale === "pt" ? "Pesquisar no site" : locale === "es" ? "Buscar en el sitio" : "Search the site";

  return (
    <button
      type="button"
      className={`site-search-trigger site-search-trigger--${variant}`}
      onClick={ctx.open}
      aria-haspopup="dialog"
      aria-expanded={ctx.openState}
      aria-controls={ctx.dialogId}
      title={`${ariaSearch} (Ctrl+K)`}
      aria-label={variant === "mobile" ? ariaSearch : undefined}
    >
      <SearchIcon />
      {variant === "header" ? (
        <span className="site-search-trigger-label">{locale === "pt" ? "Buscar" : "Search"}</span>
      ) : null}
    </button>
  );
}
