import {afterAll, beforeEach, spyOn} from "bun:test";

const spyFetch = spyOn(globalThis, "fetch");
const originalFetch = globalThis.fetch;

beforeEach(() => {
    spyFetch.mockReset();
});

afterAll(() => {
    globalThis.fetch = originalFetch;
});

export {spyFetch};
