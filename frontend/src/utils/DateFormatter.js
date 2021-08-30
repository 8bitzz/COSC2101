// Format string to DD-MM-YYYY
export default function DateFormatter(str = null) {
  if (!str) return "";
  let date = new Date(str);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
      dt = "0" + dt;
  }
  if (month < 10) {
      month = "0" + month;
  }
  return `${dt}-${month}-${year}`;
}

// Format card date format MM / YY to MM/YYYY
export const formatCardDate = (date) => {
  date = date.replace(/\s+/g, '');  // Remove space -> MM/YY
  var splitDate = date.split("/");  // Split into month and year -> [MM], [YY]
  var yearHead = "20";
  var year = yearHead.concat(splitDate[1]); // Add 2000 to year -? [MM], [20YY]
  var formatted = splitDate[0] + "/" + year;  // Rejoin into formatted date -> MM/YYYY
  return formatted;
}