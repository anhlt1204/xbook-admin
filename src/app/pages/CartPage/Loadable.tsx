/**
 * Asynchronously loads the component for CartPage
 */

import { lazyLoad } from 'utils/loadable';

export const CartPage = lazyLoad(
  () => import('./index'),
  module => module.CartPage,
);
