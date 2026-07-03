import { useEffect } from "react";

interface PageSEOProps {
  /** Full document title, e.g. "Priser — Ledger.io". */
  title: string;
  /** Meta description, ~150–160 chars. */
  description: string;
  /** Path only, e.g. "/priser". Combined with the canonical host. */
  path: string;
  /** og:type — "website" (default) or "article". */
  type?: "website" | "article";
  /** Absolute OG image URL. Defaults to the site OG image. */
  image?: string;
}

const CANONICAL_HOST = "https://ledger.io";
const DEFAULT_IMAGE = "https://ledger.io/og-image.png";

/**
 * Per-page SEO. Sets <title>, meta description, canonical and OG/Twitter tags
 * on mount and restores the previous values on unmount, so each marketing page
 * gets its own title/description instead of the generic index.html defaults.
 *
 * A lightweight, dependency-free alternative to react-helmet, matching the
 * existing ArticleSEO pattern used for guides and blog posts.
 */
export const PageSEO = ({ title, description, path, type = "website", image = DEFAULT_IMAGE }: PageSEOProps) => {
  useEffect(() => {
    const url = `${CANONICAL_HOST}${path}`;
    const previous: Array<{ el: Element; attr: string; value: string | null }> = [];
    const previousTitle = document.title;
    document.title = title;

    const setMeta = (selector: string, attrs: Record<string, string>, tag: "meta" | "link") => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement(tag);
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => {
        previous.push({ el: el!, attr: k, value: el!.getAttribute(k) });
        el!.setAttribute(k, v);
      });
    };

    setMeta('meta[name="description"]', { name: "description", content: description }, "meta");
    setMeta('link[rel="canonical"]', { rel: "canonical", href: url }, "link");
    setMeta('meta[property="og:title"]', { property: "og:title", content: title }, "meta");
    setMeta('meta[property="og:description"]', { property: "og:description", content: description }, "meta");
    setMeta('meta[property="og:url"]', { property: "og:url", content: url }, "meta");
    setMeta('meta[property="og:type"]', { property: "og:type", content: type }, "meta");
    setMeta('meta[property="og:image"]', { property: "og:image", content: image }, "meta");
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title }, "meta");
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description }, "meta");
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image }, "meta");

    return () => {
      document.title = previousTitle;
      // Restore prior attribute values (reverse order so first-seen value wins).
      for (let i = previous.length - 1; i >= 0; i--) {
        const { el, attr, value } = previous[i];
        if (value === null) el.removeAttribute(attr);
        else el.setAttribute(attr, value);
      }
    };
  }, [title, description, path, type, image]);

  return null;
};
