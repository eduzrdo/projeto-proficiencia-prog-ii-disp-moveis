export const normalizeWord = (palavra: string) => {
  return palavra
    .normalize('NFD') // Normaliza a string para decompor caracteres acentuados em caracteres de base e diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Remove os caracteres diacríticos
    .replace(/ç/g, 'c') // Substitui "ç" por "c"
    .replace(/Ç/g, 'C') // Substitui "Ç" por "C"
    .toUpperCase(); // Converte as letras para maiúsculo
}