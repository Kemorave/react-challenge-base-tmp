import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  email: yup.string().max(100, "EmailTooLong").email("InvalidEmail").required(),
  password: yup
    .string()
    .min(8, "PasswordTooShort")
    .max(32, "PasswordTooLong")
    .required("PasswordRequired"),
});
