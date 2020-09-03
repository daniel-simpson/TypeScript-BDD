export const caseInsensitive = (text: string) => {
  return new RegExp(`^${text}$`, "i");
};
