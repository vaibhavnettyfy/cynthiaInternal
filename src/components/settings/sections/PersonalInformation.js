import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import CommonInput from "@/components/common/Input";
import CommonButton from "@/components/common/Button";
import Image from "next/image";
import { Profileimage } from "@/helper/constant";
import { useFormik } from "formik";
import { personalInformationIv } from "@/helper/Formik/intialValues";
import { personalValidation } from "@/helper/Formik/validation";
import { errorNotification, successNotification } from "@/helper/Notification";
import { supabase } from "@/Client";
import { useRouter } from "next/navigation";
import CommonModal from "@/components/common/Modal";

const PersonalInformation = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    currentComponent: "",
  });
  let userId = "";
  let userRole = "";
  let orgId = "";

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
    userRole = localStorage.getItem("userRole");
    orgId = localStorage.getItem("orgId");
  }

  useEffect(() => {
    userDetailsHandler();
  }, []);

  const allowRoleorgId = ["member", "org_admin"];

  const userDetailsHandler = async () => {
    if (userId) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);
      setUserDetails(data[0]);
      if (error) {
        errorNotification(error.message || "Something went wrong");
      }
      formik.setValues({
        ...formik.values,
        firstName: data[0]?.first_name,
        lastName: data[0]?.last_name,
        organisation: data[0]?.organization_name,
        role: "",
        email: data[0]?.email,
        // or
      });
    } else {
      router.push(`/`);
      // errorNotification(error.message || "Something went wrong");
    }
  };

  const updateUserDetails = async (updateData) => {
    // as of now we are just update firstName,email,lastName discuss with client
    const updatedUserData = {
      first_name: updateData.firstName,
      last_name: updateData.lastName,
      // email: updateData.email,
    };

    const { data, error, status, statusText } = await supabase
      .from("users")
      .update(updatedUserData)
      .eq("id", userId);

    const { data: updatedAuthData, error: authError } =
      await supabase.auth.updateUser({
        email: updateData.email,
      });

    if (error) {
      errorNotification(
        error?.message || authError.message || "Error updating user details"
      );
    } else {
      successNotification("User details updated successfully:");
    }
  };

  const handleSubmit = () => {
    updateUserDetails(formik.values);
  };

  const formik = useFormik({
    initialValues: personalInformationIv,
    validationSchema: personalValidation,
    onSubmit: handleSubmit,
  });

  return (
    <Box className="inputbox">
      <Typography
        fontSize={"30px"}
        fontWeight={"600"}
        lineHeight={"30px"}
        marginBottom={2}
        marginLeft={3}
      >
        Personal Information
      </Typography>
      <Divider />
      <Box paddingX={5} paddingBottom={5}>
        <Stack
          flexDirection={"row"}
          gap={2}
          marginLeft={"70px"}
          alignItems={"center"}
          marginBottom={2}
        ></Stack>
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          <Typography
            fontSize={"15px"}
            fontWeight={"600"}
            lineHeight={"25px"}
            width={"200px"}
          >
            First Name
          </Typography>
          <CommonInput
            name="firstName"
            formik={formik}
            style={{ width: "280px" }}
          />
        </Stack>
        <Divider />
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          <Typography
            fontSize={"15px"}
            fontWeight={"600"}
            lineHeight={"25px"}
            width={"200px"}
          >
            Last Name
          </Typography>
          <CommonInput
            name="lastName"
            formik={formik}
            style={{ width: "280px" }}
          />
        </Stack>
        <Divider />
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          <Typography
            fontSize={"15px"}
            fontWeight={"600"}
            lineHeight={"25px"}
            width={"200px"}
          >
            Organisation{" "}
          </Typography>
          <CommonInput
            name="organisation"
            disabled
            formik={formik}
            style={{ width: "280px" }}
          />
        </Stack>
        <Divider />
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          <Typography
            fontSize={"15px"}
            fontWeight={"600"}
            lineHeight={"25px"}
            width={"200px"}
          >
            Role{" "}
          </Typography>
          <CommonInput
            value={userRole === "org_admin" ? "Admin" : userRole}
            name="role"
            style={{ width: "280px" }}
          />
        </Stack>
        <Divider />
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          <Box>
            <Typography
              fontSize={"15px"}
              fontWeight={"600"}
              lineHeight={"25px"}
              width={"200px"}
            >
              Email{" "}
            </Typography>
            <Typography
              fontSize={"12px"}
              fontWeight={"400"}
              lineHeight={"20px"}
              color={"#7f7f7f"}
            >
              (Requires Confirmation)
            </Typography>
          </Box>
          <CommonInput
            style={{ width: "280px" }}
            name="email"
            formik={formik}
          />
        </Stack>
        <Divider />
        {allowRoleorgId.includes(userRole) && (
          <Stack
            flexDirection={"row"}
            gap={3}
            alignItems={"center"}
            paddingY={3}
            marginLeft={2}
          >
            <Typography
              fontSize={"15px"}
              fontWeight={"600"}
              lineHeight={"25px"}
              width={"200px"}
            >
              Organization ID{" "}
            </Typography>
            <CommonInput
              value={orgId}
              disabled
              name="organizationId"
              style={{ width: "285px" }}
            />
            {userRole !== "individual" && (
              <CommonButton
                buttonName="Switch to individual"
                style={{ borderRadius: "3px", padding: "8px" }}
                onClick={() =>
                  setIsModalOpen({
                    open: true,
                    currentComponent: "switchAccount",
                  })
                }
              />
            )}
          </Stack>
        )}
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          {userRole === "individual" && (
            <CommonButton
              buttonName="Create Organization"
              style={{ borderRadius: "3px", padding: "8px" }}
              onClick={() =>
                setIsModalOpen({
                  open: true,
                  currentComponent: "createOrg",
                })
              }
            />
          )}
        </Stack>
        <Box marginLeft={"150px"} marginTop={3}>
          <CommonButton
            buttonName="Save Changes"
            onClick={() => formik.handleSubmit()}
            style={{ borderRadius: "3px" }}
          />
        </Box>
      </Box>
      <CommonModal
        modalOpen={isModalOpen}
        handleClose={() =>
          setIsModalOpen({ open: false, currentComponent: "" })
        }
      />
    </Box>
  );
};

export default PersonalInformation;
