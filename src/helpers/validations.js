import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email недействителен")
        .required("Требуется электронная почта"),
    password: Yup.string()
        .min(10, "Пароль должен содержать не менее 10 символов")
        .required("Необходим пароль")
})

export const usersValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email недействителен")
        .required("Требуется электронная почта"),
    first_name: Yup.string()
        .min(2, "FirstName должен содержать не менее 2 символов")
        .required("Необходим FirstName"),
    last_name: Yup.string()
        .min(2, "LastName должен содержать не менее 2 символов")
        .required("Необходим LastName")
})