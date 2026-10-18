import { indexNowKey } from "@/seo/indexnow";

/** IndexNow key file (keyLocation). Proves to search engines that this host owns the key. */
export async function GET() {
  const key = indexNowKey();
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" } });
}
