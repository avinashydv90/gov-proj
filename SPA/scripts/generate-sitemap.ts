import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const hostname = "https://poitdp.shahapur-mh.in";
const links = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/introduction", changefreq: "monthly", priority: 0.9 },
  { url: "/ashramschool", changefreq: "monthly", priority: 0.8 },
  { url: "/gov-hostel", changefreq: "monthly", priority: 0.7 },
  { url: "/vikasyojana", changefreq: "monthly", priority: 0.7 },
  { url: "/gallery", changefreq: "monthly", priority: 0.6 },
  { url: "/download-form", changefreq: "monthly", priority: 0.6 },
  { url: "/labharthi-list", changefreq: "monthly", priority: 0.5 },
  { url: "/loksevahakka", changefreq: "monthly", priority: 0.5 },
  { url: "/contact-us", changefreq: "monthly", priority: 0.9 },
  { url: "/rti", changefreq: "monthly", priority: 0.5 },
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
