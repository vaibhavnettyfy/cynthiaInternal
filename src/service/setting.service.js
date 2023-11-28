const { post } = require("@/web.request");


export const inviteMemberHandler = (data) =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    return post(`${apiUrl}/invite-user`,data);
};