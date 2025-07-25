export class Pagination {
  totalItems: number = 0;
  itemsPage: number = 2;
  currentPage: number = 1;
  nextPage?: (page: number) => void;
}
