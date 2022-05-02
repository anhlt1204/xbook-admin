/**
 * Asynchronously loads the component for AddProductPage
 */

import { lazyLoad } from 'utils/loadable';

export const ViewProductPage = lazyLoad(
  () => import('./index'),
  module => module.ViewProductPage,
);
