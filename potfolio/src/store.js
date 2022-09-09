import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../src/component/projects/ProjectSplice.js";
export default configureStore({
  reducer: { projectReducer },
});
