/**
 * Asynchronously loads the component for AddProductPage
 */

import { lazyLoad } from 'utils/loadable';

export const AddProductPage = lazyLoad(
  () => import('./index'),
  module => module.AddProductPage,
);
