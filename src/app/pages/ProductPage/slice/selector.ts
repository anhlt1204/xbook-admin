import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const slice = (state: RootState) => state?.product || initialState;

export const selectProduct = createSelector([slice], state => state);
