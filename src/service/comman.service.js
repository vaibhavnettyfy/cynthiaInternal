const { post } = require("@/web.request");

export const setIndividualHandler = (type,payload) =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    return post(`${apiUrl}/set-individual/${type}`,payload);
}

export const createOrganizationApiHandler = (data) =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    return post(`${apiUrl}/create-organization`,data);
};