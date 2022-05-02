/* --- STATE --- */
export interface AccountState {
  listAccount: Array<IAccount>;
  detailAccount:
    | IAccount
    | {
        firstName: '';
        lastName: '';
        username: '';
        address: '';
        email: '';
        phone: '';
        role: '';
        createAt: null;
        updateAt: null;
      };
  total_item: number;
  total_page: number;

  page: number;
  size: number;

  updateStatus: boolean;
  deleteStatus: boolean;

  errorMessage: string;
}

export interface IAccount {
  id: number;
  status: number;
  createAt: string | null;
  createBy: string | null;
  updateAt: string | null;
  updateBy: string | null;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  amount: number | null;
  email: string;
  phone: string;
  role: string;
}
