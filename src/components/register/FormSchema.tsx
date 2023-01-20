import * as yup from "yup";

const passwordRules = /^.{5,35}$/;

export const basicSchema = yup.object().shape({
  emailFormik: yup.string().email("Please enter a valid Email").required("Email is required"),

  fullnameFormik: yup.string().min(5, "Minimum Full Name length is 5").required("Full Name is required"),

  passwordFormik: yup
    .string()
    .matches(passwordRules, "Minimum Password length is 5, max is 35")
    .required("Password is required"),

  studentnumberFormik: yup
    .string()
    .length(10, "Psau Student numbers has a length of 10")
    .required("Student Number is required"),

  usernameFormik: yup
    .string()
    .min(5, "Minimum Username length is 5")
    .required("Display name (username) is required"),
});
