import iconv from "iconv-lite";
import * as cheerio from "cheerio";

/**
 * Extract page from Mamont cache
 * @param id {string} unique cache id
 * @param onlyText {boolean} Should the result be text only (no html). Default true
 * @returns {string} page content
 */
export async function extractCache(id: string, onlyText: boolean = true): Promise<string> {
    const response = await fetch(`https://www.mmnt.ru/cache2/${id}.html`);
    const buffer = await response.arrayBuffer();
    const html = iconv.decode(Buffer.from(buffer), "windows-1251"); // convert win1251 -> utf8

    if (!onlyText) {
        return html;
    }

    const $ = cheerio.load(html);
    return $("pre").first().text();
}