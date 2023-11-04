import { subscriptionsStatus } from "@/helper";
import { useEffect, useState } from "react";
import CommonModal from "./common/Modal";



export default function WithAuth(Component) {
  const WithAuthComponent = (props) => {
    const [isModalOpen, setIsModalOpen] = useState({
      open: false,
      currentComponent: "",
    });

    useEffect(() => {
      const checkHandler = async () => {
        const response = await subscriptionsStatus();
        return response;
      };

      const checkSubscription = async () => {
        let userRole = ""
        const response = await checkHandler();
        if (response !== "active") {
          if (response == "inActive") {
            if (typeof window !== 'undefined') {
            userRole = localStorage.getItem("userRole");
            }
            if (userRole == "member") {
              setIsModalOpen({
                open: true,
                currentComponent: "planEnd",
              });
            } else {
                // i found this solution when we implement Hoc to redertic
              window.location.href = "/pricing";
            }
          } else {
            if (response !== "trialing") {
              if (typeof window !== 'undefined') {
                userRole = localStorage.getItem("userRole");
              }
                if (userRole === "member") {
                  setIsModalOpen({
                    open: true,
                    currentComponent: "subscriptionIssue",
                  });
                } else {
                  setIsModalOpen({
                    open: true,
                    currentComponent: "paymenentPending",
                  });
                }
            }
          }
        } 
        if(!response){
          if (typeof window !== 'undefined') {
            userRole = localStorage.getItem("userRole");
          }
            if (userRole === "member") {
              setIsModalOpen({
                open: true,
                currentComponent: "subscriptionIssue",
              });
            } else {
              setIsModalOpen({
                open: true,
                currentComponent: "paymenentPending",
              });
            }
        }
      };
      checkSubscription();
    }, []);

    return (
      <>
        <Component {...props} />

        <CommonModal
          modalOpen={isModalOpen}
          handleClose={() =>
            setIsModalOpen({ open: false, currentComponent: "", name: "" })
          }
        />
      </>
    );
  };

  return WithAuthComponent;
}
