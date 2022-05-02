/**
 * Asynchronously loads the component for UpdateProductPage
 */

import { lazyLoad } from 'utils/loadable';

export const UpdateProductPage = lazyLoad(
  () => import('./index'),
  module => module.UpdateProductPage,
);
