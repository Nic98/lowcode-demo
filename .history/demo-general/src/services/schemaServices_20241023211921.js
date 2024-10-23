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
  updateGoods,
};