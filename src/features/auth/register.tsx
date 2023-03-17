import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { useEffect } from "react";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { FaSmileWink } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Constants } from "../../app/config/constants";
import { Error } from "../../components/Error";
import Spinner from "../../components/spinner";
import SpinnerButton from "../../components/spinnerButton";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../services/api.service";
import { AuthResult } from "../../types/auth";
import { authSelector, logIn } from "./auth.slice";

const Register = () => {
  const auth = useSelector(authSelector);
  const [registerUser, { isLoading, data, error, isError, isSuccess }] =
    useRegisterMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(logIn(error as FetchBaseQueryError));
    } else if (data) {
      dispatch(logIn(data as AuthResult));
    }
  }, [error, data]);
  const onSubmit = (e: FieldValues) => {
    console.log(e);
    registerUser({
      email: e["email"],
      password: e["password"],
      role: "",
      passwordConfirm: e["rePassword"],
      id: 0,
      name: e["name"],
    });
  };

  return (
    <div className="h-full flex flex-col  items-center">
      <form
        className="flex transition-all duration-700 my-auto  md:min-w-[350px]   mx-10 gap-3 rounded-md flex-col p-5  border-[1px] border-b-4 border-l-4 border-gray-700 shadow-md "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-2xl">
          Wana take a look <span className="text-red-500">inside</span> ?{"  "}
          <FaSmileWink className="animate-bounce inline " />
        </h1>
        {auth.errorKey && <Error msg={auth.errorKey} />}
        <input
          id="email"
          placeholder="Email"
          {...register("email", {
            maxLength: 100,
            required: true,
          })}
          type={"email"}
        />
        {errors.email && <Error msg="email required" />}
        <input
          id="password"
          placeholder="Password"
          type={"password"}
          {...register("password", {
            minLength: 3,
            required: true,
          })}
        />
        {errors.password && (
          <Error
            msg={
              errors.password.type == "minLength"
                ? "Password must be 3 characters or longer"
                : "Password requried"
            }
          />
        )}
        <input
          id="rePassword"
          placeholder="repeat Password"
          type={"password"}
          {...register("rePassword", {
            required: true,
            validate: (value, form) => {
              console.log(value);
              if (value != form["password"]) {
                return "Not match";
              }
              return;
            },
          })}
        />
        {errors.rePassword && (
          <Error
            msg={
              ( errors.rePassword.message?.toString()) ?? "Required"
            }
          />
        )}
        <SpinnerButton
          type="submit"
          className="ml-0 mr-auto"
          lable="Register"
          isBusy={isLoading}
        />
      </form>
    </div>
  );
};

export default Register;
