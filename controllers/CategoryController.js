const  Category  = require('../models/Category')

const GetCategories = async (req, res) => {
  try {
    const Categories= await Category.find({})
    res.send(Categories)
  } catch (error) {
    throw error
  }
}

const CreateCategory = async (req, res) => {
  try {
    const Category = await Category.create({ ...req.body })
    res.send(Category)
  } catch (error) {
    throw error
  }
}

const UpdateCategory = async (req, res) => {
  try {
    const Category = await Category.findByIdAndUpdate(req.params.post_id, req.body, {new: true})
    res.send(Category)
  } catch (error) {
    throw error
  }
}

const DeleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.post_id })
    res.send({ msg: 'Category Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory
}
