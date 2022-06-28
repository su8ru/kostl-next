const trainIdToType = (id: string): string => {
  const cap = id[0];
  if (cap === "7") return id[1] === "5" ? "11" : "9";
  return map[cap];
};

const map: Record<string, string> = {
  "0": "1",
  "1": "2",
  "2": "3",
  "4": "5",
  "5": "6",
  "6": "6",
};

export default trainIdToType;
