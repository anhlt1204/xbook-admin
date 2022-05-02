// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { AccountState } from 'app/pages/AccountPage/slice/types';
import { CategoryState } from 'app/pages/CategoryPage/slice/types';
import { LoginState } from 'app/pages/LoginPage/slice/types';
import { ProductState } from 'app/pages/ProductPage/slice/types';
import { CartState } from 'app/pages/CartPage/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login: LoginState;
  category: CategoryState;
  product: ProductState;
  account: AccountState;
  cart: CartState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
