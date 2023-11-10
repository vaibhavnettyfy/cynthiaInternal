"use client";

import { supabase } from "@/Client";
import { errorNotification } from "./Notification";
import { subscriptionscheck } from "./Subscription";

export const subscriptionsStatus = async () => {
  let userId = "";
  let role = "";
  let orgId = "";

  if (typeof window !== 'undefined') {
   userId = localStorage.getItem("userId");
   role = localStorage.getItem("userRole");
   orgId = localStorage.getItem("orgId");
  }
  let subscription = false;
  if (role == "individual") {
    const { status, subscriptionsStatus } = await subscriptionscheck(userId);
    if (typeof window !== 'undefined') {
    localStorage.setItem("subscriptionsStatus", subscriptionsStatus);
    }
    if (status) {
      return (subscription = subscriptionsStatus);
    } else {
      return (subscription = "inActive");
    }
  } else {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", orgId);
    if (error) {
      errorNotification(error.message);
    } else {
      // we will get admin id and check subscription is active or not
      const { status, subscriptionsStatus } = await subscriptionscheck(
        data[0].admin_id
      );
      localStorage.setItem("subscriptionsStatus", subscriptionsStatus);
      if (status) {
        return (subscription = subscriptionsStatus);
      } else {
        return (subscription = "inActive");
      }
    }
  }
  return subscription;
};



export const TOPFEEDBACK = "Frequent";
export const COMPLIMENTS = "Compliment";
export const COMPLAINTS = "Complaint";
export const REQUESTS = "Request";
export const QUESTIONS = "Questions";

export const checkFeatures = async (name) => {
  try {
    const { data, error } = await supabase.from("features").select("*").eq("name", name);
    if (error) {
      console.error("Error while fetching data:", error);
      return null;
    }
    console.log("data-checkFeatures",data);
    console.log("error-error",error)

    if (data.length > 0) {
      const status = data[0].is_active;
      const message = data[0].inactive_message;
      return {
        status,
        message,
      };
    } else {
      console.log("No data found for the specified name.");
      return null;
    }
  } catch (e) {
    console.error("An unexpected error occurred:", e);
    return null;
  }
};

// For the Check Fetures 
export const ASKCYNTHIA = "qna_querying";
export const UPLOADINTEGRATION ="upload_and_integrations";
export const TRENDSREPORT = "trends"


export const EventEmitter = {
  events : {},
  dispatch : function(event,data){
      if(!this.events[event]) return 
      this.events[event].forEach((callback) => callback(data))
  },
  subscribe : function(event,callback){
      if (!this.events[event]) this.events[event] = []
      this.events[event].push(callback)
  }
}
