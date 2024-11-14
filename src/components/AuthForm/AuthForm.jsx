import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema, singInSchema } from "../../utils/validationSchemas.js";
import { useDispatch } from "react-redux";
import { logIn, register } from "../../redux/auth/operations.js";

import InputField from "../InputField/InputField.jsx";
import FormButton from "../FormButton/FormButton.jsx";

import css from "./AuthForm.module.css";

export default function AuthForm({ type, title }) {
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(type === "register" ? signUpSchema : singInSchema),
    mode: "onBlur", // Валідація при зміні фокусу
    reValidateMode: "onSubmit", // Повторна валідація при сабміті
  });

  const onSubmit = (userData) => {
    dispatch(type === "register" ? register(userData) : logIn(userData))
      .unwrap()
      .then((response) => {
        methods.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={css.imputContainer}>
          {type === "register" && <InputField name="name" label="Name" placeholder="Name" />}
          <InputField name="email" label="Email" type="email" placeholder="Email" />
          <InputField name="password" label="Password" type="password" placeholder="Password" />
        </div>
        <FormButton variant="submitAuthFormMobile">{title}</FormButton>
      </form>
    </FormProvider>
  );
}
