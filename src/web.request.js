import axios from "axios";

const TIMEOUT_DURATION = 180000;

const createAxiosInstance = () => {
  return axios.create({
    timeout: TIMEOUT_DURATION,
  });
};


export const post = async (url, data) => {
  try {
     let accessToken = ""
    if (typeof window !== 'undefined') {
      accessToken = localStorage.getItem("accessToken")
    }
    
    const headers = {
        "Accept":"*/*",
        "User-Agent" : "Thunder Client (https://www.thunderclient.com)",
        "api-key" : process.env.NEXT_PUBLIC_API_KEY,
        "Authorization":`Bearer ${accessToken}`
    };
    const response = await createAxiosInstance().post(url, data,{
        headers,
    });
    console.log("resPONSE",response);
    if(response.status === 200){
        return {
            success: true,
            data : response.data,
            message : "getting Data succesfully"
        }
    }else{
        return {
            success: false,
            data : response.data.data,
            message : response.data.message
        }
    }
  } catch (error) {
    console.log("error---->",error);
    return {
      success: false,
      data : [],
      message : error.message||'Something_went_wrong_please_try_later'
    }
  }
};

export const get = async (url) => {
  try {
    const response = await axios.get(url);
    if(response.data.success){
      return {
        success: response.data.success,
        data : response.data.data,
        message : response.data.message
      } 
    }else{
      return {
        success: response.data.success,
        data : response.data.data,
        message : response.data.message
      }
    }
    // return response.data;
  } catch (error) {
    return {
      success: false,
      data : [],
      message : error.message||'Something_went_wrong_please_try_later'
    }
  }
};

export const put = async (url, data) => {
  try {
    const response = await axios.patch(url, data);
    if(response.data.success){
      return {
        success: response.data.success,
        data : response.data.data,
        message : response.data.message
      } 
    }else{
      return {
        success: response.data.success,
        data : response.data.data,
        message : response.data.message
      }
    }
  } catch (error) {
    return {
      success: false,
      data : [],
      message : 'something_Went_wrong'
    }
  }
};


export const DELETE = async (id) => {
  try {
    const response = await axios.delete(id);
    if (response.data.success) {
      return {
        success: response.data.success,
        data : response.data.data,
        message : response.data.message
      }
    } else {
      return {
        success: response.data.success,
        data : response.data.data,
        message : response.data.message
      }
    }
  } catch (error) {
    return {
      success: false,
      data : [],
      message : 'something_Went_wrong'
    }
  }
};