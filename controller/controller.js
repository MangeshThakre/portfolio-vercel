const projectModel = require("../sehema/ProjectSchema.js");
class controller {
  static async insertProject(req, res) {
    const category = req.body.category;
    const isSubcategory = req.body.isSubcategory;
    const subCategory = req.body.subCategory;
    const categoryImg = req.body.categoryImg;
    const isCategoryHidden = req.body.isCategoryHidden;
    const projectName = req.body.projectName;
    const liveLink = req.body.liveLink;
    const gitRepoLink = req.body.gitHub;
    const projectImg = req.body.projectImg;
    const ProjectDiscroption = req.body.ProjectDiscroption;
    const responsive = req.body.responsive;
    const display = req.body.display;

    // console.log(req.body);
    // console.log(req.query);

    const projectInfo = new projectModel({
      category,
      categoryImg,
      isCategoryHidden,
      isSubcategory,
      subCategory,
      projectName,
      liveLink,
      gitRepoLink,
      projectImg,
      responsive,
      display,
      ProjectDiscroption,
      created_at: new Date(),
    });

    // console.table({
    //   category,
    //   categoryImg,
    //   isCategoryHidden,
    //   isSubcategory,
    //   subCategory,
    //   projectImg,
    //   projectName,
    //   liveLink,
    //   gitRepoLink,
    //   ProjectDiscroption,
    //   responsive,
    //   display,
    //   created_at: new Date(),
    // });

    try {
      const result = await projectInfo.save();
      res.json({
        status: 200,
        error: false,
        data: result,
      });
    } catch (error) {
      res.json({
        status: 500,
        error: true,
        data: error.message,
      });
    }
  }

  static async fetchProject(req, res) {
    function groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        acc[key] ??= [];
        acc[key].push(obj);
        return acc;
      }, {});
    }
    try {
      const response = await projectModel.find();
      const projects = groupBy(response, "category");
      res.status(200).json({ error: false, projects });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  // edit paoject

  static async edit_project(req, res) {
    const id = req.query.id;
    const updateCatecory = req.query.updateCatecory;
    const category = req.body.category;
    const isSubcategory = req.body.isSubcategory;
    const subCategory = req.body.subCategory;
    const categoryImg = req.body.categoryImg;
    const isCategoryHidden = req.body.isCategoryHidden;
    const projectName = req.body.projectName;
    const liveLink = req.body.liveLink;
    const gitRepoLink = req.body.gitHub;
    const projectImg = req.body.projectImg;
    const ProjectDiscroption = req.body.ProjectDiscroption;
    const responsive = req.body.responsive;
    const display = req.body.display;

    const projectInfo = {
      category,
      categoryImg,
      isCategoryHidden,
      isSubcategory,
      subCategory,
      projectName,
      liveLink,
      gitRepoLink,
      projectImg,
      responsive,
      display,
      ProjectDiscroption,
    };

    let saveCategory = "";
    if (updateCatecory == "true") {
      try {
        await projectModel.updateMany(
          { category },
          {
            $set: {
              categoryImg: categoryImg,
              isCategoryHidden: isCategoryHidden,
            },
          },
          { new: true }
        );
      } catch (error) {
        res.json({
          status: 500,
          error: true,
          message: error.message,
        });
      }
    }

    try {
      const updateProject = await projectModel.findByIdAndUpdate(
        id,
        projectInfo,
        { new: true }
      );
      res.json({
        status: 200,
        error: false,
        data: updateProject,
      });
    } catch (error) {
      res.json({
        status: 500,
        error: true,
        message: error.message,
      });
    }
  }

  static deleteProject(req, res) {}
}

module.exports = controller;
