export type SearchResultElement = {
    title: string
    description: string
    url: string,
    cache?: string,
    web_archive?: string
}

export type SearchResult = SearchResultElement[]