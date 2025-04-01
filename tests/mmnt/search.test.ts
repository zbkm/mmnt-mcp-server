import { expect, test } from "bun:test";
import { searchMamont } from "../../src/mmnt/search.ts";
import { mockFetch } from "../mocks/fetch.ts";
import { spyFetch } from "./setupFetchSpy.ts";

test("search", async () => {
    const htmlBuffer = await Bun.file("./tests/mmnt/fixtures/search-1-page.html").arrayBuffer();
    const expectedJson = await Bun.file("./tests/mmnt/fixtures/search-1-page-result.json").json();

    spyFetch.mockImplementation(mockFetch(htmlBuffer));

    const data = await searchMamont("mmnt");

    expect(spyFetch).toHaveBeenCalledWith("https://www.mmnt.ru/get?st=mmnt&in=w&ot=1");
    expect(data).toEqual(expectedJson);
});

test("search with page", async () => {
    const htmlBuffer = await Bun.file("./tests/mmnt/fixtures/search-4-page.html").arrayBuffer();
    const expectedJson = await Bun.file("./tests/mmnt/fixtures/search-4-page-result.json").json();

    spyFetch.mockImplementation(mockFetch(htmlBuffer));

    const data = await searchMamont("mmnt", 4);

    expect(spyFetch).toHaveBeenCalledWith("https://www.mmnt.ru/get?st=mmnt&in=w&ot=41");
    expect(data).toEqual(expectedJson);
});

test("search no result", async () => {
    const htmlBuffer = await Bun.file("./tests/mmnt/fixtures/search-no-result.html").arrayBuffer();

    spyFetch.mockImplementation(mockFetch(htmlBuffer));

    const data = await searchMamont("34t3hgrdhbdfnbdfgb");

    expect(spyFetch).toHaveBeenCalledWith("https://www.mmnt.ru/get?st=34t3hgrdhbdfnbdfgb&in=w&ot=1");
    expect(data).toBeEmpty();
});
