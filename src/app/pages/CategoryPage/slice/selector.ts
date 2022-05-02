import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const slice = (state: RootState) => state?.category || initialState;

export const selectCategory = createSelector([slice], state => state);
