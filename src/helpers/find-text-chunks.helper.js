export const findTextChunks = ({ searchWords, textToHighlight }) => {
  const chunks = [];
  const textLow = textToHighlight.toLowerCase();

  searchWords.forEach((sw) => {
    const regexp = new RegExp(`\\b${sw}\\b`, "gi");
    const occurences = [...textLow.matchAll(regexp)].map((matched) => matched.index);
    occurences.forEach((start) => {
      chunks.push({ start, end: start + sw.length });
    });
  });

  return chunks;
};
