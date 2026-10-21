import type { APIRoute } from "astro";
import { concerns } from "../data/concerns";
import { locations } from "../data/locations";
import { serviceCategories, services } from "../data/services";
import { treatments } from "../data/treatments";

const origin = "https://www.816medspa.com";

const staticPaths = [
  "/",
  "/about-us/meet-the-doctor/",
  "/about-us/meet-the-team/",
  "/accessibility-statement/",
  "/concerns/",
  "/contact-us/",
  "/gallery/",
  "/locations/",
  "/memberships/",
  "/privacy-policy/",
  "/services/",
  "/treatments/",
];

const paths = [
  ...staticPaths,
  ...concerns.map((concern) => `/concerns/${concern.slug}/`),
  ...locations.map((location) => `/locations/${location.slug}/`),
  ...services.map((service) => `/services/${service.slug}/`),
  ...serviceCategories.map((category) => `/treatments/${category.toLowerCase()}/`),
  ...treatments.map((treatment) => `/treatments/${treatment.slug}/`),
];

export const GET: APIRoute = () => {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`),
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
