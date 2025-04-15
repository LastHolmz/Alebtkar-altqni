/**
 * Formats a MongoDB date into the format: `dd/mm/yy | hour:min, AM/PM` or `سباحا/مسا` for Arabic.
 *
 * @param {Date} date - The MongoDB date object to format.
 * @param {"ar" | "en"} lang - The language format: "ar" for Arabic, "en" for English.
 * @returns {string} The formatted date string in the specified format.
 * @throws {Error} If the input is not a valid Date object or an invalid language is provided.
 *
 * @example
 * // Example usage with a MongoDB date:
 * const mongoDate = new Date("2024-11-23T13:45:00.000Z");
 * console.log(formatDateInDetails(mongoDate, "en"));
 * // Output: "23/11/24 | 1:45 PM"
 *
 * console.log(formatDateInDetails(mongoDate, "ar"));
 * // Output: "23/11/24 | 1:45 مساءا"
 */
export function formatDateInDetails(date: Date, lang: "ar" | "en"): string {
  // Ensure the input is a valid Date object
  if (!(date instanceof Date)) {
    return "Invalid date.";
  }

  if (!["ar", "en"].includes(lang)) {
    return "Invalid language.";
  }

  const day = String(date.getDate()).padStart(2, "0"); // Get day with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-based, add 1)
  const year = String(date.getFullYear()).slice(2); // Get last two digits of the year

  let hours = date.getHours(); // Get the hour (24-hour format)
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes with leading zero
  const isPM = hours >= 12; // Determine AM or PM
  hours = hours % 12 || 12; // Convert to 12-hour format, 0 becomes 12

  const period =
    lang === "ar" ? (isPM ? "مساءا" : "صباحا") : isPM ? "PM" : "AM";

  // Construct the formatted date string
  return `${day}/${month}/${year} | ${hours}:${minutes} ${period}`;
}

/**
 * Converts a date input (string or Date) to the format `dd/mm/yyyy`.
 *
 * @param {string | Date} input - The date string in `dd/mm/yyyy` format or a Date object.
 * @param {"ar" | "en"} lang - The language format for error messages: "ar" for Arabic, "en" for English.
 * @returns {string} The formatted date string in `dd/mm/yyyy` format.
 * @throws {Error} If the input is not a valid Date object or a string in the correct format.
 *
 * @example
 * console.log(formatToDate("23/11/2024", "en"));
 * // Output: "23/11/2024"
 *
 * console.log(formatToDate(new Date("2024-11-23"), "ar"));
 * // Output: "23/11/2024"
 */
export function formatToDate(
  input: string | Date,
  lang: "ar" | "en" = "en"
): string {
  const errorMessage =
    lang === "ar" ? "صيغة التاريخ غير صحيحة." : "Invalid date format.";

  const invalidInputMessage =
    lang === "ar"
      ? "المدخل غير صحيح. يُتوقع سلسلة نصية أو كائن تاريخ."
      : "Invalid input. Expected a string or Date object.";

  if (input instanceof Date) {
    if (isNaN(input.getTime())) {
      return lang === "ar" ? "كائن التاريخ غير صالح." : "Invalid Date object.";
    }
    const day = String(input.getDate()).padStart(2, "0");
    const month = String(input.getMonth() + 1).padStart(2, "0");
    const year = input.getFullYear();
    return `${day}/${month}/${year}`;
  }

  if (typeof input === "string") {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // Regex to validate and capture date parts
    const match = dateRegex.exec(input);

    if (!match) {
      return errorMessage;
    }

    const [_, day, month, year] = match;
    return `${day}/${month}/${year}`;
  }

  return invalidInputMessage;
}

export const formatDate = (date: Date, language: "ar" | "en"): string => {
  const months = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ar: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
  };

  const day = date.getDate();
  const month = months[language][date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
