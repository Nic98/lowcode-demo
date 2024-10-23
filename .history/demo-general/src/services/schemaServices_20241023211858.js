import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/goods';
const API_URL_POST = 'http://localhost:3000/goods/add';
const API_URL_DELETE = 'http://localhost:3000/goods/delete';
const API_URL_PUT = 'http://localhost:3000/goods/update';


export const getGoodsList = async (data) => {
  try {
    const response = await axios.get(API_URL_GET, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addGoods = async (data) => {
  const dataWithKey = { ...data, key: Date.now() };
  try {
    const response = await axios.post(API_URL_POST, dataWithKey);
    console.log('Success:', response);
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

export const deleteGoods = async (data) => {
  try {
    const response = await axios.delete(API_URL_DELETE, { params: { _id: data._id } });
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export const updateGoods = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL_PUT}/${id}`, data);
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export default {
  getGoodsList,
  addGoods,
  deleteGoods,
  updateGoods,
};