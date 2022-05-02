/* --- STATE --- */
export interface LoginState {
  loading: boolean;
  success: boolean;
  errorMessage: string;

  user: IProfile | null;
}

export interface IProfile {
  id: number;
  status: number | null;
  createAt: string | null;
  createBy: string | null;
  updateAt: string | null;
  updateBy: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  address: string | null;
  amount: number | null;
  email: string | null;
  phone: string | null;
  role: string | null;
}
