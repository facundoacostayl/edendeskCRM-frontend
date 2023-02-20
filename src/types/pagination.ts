export interface PaginationArgs {
  userid: number;
  page: number;
  size: number;
  sortBy: "firstName" | "balance" | "created_at";
  orderBy: "ASC" | "DESC";
}
