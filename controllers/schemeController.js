const scheme = require("../models/scheme");

const createScheme = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    console.log(category);
    const isScheme = await scheme.findOne({ title: title });
    if (isScheme) {
      return res.status(404).json({ message: "Scheme already exists" });
    }
    const imageURL = req.file ? req.file.path : null;
    const newScheme = new scheme({
      title: title,
      description: description,
      imageURL: imageURL,
      category: category,
    });
    await newScheme.save();
    return res.status(200).json({ message: "Scheme created successfully" });
  } catch (error) {
    console.log("Error in scheme controller : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSchemes = async (req, res) => {
  try {
    const schemes = await scheme.find();
    if (!schemes) {
      return res.status(404).json({ message: "No schemes found" });
    }
    return res.status(200).json({ schemes: schemes });
  } catch (error) {
    console.log("Error in scheme controller : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editSchemes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const newScheme = await scheme.findById(id);
    const imageURL = req.file ? req.file.path : null;
    if (!newScheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    newScheme.title = title;
    newScheme.description = description;
    newScheme.imageURL = imageURL;
    await newScheme.save();
    return res
      .status(200)
      .json({ message: "Scheme updated successfully", body: newScheme });
  } catch (error) {
    console.log("Error in scheme controller : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteSchemes = async (req, res) => {
  try {
    const id = req.params.id;
    const newScheme = await scheme.findById(id);
    if (!newScheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    await scheme.findByIdAndDelete(id);
    return res.status(200).json({ message: "Scheme Deleted Successfully" });
  } catch (error) {
    console.log("Error in scheme controller : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createScheme, getAllSchemes, editSchemes, deleteSchemes };
