export async function POST(req: Request) {
  const { url } = await req.json();

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  let html = "";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "UtilSpot SEO Checker/1.0 (+https://www.utilspot.app/seo-analyzer)" },
      signal: AbortSignal.timeout(10000),
    });
    html = await res.text();
  } catch {
    return Response.json({ error: "Could not fetch URL. Check if the site is accessible." }, { status: 400 });
  }

  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
  const metaDesc =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1]?.trim() ??
    html.match(/<meta[^>]+content=["']([^"']*)[^>]+name=["']description["']/i)?.[1]?.trim() ??
    "";
  const h1s = [...html.matchAll(/<h1[^>]*>([^<]*)<\/h1>/gi)].map((m) => m[1].trim());
  const h2s = [...html.matchAll(/<h2[^>]*>([^<]*)<\/h2>/gi)].map((m) => m[1].trim());
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i)?.[1] ?? "";
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/i)?.[1] ?? "index,follow";
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)/i)?.[1] ?? "";
  const ogDesc = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)/i)?.[1] ?? "";
  const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)/i)?.[1] ?? "";

  const imgTags = [...html.matchAll(/<img[^>]*/gi)];
  const imgsWithAlt = imgTags.filter((m) => /alt=["'][^"']+["']/i.test(m[0])).length;
  const imgsTotal = imgTags.length;

  const langAttr = html.match(/<html[^>]+lang=["']([^"']*)/i)?.[1] ?? "";
  const viewportMeta = /<meta[^>]+name=["']viewport["']/i.test(html);

  return Response.json({
    url: parsedUrl.href,
    title,
    titleLength: title.length,
    metaDesc,
    metaDescLength: metaDesc.length,
    h1s,
    h2Count: h2s.length,
    h2s: h2s.slice(0, 5),
    canonical,
    robots,
    ogTitle,
    ogDesc,
    ogImage,
    imgsTotal,
    imgsWithAlt,
    imgsMissingAlt: imgsTotal - imgsWithAlt,
    langAttr,
    viewportMeta,
  });
}
