/**
 * Asynchronously loads the component for CartPage
 */

import { lazyLoad } from 'utils/loadable';

export const ViewCartPage = lazyLoad(
  () => import('./index'),
  module => module.ViewCartPage,
);
