import { post } from "@/web.request"

export const userRegister = (data) =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    return post(`${apiUrl}/signup`,data);
}