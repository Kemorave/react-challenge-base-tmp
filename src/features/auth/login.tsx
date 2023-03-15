import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { useEffect } from "react";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Constants } from "../../app/config/constants";
import Spinner from "../../components/spinner";
import SpinnerButton from "../../components/spinnerButton";
import { useLoginMutation } from "../../services/api.service";
import { AuthResult } from "../../types/auth";
import { authSelector, logIn } from "./auth.slice";
function Error(props: { msg: string }) {
  return (
    <span role="alert" className="text-xs dark:text-red-500 text-red-700">
      {props.msg}
    </span>
  );
}
function Login() {
  const auth = useSelector(authSelector);
if (auth.user) {
  return <Navigate replace to={Constants.profile}/>
}
  const [login, { isLoading, data, error, isError, isSuccess }] =
    useLoginMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(logIn(error as FetchBaseQueryError));
    }else if(data){
      dispatch(logIn(data as AuthResult));
    }
  }, [error, data]);
  const onSubmit = (e: FieldValues) => {
    console.log(e);
    login({ email: e["email"], password: e["password"] });
  };

  return (
    <div className="h-full flex flex-col  items-center">
      <form
        className="flex transition-all duration-700 my-auto  md:min-w-[350px]   mx-10 gap-3 rounded-md flex-col p-5  border-[1px] border-b-4 border-l-4 border-gray-700 shadow-md "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-2xl">
          Welcome <span className="underline">back</span> to the{" "}
          <span className="animate-pulse font-semibold shadow-inner text-gray-500 px-1 rounded-sm shadow-black dark:shadow-white">
            bit
          </span>
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

        <SpinnerButton
          type="submit"
          className="ml-0 mr-auto"
          lable="Login"
          isBusy={isLoading}
        />
      </form>
    </div>
  );
}

export default Login;
