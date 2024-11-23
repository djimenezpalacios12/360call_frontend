export const cleanResponse = (text: string) => {
  const cleanText = text.replace(
    /[\s【]?(\d+)\s*[:：]\s*(\d+)\s*[†]?\s*source\s*[\s】]?/g,
    ""
  );

  return cleanText;
};
