import * as yup from "yup";

const regex = {
  emailRegexp: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  passwordRegexp: /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
  uaWordRegexp: /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
  enWordRegexp: /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
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

export const wordsSchema = yup.object().shape({
  category: yup.string().required("Please select a category"),
  modalIsIrregular: yup
    .boolean()
    .nullable()
    .test("is-required-for-verb", 'This field is required when category is "Verb"', function (value) {
      const { category } = this.parent;
      return category !== "verb" || value === true || value === false;
    }),
  ua: yup
    .string()
    .required("Please enter the Ukrainian word")
    .matches(regex.uaWordRegexp, "Invalid language. Please use Ukrainian"),
  en: yup
    .string()
    .required("Please enter the English word")
    .matches(regex.enWordRegexp, "Incorrect language. Please use English"),
});
