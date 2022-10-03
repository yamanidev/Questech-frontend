function formatDate(day, month, year) {
  const formattedDay = ("0" + day).slice(-2);
  const formattedMonth = ("0" + month).slice(-2);
  return `${year}-${formattedDay}-${formattedMonth}`;
}
export { formatDate };
