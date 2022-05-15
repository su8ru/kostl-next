const valueToKey = (obj: Record<string, string>, value: string) =>
  Object.keys(obj).find((key) => obj[key] === value);

export default valueToKey;
