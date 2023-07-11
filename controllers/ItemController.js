const  Item  = require('../models/Item')

const GetItems = async (req, res) => {
  try {
    const Items= await Item.find({}).sort('name').populate('category').exec();
    Items.sort((a,b) => a.category.sortOrder - b.category.sortOrder)
    res.send(Items)
  } catch (error) {
    throw error
  }
}

const CreateItem = async (req, res) => {
  try {
    const Item = await Item.create({ ...req.body })
    res.send(Item)
  } catch (error) {
    throw error
  }
}

const UpdateItem = async (req, res) => {
  try {
    const Item = await Item.findByIdAndUpdate(req.params.post_id, req.body, {new: true})
    res.send(Item)
  } catch (error) {
    throw error
  }
}

const DeleteItem = async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.post_id })
    res.send({ msg: 'Category Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetItems,
  CreateItem,
  UpdateItem,
  DeleteItem
}
