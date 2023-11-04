import { supabase } from "@/Client";
import { errorNotification } from "./Notification";

export const subscriptionscheck = async (id) => {
  try {
    const {error,data} = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", id);
      if(error){
        errorNotification(error.message);
        return {
          status : false,
          data : null,
          subscriptionsStatus : null
        }
      }else{
        // when user have no subscriptions supabase return blank array that put this condition
        if(data.length > 0){
          return {
            status : true,
            data : data[0],
            subscriptionsStatus : data[0]?.status
          }
        }else{
          return {
            status : true,
            data : data[0],
            subscriptionsStatus : "inActive"
          }
        }
      }
    
  } catch (error) {
    errorNotification(error.message || "Something_went_wrong")
    return {
      status : false,
      data : null,
      subscriptionsStatus : null
    }
  }
};
