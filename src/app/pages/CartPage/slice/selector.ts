import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const slice = (state: RootState) => state?.cart || initialState;

export const selectCart = createSelector([slice], state => state);
