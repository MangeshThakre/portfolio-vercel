const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectsSchema = new Schema({
  category: { type: String, require: true },
  isSubcategory: { type: Boolean },
  subCategory: { type: String },
  categoryImg: { type: String, require: true },
  projectName: { type: String, require: true },
  liveLink: { type: String, require: true },
  gitRepoLink: { type: String, require: true },
  projectImg: { type: String, require: true },
  responsive: { type: Boolean },
  display: { type: Boolean },
  created_at: { type: Date, require: true },
  ProjectDiscroption: { type: String },
  isCategoryHidden: { type: Boolean },
});

const ProjectModel = mongoose.model("project", ProjectsSchema);
module.exports = ProjectModel;
