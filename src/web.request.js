import axios from "axios";


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
    const response = await axios.post(url, data,{
        headers,
    });
    if(response.status === 200){
        return {
            success: true,
            data : response.data.data,
            message : response.data.message
        }
    }else{
        return {
            success: false,
            data : response.data.data,
            message : response.data.message
        }
    }
  } catch (error) {
    return {
      success: false,
      data : [],
      message : 'something_Went_Wrong'
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
      message : 'something_Went_Wrong'
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