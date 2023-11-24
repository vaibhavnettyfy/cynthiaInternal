const { post } = require("@/web.request");

export const pdfGenerateHandler = (fileId) =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    return post(`${apiUrl}/generate-pdf/${fileId}`)
};