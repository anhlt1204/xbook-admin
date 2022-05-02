/* --- STATE --- */
export interface CartState {
  listCart: ICart[];
  total_item: number;
  total_page: number;

  page: number;
  size: number;

  updateStatus: boolean;

  errorMessage: string;
}

export interface ICart {
  orderItems: OrderItem[];

  delivery: Delivery;

  createAt: string;
  createBy: string;
  updateAt: string;
  id: number;
  name: string;
  customerAddress: string;
  phone: string;
  total: number;
  totalPrice: number;
}

interface OrderItem {
  id: number;
  quantity: number;
  product: Product;
}

interface Delivery {
  id: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  product_images: [{ imageUrl: string }];
  current_number: number;
}
