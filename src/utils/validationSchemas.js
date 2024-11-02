import * as yup from "yup";

const regex = {
  emailRegexp: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  passwordRegexp: /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
};

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  email: yup.string().required("Email is required").matches(regex.emailRegexp, "Invalid email. Example: user@mail.com"),
  password: yup
    .string()
    .required("Password is required")
    .matches(regex.passwordRegexp, "The password must consist of 6 English letters and 1 number"),
});

export const singInSchema = yup.object().shape({
  email: yup.string().required("Email is required").matches(regex.emailRegexp, "Invalid email. Example: user@mail.com"),
  password: yup
    .string()
    .required("Password is required")
    .matches(regex.passwordRegexp, "The password must consist of 6 English letters and 1 number"),
});
