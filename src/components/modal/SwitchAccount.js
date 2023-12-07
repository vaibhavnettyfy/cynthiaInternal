import {
  Box,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import CommonButton from "../common/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CommonModal from "../common/Modal";
import { setIndividualHandler } from "@/service/comman.service";
import { errorNotification, successNotification } from "@/helper/Notification";
import { supabase } from "@/Client";

const SwitchAccount = ({ handleClose }) => {
  const router = useRouter();
  let userId = "";
  let userRole = "";
  let orgId = "";

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
    userRole = localStorage.getItem("userRole");
    orgId = localStorage.getItem("orgId");
  }

  const [members, setMembers] = useState([]);
  const [memberFlag, setMemberFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkMemeber();
  }, []);

  const checkMemeber = async () => {
    try {
      const { data, error } = await supabase
        .from("organization_members")
        .select("*")
        .eq("organization_id", orgId);

      if (error) {
        console.error("Error fetching organization members:", error);
        setMemberFlag(false);
      } else {
        setMemberFlag(true);
        setMembers(data);
      }
    } catch (error) {
      setMemberFlag(false);
      console.error("An error occurred:", error);
    }
  };

  const switchToindividualHandler = async () => {
    setLoading(true);
    const payload = {
      user_id: userId,
    };
    if (userRole === "org_admin") {
      if (memberFlag && members.length === 0) {
        const { data, message, success } = await setIndividualHandler(
          "org_admin",
          payload
        );
        if (success) {
          setLoading(false);
          successNotification(message);
          localStorage.clear();
          router.push(`/`);
          handleClose();
        } else {
          setLoading(false);
          handleClose();
          errorNotification(message);
        }
      } else {
        errorNotification(
          "before swicth to individual you have to remove member"
        );
      }
    } else {
      const { data, message, success } = await setIndividualHandler(
        "individual",
        payload
      );
      if (success) {
        setLoading(false);
        successNotification(message);
        localStorage.clear();
        router.push(`/`);
        handleClose();
      } else {
        setLoading(false);
        handleClose();
        errorNotification(message);
      }
    }
  };

  return (
    <>
      <Box
        width={"450px"}
        height={"265px"}
        sx={{ borderRadius: "24px", padding: "30px" }}
      >
        <DialogContent
          sx={{
            height: "100%",
            padding: "0px",
            textAlign: "center",
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography fontSize={"30px"} fontWeight={"700"} lineHeight={"40px"}>
            Are you sure?
          </Typography>
          <Typography
            fontSize={"16px"}
            fontWeight={"500"}
            lineHeight={"25px"}
            marginBottom={2}
          >
            {userRole === "org_admin"
              ? "Your account type will switch to individual and your organization will be deleted. please ensure you have no members. you will have to relogin for changes to take effect."
              : "Your account type will switch to individual and you will have to relogin"}
          </Typography>
          <Stack flexDirection={"row"} gap={"10px"}>
            <CommonButton
              buttonName="Confirm"
              loading={loading}
              loader={true}
              disabled={loading}
              onClick={() => switchToindividualHandler()}
            />
            <CommonButton buttonName="Cancel" onClick={handleClose} />
          </Stack>
        </DialogContent>
      </Box>
    </>
  );
};

export default SwitchAccount;
