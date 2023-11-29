const { post } = require("@/web.request");

export const upgradePlanHandler = () =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    return post(`${apiUrl}/create_portal_link`)
};