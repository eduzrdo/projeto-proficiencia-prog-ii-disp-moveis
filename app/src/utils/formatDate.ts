export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("pt-br");

  return formattedDate;
}
