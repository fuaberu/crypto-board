import { createSlice } from '@reduxjs/toolkit';

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const initialState = {
	value: prefersDarkScheme.matches ? 'dark' : 'light',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		change: (state) => {
			switch (state.value) {
				case 'dark':
					state.value = 'light';
					break;
				case 'light':
					state.value = 'dark';
					break;

				default:
					state.value = 'light';
					break;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { change } = themeSlice.actions;

export default themeSlice.reducer;
