import Client from "./api";
export const GetItems = async (selectedCategory) => {
  try {
    const res = await Client.get(`/items/${selectedCategory}`)
    return res.data
  } catch (error) {
    throw error
  }
}
  