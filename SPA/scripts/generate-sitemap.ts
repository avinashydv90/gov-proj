import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const hostname = "https://poitdp.shahapur-mh.in";
const links = [
  { url: "/introduction", changefreq: "monthly" },
  { url: "/ashramschool", changefreq: "monthly" },
  { url: "/govhostel", changefreq: "monthly" },
  { url: "/aidedAshram", changefreq: "monthly" },
  { url: "/projectOfficerContact", changefreq: "monthly" },
  { url: "/vikasyojana", changefreq: "monthly" },
  { url: "/gallery", changefreq: "monthly" },
  { url: "/downloadForm", changefreq: "monthly" },
  { url: "/labharthiList", changefreq: "monthly" },
  { url: "/loksevahakka", changefreq: "monthly" },
  { url: "/contactUs", changefreq: "monthly" },
  { url: "/rti", changefreq: "monthly" },
  { url: "/", changefreq: "weekly", priority: 1.0 }, // Home route
];

async function generateSitemap() {
  const stream = new SitemapStream({ hostname });
  const writeStream = createWriteStream("public/sitemap_index.xml");

  for (const link of links) {
    stream.write(link);
  }

  stream.end();

  const sitemap = await streamToPromise(stream);
  writeStream.write(sitemap.toString());
  writeStream.end();

  console.log("✅ Sitemap generated at: public/sitemap.xml");
}

generateSitemap().catch(console.error);
