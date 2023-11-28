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
import { useRouter } from 'next/navigation';
import CommonModal from "@/components/common/Modal";

const PersonalInformation = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    currentComponent: "",
  });
  let userId = ""
  if (typeof window !== 'undefined') {
    userId = localStorage.getItem("userId");
  }
  useEffect(() => {
    userDetailsHandler();
  }, []);

  const userDetailsHandler = async () => {
    if (userId) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);
      setUserDetails(data[0]);
      if (error) {
        errorNotification(error.message || "Something went wrong")
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
      router.push(`/`)
      // errorNotification(error.message || "Something went wrong");
    }
  };

  const updateUserDetails = async (updateData) => {
    // as of now we are just update firstName,email,lastName discuss with client
    const updatedUserData = {
      first_name: updateData.firstName,
      last_name: updateData.lastName,
      email: updateData.email,
    };

    const { data, error, status, statusText } = await supabase
      .from("users")
      .update(updatedUserData).eq("id", userId);

    if (error) {
      errorNotification(error.message || "Error updating user details")
    } else {
      successNotification("User details updated:");
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

  const profilePictureHandler = (e) => {
    // we have take 5 mb is max size
    const maxUploadSize = process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE;
    const file = e.target.files[0];
    if (file.size <= maxUploadSize) {
      formik.setValues({
        ...formik.values,
        profilePicture: e.target.files[0],
      });
      setProfilePicture(URL.createObjectURL(file));
    } else {
      // File exceeds the size limit, show an error message
      errorNotification("File size exceeds the limit.");
    }
  };

  const removeProfilePictureHandler = () => {
    setProfilePicture(null);
    formik.setValues({
      ...formik.values,
      profilePicture: "",
    });
  };

  return (
    <Box>
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
        >
          {/* <Image
            src={profilePicture ? profilePicture : Profileimage}
            alt="Profile Picture"
            width={125}
            height={100}
            layout="fixed"
            objectFit="cover"
            style={{
              borderRadius: "50%",
              marginRight: "20px",
            }}
          /> */}
          {/* <CommonButton
            buttonName="Delete"
            onClick={() => removeProfilePictureHandler()}
            variant="outlined"
            style={{ borderRadius: "3px" }}
          /> */}
          {/* <Button variant="contained" style={{ borderRadius: "3px" }}>
            <input
              type="file"
              className="input_upload_file"
              accept="image/*"
              onChange={profilePictureHandler}
            />
            uploads
          </Button>
          {formik.errors.profilePicture && (
            <h4> {formik.errors.profilePicture} </h4>
          )} */}
        </Stack>
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
            // value="Kate"
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
            // value="Winslet"
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
            // value="Apple"
            name="organisation"
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
            // value="Product Manager"
            name="role"
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
            // value="kate.winslet@apple.com"
            style={{ width: "280px" }}
            name="email"
            formik={formik}
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
            Organization ID{" "}
          </Typography>
          <CommonInput
            value="K1232edwasdweqe2ate"
            disabled
            // formik={formik}
            name="organizationId"
            style={{ width: "280px" }}
          />
          <CommonButton
            buttonName="Switch to individual"
            style={{ borderRadius: "3px", padding: '8px' }}
            onClick={() =>
                setIsModalOpen({
                  open: true,
                  currentComponent: "switchAccount",
                })
              }
          />
          <CommonButton
            buttonName="Create Organization"
            style={{ borderRadius: "3px", padding: '8px' }}
            onClick={() =>
                setIsModalOpen({
                  open: true,
                  currentComponent: "switchAccount",
                })
              }
          />
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
