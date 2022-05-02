import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const LoginSlice = (state: RootState) => state?.login || initialState;

export const selectLogin = createSelector([LoginSlice], state => state);
