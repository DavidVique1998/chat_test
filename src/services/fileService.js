// services/fileService.js
const fs = require('fs');
const FormData = require('form-data');
const client = require('./openAIClient');

const uploadFile = async (filePath) => {
  const form = new FormData();
  form.append('purpose', 'fine-tune');
  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await client.files.create(form);
    console.log('File uploaded successfully:', response);
    return response.id;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    return null;
  }
};

const listFiles = async () => {
  try {
    const response = await client.files.list();
    console.log('Files:', response);
    return response;
  } catch (error) {
    console.error('Error listing files:', error.message);
    return null;
  }
};

const deleteFile = async (fileId) => {
  try {
    const response = await client.files.delete(fileId);
    console.log('File deleted successfully:', response);
    return response;
  } catch (error) {
    console.error('Error deleting file:', error.message);
    return null;
  }
};

module.exports = {
  uploadFile,
  listFiles,
  deleteFile,
};