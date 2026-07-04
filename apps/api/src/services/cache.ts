export const getCachedJson = async <T>(
  request: Request,
  fetcher: () => Promise<T>,
  maxAgeSeconds: number
): Promise<Response> => {
  const cache = (caches as unknown as { default: Cache }).default;
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = Response.json(await fetcher(), {
    headers: {
      "Cache-Control": `public, max-age=${maxAgeSeconds}`,
    },
  });
  await cache.put(request, response.clone());
  return response;
};
