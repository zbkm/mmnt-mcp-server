import {expect, test} from "bun:test";
import {spyFetch} from "./setupFetchSpy.ts";
import {mockFetch} from "../mocks/fetch.ts";
import iconv from "iconv-lite";
import {extractCache} from "../../src/mmnt/cache.ts";

test("cache with html", async () => {
    const htmlBuffer = await Bun.file("./tests/mmnt/fixtures/cache.html").arrayBuffer();
    const expectedText = iconv.decode(Buffer.from(htmlBuffer), "windows-1251");

    spyFetch.mockImplementation(mockFetch(htmlBuffer));

    const data = await extractCache("4988989a18e9a13ab78aa9646808c9ff", false);

    expect(spyFetch).toHaveBeenCalledWith("https://www.mmnt.ru/cache2/4988989a18e9a13ab78aa9646808c9ff.html");
    expect(data).toEqual(expectedText);
});

test("cache only text", async () => {
    const htmlBuffer = await Bun.file("./tests/mmnt/fixtures/cache.html").arrayBuffer();
    const expectedText = await Bun.file("./tests/mmnt/fixtures/cache-only-text.txt").text();
    spyFetch.mockImplementation(mockFetch(htmlBuffer));

    const data = await extractCache("4988989a18e9a13ab78aa9646808c9ff", true);

    expect(spyFetch).toHaveBeenCalledWith("https://www.mmnt.ru/cache2/4988989a18e9a13ab78aa9646808c9ff.html");
    expect(data).toEqual(expectedText);
});