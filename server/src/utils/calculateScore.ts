export function calculateScore(wordLength: number, gameDuration: number) {
  return wordLength * 16 - gameDuration;
}
