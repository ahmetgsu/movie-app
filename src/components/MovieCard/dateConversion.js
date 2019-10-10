export default function dateConversion(date) {
  const dateArray = date.split("-");
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };
  return `${Number(dateArray[2])} ${months[dateArray[1]]} ${Number(
    dateArray[0]
  )}`;
}
