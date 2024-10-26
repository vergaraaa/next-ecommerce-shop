// [1, 2, 3, 4, 5, ..., 7]
export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
): (string | number)[] => {
  // if currentPage number is 7 or less
  // show all pages without the dots
  if (currentPage <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // if currentPage is between first 3 pages
  // show first 3, dots and last 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // if currentPage is between last 3 pages
  // show first 2, dots, last 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // if currentPage is between the middle
  // show first page, dots, currentPage and neighbors
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
