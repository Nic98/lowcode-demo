import { isProjectSchema } from '@alilc/lowcode-types';
import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/save';
const API_URL_GETPAGE = 'http://localhost:3000/projectSchema/getPage';

const defaultSchema = `{"version":"1.0.0","componentsMap":[{"devMode":"lowCode","componentName":"Page"}],"componentsTree":[{"componentName":"Page","id":"root","props":{},"fileName":"","hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""}],"i18n":{"zh - CN":{"i18n - jwg27yo4":"你好 ","i18n - jwg27yo3":"{ name } 博士"},"en - US":{"i18n - jwg27yo4":"Hello ","i18n - jwg27yo3":"Doctor { name } "}}}`;

export const getOneProjectSchemaFromDB = async (name) => { 
  const pageId = 'Lowcode' + name;
  try {
    const response = await axios.post(API_URL_GETPAGE, { pageId: pageId });
    const resdata = response.data.data;
    if (resdata[0].projectSchema === " ") {
      return defaultSchema;
    }
    return resdata[0].projectSchema || defaultSchema;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


export const getProjectSchemaFromDB = async (data) => {
  try {
    const response = await axios.get(API_URL_GET, data);
    const resdata = response.data.data;
    return resdata[0].projectSchema;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateProjectSchemaToDB = async (name, data) => {
  if (!isProjectSchema(data)) {
    throw new Error('Invalid project schema');
  }

  const pageId = 'Lowcode' + name; 

  const dataWithKey = {
    pageId: pageId,
    pageName: name,
    projectSchema: JSON.stringify(data),
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