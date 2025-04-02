import {z} from "zod";

export type SearchResultElement = {
    title: string
    description: string
    url: string,
    cache?: string,
    web_archive?: string
}

export type SearchResult = SearchResultElement[]

export const SearchParams = {
    query: z.string({description: "query string"}),
    page: z.number({description: "page number"})
};

export const CacheParams = {
    id: z.string({description: "unique cache id"}),
    onlyText: z.boolean({description: "Should the result be text only (no html)"})
};