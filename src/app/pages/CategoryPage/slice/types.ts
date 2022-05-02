/* --- STATE --- */
export interface CategoryState {
  listCategory: Array<ICategory>;
  detailCategory:
    | ICategory
    | {
        name: string;
        description: string;
        createAt: null;
        updateAt: null;
      };
  total_item: number;
  total_page: number;

  page: number;
  size: number;

  addStatus: boolean;
  updateStatus: boolean;
  deleteStatus: boolean;

  errorMessage: string;
}

export interface ICategory {
  id: number;
  status: number;
  createAt: string | null;
  createBy: string | null;
  updateAt: string | null;
  updateBy: string | null;
  name: string;
  description: string;
  slug: string | null;
  parentsId: null;
}
