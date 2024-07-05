// services/fineTuneService.js
const client = require('./openAIClient');

const fineTuneModel = async (fileIds, baseModel, jobName) => {
  try {
    const response = await client.fineTunes.create({
      training_files: fileIds,
      model: baseModel,
      n_epochs: 4,
      job_name: jobName,
    });
    console.log(`Fine-tune job '${jobName}' started successfully:`, response);
    return response.id;
  } catch (error) {
    console.error(`Error starting fine-tune job '${jobName}':`, error.message);
    return null;
  }
};

const getFineTuneJobDetails = async (jobId) => {
  try {
    const response = await client.fineTunes.retrieve(jobId);
    return response;
  } catch (error) {
    console.error(`Error retrieving fine-tune job '${jobId}':`, error.message);
    return null;
  }
};

const waitForFineTuneCompletion = async (jobId) => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  let jobDetails;
  let status = 'pending';

  while (status !== 'succeeded' && status !== 'failed') {
    jobDetails = await getFineTuneJobDetails(jobId);
    if (jobDetails) {
      status = jobDetails.status;
      console.log(`Current status of job '${jobId}': ${status}`);
      if (status === 'succeeded') {
        console.log(`Fine-tune job '${jobId}' completed successfully.`);
        return jobDetails.fine_tuned_model;
      } else if (status === 'failed') {
        console.error(`Fine-tune job '${jobId}' failed.`);
        return null;
      }
    }
    await sleep(60000); // Wait 1 minute before checking the status again
  }
};

module.exports = {
  fineTuneModel,
  getFineTuneJobDetails,
  waitForFineTuneCompletion,
};