// funzioni di utility tipo questa
export function UpperCase(text: string) {
  if (!text || text.trim().length === 0) return "";
  const trimmed = text.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
