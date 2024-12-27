import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCourse: undefined,
  selectedLesson: undefined,
  editingCourse: undefined,
  searchText: '',
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setSelectedLesson: (state, action) => {
      state.selectedLesson = action.payload;
    },
    setEditingCourse: (state, action) => {
      state.editingCourse = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  setSelectedCourse,
  setSelectedLesson,
  setEditingCourse,
  setSearchText,
} = courseSlice.actions;
export default courseSlice.reducer;
