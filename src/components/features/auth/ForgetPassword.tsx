"use client";
import Button from "@/components/common/button/Button";
import InputText from "@/components/common/form/InputText";
import MyIcon from "@/components/common/icon/MyIcon";
import { useForgetPassword } from "@/hooks/auth/useForgetPassword";
import { forgetPasswordSchema } from "@/lib/validation/validationSchemas";
import { ForgetPasswordTypes } from "@/types/ColumnType";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ForgetPassword = () => {
  const { mutate, isPending } = useForgetPassword();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ForgetPasswordTypes>({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgetPasswordTypes> = async (data) => {
    mutate(data, {
      onSuccess: () => {
        
      },
    });
  };

  return (
    <div>
      <MyIcon src="/assets/icons/logo-sonergy.svg" width={150} height={60} />
      <div className="mt-2 mb-6">
        <h1 className="font-extrabold text-3xl mb-2">Forget Password</h1>
        <p className="text-sm leading-5 font-normal text-[#4B5563]">
          Enter the email associated with your account and we’ll send an email
          with instruction to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="mb-4">
          <InputText
            label="Email"
            placeholder="Enter your email"
            {...register("email")} // Bind the input to React Hook Form
            error={errors.email?.message}
          />
        </div>

        <Button
          type="submit"
          //   loading={isPending}
          //   disabled={isPending}
          className="w-full bg-[#28913F]"
        >
          Reset Password{" "}
        </Button>
      </form>
    </div>
  );
};

export default ForgetPassword;
