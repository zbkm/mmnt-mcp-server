import type {SearchResult} from "../types.ts";
import * as cheerio from "cheerio";
import iconv from "iconv-lite";

/**
 * Search in Mamont search engine
 * @param request {string} Search request string
 * @param page {number} search number page
 * @returns {SearchResult} search result
 */
export async function searchMamont(request: string, page: number = 0): Promise<SearchResult> {
    const ot = page * 10 + 1;
    const response = await fetch(`https://www.mmnt.ru/get?st=${encodeURIComponent(request)}&in=w&ot=${ot}`);

    const buffer = await response.arrayBuffer();
    const text = iconv.decode(Buffer.from(buffer), "windows-1251"); // convert win1251 -> utf8
    const $ = cheerio.load(text);

    const result: SearchResult = [];
    $(".link_block").each((i, elem) => {
        if (i == 0) return;

        const linkElement = $(elem).find("p.link_p a").first();
        const title = linkElement.text().trim();
        const description = $(elem).find("p.desc_p").text().trim();
        const url = $(elem).find("p.link_p a").first().attr("href")!;
        const cache = $(elem).find("p.cache_p a").first().attr("href")?.match(/\/cache\/([a-f0-9]+)\.html/)?.[1];
        const web_archive = $(elem).find("p.arch_p a").first()?.attr("href");

        result.push({
            title,
            description,
            url,
            ...(cache ? {cache} : {}),
            ...(web_archive ? {web_archive} : {}),
        });
    });

    return result;
}