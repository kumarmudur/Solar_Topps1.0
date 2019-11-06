
import axios from 'axios';

const headerObj = {
    'Accept' : 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export const apiGetCall = async (url, authToken) => {
    const headers = {
        'X-Access-Token': authToken,
        'Content-Type': 'application/json',
        ...headerObj
    };  
    return await axios.get(url, {headers})
    .then(response => response)
    .catch(error => error);
}

export const apiPostCall = async (url, authToken, data) => {
    const headers = {
        'X-Access-Token': authToken,
        'Content-Type': 'application/json',
        ...headerObj
    };  
    return await axios.post(url,  data, { headers })
    .then(response => response)
    .catch(error => error);
}

export const apiPutCall = async (url, authToken, data) => {
    const headers = {
        'X-Access-Token': authToken,
        'Content-Type': 'application/json',
        ...headerObj
    };  
    return await axios.put(url,  data, { headers })
    .then(response => response)
    .catch(error => error);
}

export const apiPostCallFileUpload = async (url, authToken, data) => {
    const headers = {
        'X-Access-Token': authToken,
        'Content-Type': 'multipart/form-data',
        ...headerObj
    };  
    return await axios.post(url,  data, { headers })
    .then(response => response)
    .catch(error => error);
}

export const apiPostWithMultipleFiles = async (urlDataObj, authToken, files) => {
    const headers = {
        'X-Access-Token': authToken,
        'Content-Type': 'multipart/form-data',
        ...headerObj
    };  
    let formData = new FormData();
    let uploadResponse = [];
    let fileDataResponse = null;
    const registrationDocs = {};
    const payload = {
        registerId: parseInt(urlDataObj.registerId),
        registrationDocs: {}
    };
    try {
        for (let key in files) {
            formData.set('file', files[key].file);
            formData.set('fileType', files[key].fileType);
            await axios.post(urlDataObj.filePostUrl,  formData, { headers })
            .then((response) => {
                uploadResponse.push(response.data)
            }).catch(error => error);
        }
        if(uploadResponse.length > 0) {
            uploadResponse.map(fileData => (
                registrationDocs[fileData.fileType] = {
                    documentName: fileData.fileType,
                    fileName: fileData.uploadedFileName,
                    originalname: fileData.fileName,
                    path: fileData.filePath,
                    status: fileData.status,
                    lastUpdated: fileData.lastUpdated
                }
            ));
            payload.registrationDocs = registrationDocs;
            fileDataResponse = await apiPostCall(urlDataObj.registerDocPostUrl, urlDataObj.authToken, {...payload} );
        }
        return fileDataResponse;
    } catch (error) {
        console.log('Associate document upload file error :', error);
    }    
}

