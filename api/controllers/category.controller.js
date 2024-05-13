import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const newCategory = new Category({ categoryName });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
