import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOg(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(data: SEOProps["jsonLd"]) {
  // remove existing JSON-LD tags injected by us
  document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((n) => n.remove());
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-jsonld", "true");
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export const SEO = ({ title, description, canonical, image, jsonLd }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    if (description) setMeta("description", description);
    if (canonical) setCanonical(canonical);

    setOg("og:title", title);
    if (description) setOg("og:description", description);
    setOg("og:type", "website");
    if (image) setOg("og:image", image);

    setMeta("twitter:card", "summary_large_image");
    if (image) setMeta("twitter:image", image);

    setJsonLd(jsonLd);
  }, [title, description, canonical, image, jsonLd]);

  return null;
};
