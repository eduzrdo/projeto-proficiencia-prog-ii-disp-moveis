export function calculateScore(wordLength: number, gameTime: number) {
  return wordLength * 16 - gameTime;
}
