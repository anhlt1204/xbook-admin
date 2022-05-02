import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const slice = (state: RootState) => state?.account || initialState;

export const selectAccount = createSelector([slice], state => state);
