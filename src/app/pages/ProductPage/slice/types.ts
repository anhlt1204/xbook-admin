/* --- STATE --- */
export interface ProductState {
  listProduct: Array<IProduct>;
  detailProduct:
    | IProduct
    | {
        createAt: null;
        updateAt: null;
        title: string;
        longDescription: string;
        categoryId: number;
        category: string;
        price: number;
        author: string;
        currentNumber: number;
        numberOfPage: number;
        quantitySelled: number;
        images: [{ link: string }];
      };
  total_item: number;
  total_page: number;

  page: number;
  size: number;

  addStatus: boolean;
  updateStatus: boolean;
  deleteStatus: boolean;

  errorMessage: string;

  uploadImageLink: string;
  upLoadImageStatus: boolean;
}

export interface IProduct {
  id: number;
  status: number;
  createAt: string | null;
  createBy: string | null;
  updateAt: string | null;
  updateBy: string | null;
  title: string;
  shortDescription: string | null;
  longDescription: string;
  categoryId: number;
  category: string;
  price: number;
  author: string;
  currentNumber: number;
  numberOfPage: number;
  slug: string | null;
  quantitySelled: number;
  images: [{ link: string }];
}
