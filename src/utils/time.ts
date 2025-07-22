/**
 * Converte hora local (de um objeto Date) para minutos.
 * Ex: 09:30 → 570
 */
export function timeToMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/**
 * Converte hora UTC (de um objeto Date) para minutos.
 * Ex: 13:45 UTC → 825
 */
export function utcTimeToMinutes(date: Date): number {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}
