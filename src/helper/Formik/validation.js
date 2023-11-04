import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: "",
  password: "",
});

export const personalValidation = Yup.object({
  // keep this comment 
  // profilePicture: Yup.string().required("profile picture is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  // keep this comment code untill client will clear about this
  // organisation: Yup.string().required("Organisation is required"),
  // role : Yup.string().required("role is required"),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  // organizationId : Yup.string().required("Organization is required")
});

export const changePasswordValidation = Yup.object({
  password: Yup.string().required("old Password is required"),
  newPassword: Yup.string()
    .required("new Password is required")
    .min(8, "Password must be at least 8 characters long"),
  reEnterPassword: Yup.string()
    .required("reEnterPassword is required")
    .min(8, "reEnterPassword must be at least 8 characters long"),
});
