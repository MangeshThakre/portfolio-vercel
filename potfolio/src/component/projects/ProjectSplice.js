import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "ProjectSplice",
  initialState: {
    Page: "DASHBORD",
    Category: "",
    CategoryArr: [],
    ProjectsArr: [],
  },
  reducers: {
    Category: (state, action) => {
      state.Category = action.payload;
    },

    Page: (state, action) => {
      state.Page = action.payload;
    },

    CategoryArr: (state, action) => {
      state.CategoryArr = action.payload;
    },
    ProjectsArr: (state, action) => {
      state.ProjectsArr = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Category, Page, CategoryArr, ProjectsArr } =
  projectSlice.actions;

export default projectSlice.reducer;
