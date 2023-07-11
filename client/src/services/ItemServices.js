import Client from "./api";
export const GetItems = async () => {
    try {
      const res = await Client.get('/items')
      return res.data
    } catch (error) {
      throw error
    }
}
  