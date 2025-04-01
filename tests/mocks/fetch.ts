export function mockFetch(response: ArrayBuffer): typeof fetch {
    // @ts-ignore
    return async () => {
        return new Response(response);
    };
}