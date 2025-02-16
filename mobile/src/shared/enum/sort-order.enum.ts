export enum SORT_ORDER {
	ASC = "asc",
	DESC = "desc",
}

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
