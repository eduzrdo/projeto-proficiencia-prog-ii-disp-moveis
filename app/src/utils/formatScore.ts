export function formatScore(score: number) {
  let numberString = score.toString();

  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return numberString;
}
