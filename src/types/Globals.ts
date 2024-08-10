export interface SortOptions {
  by: 'noSort' | 'creationDate' | 'dueDate';
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  status: 'all' | 'completed' | 'incomplete';
  priority: 'all' | 'high' | 'low';
}

export default interface Globals {
  theme: 'light' | 'dark';
  error: string;
  success: string;
  sort: SortOptions;
  filter: FilterOptions;
}
