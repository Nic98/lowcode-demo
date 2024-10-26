import { isProjectSchema } from '@alilc/lowcode-types';
import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/save';


export const getProjectSchemaFromDB = async (data) => {
  try {
    const response = await axios.get(API_URL_GET, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateProjectSchemaToDB = async (name, data) => {
  if (!isProjectSchema(data)) {
    throw new Error('Invalid project schema');
  }

  console.log('data', data);
  
  const dataWithKey = {
    pageId: data[0].docId,
    pageName: name,
    ProjectSchema: data,
  }
  
  try {
    const response = await axios.post(API_URL_POST, dataWithKey);
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export default {
  getProjectSchemaFromDB,
  updateProjectSchemaToDB,
};