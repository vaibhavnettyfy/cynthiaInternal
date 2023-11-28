const { post } = require("@/web.request");


export const uploadCsvHandler = (payload) =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    return post (`${apiUrl}/preprocess`,payload);
};