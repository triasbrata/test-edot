export function parseInt(toInt: any, defaultInt: number): number {
  if (typeof toInt === 'number') {
    return toInt;
  }
  const int = Number(toInt);
  if (isNaN(toInt)) {
    return defaultInt;
  }
  return int;
}
