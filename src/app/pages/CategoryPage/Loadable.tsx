/**
 * Asynchronously loads the component for CategoryPage
 */

import { lazyLoad } from 'utils/loadable';

export const CategoryPage = lazyLoad(
  () => import('./index'),
  module => module.CategoryPage,
);
