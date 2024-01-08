import { GET, post } from "@/web.request";

export const displayPriceHandler = (interval) =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    return GET(`${apiUrl}/get-price/${interval}`)
};

export const createCheckoutHandler = (payload) =>{
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    return post(`${apiUrl}/create_checkout`,payload);
}