"use client";

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
