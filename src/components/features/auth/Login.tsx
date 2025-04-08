"use client";
import Button from "@/components/common/button/Button";
import InputPassword from "@/components/common/form/InputPassword";
import InputText from "@/components/common/form/InputText";
import MyIcon from "@/components/common/icon/MyIcon";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validation/validationSchemas";
import Checkbox from "@/components/common/form/Checkbox";
import { useLogin } from "@/hooks/auth/useLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const router = useRouter();

  const { mutate, isPending, isError } = useLogin();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const rememberMeValue = watch("rememberMe"); // Watch the value of rememberMe

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    mutate(data);
  };

  return (
    <div className="w-full">
      <MyIcon src="/assets/icons/logo-sonergy.svg" width={150} height={60} />
      <div className="mt-2 mb-6">
        <h1 className="font-extrabold text-3xl mb-2">Sign Up</h1>
        <p className="text-sm leading-5 font-normal text-[#4B5563]">
          Sign up to enjoy the feature of Sonergy
        </p>
      </div>
      {isError && (
        <div className="p-4 bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA] rounded-md shadow-md mb-3 w-full">
          <p className=" text-sm">
            Invalid email or password. Please try again.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="mb-6">
          <div className="mb-4">
            <InputText
              label="Email"
              placeholder="Enter your email"
              {...register("email")} // Bind the input to React Hook Form
              error={errors.email?.message}
            />
          </div>

          <div className="mb-4">
            <InputPassword
              label="Password"
              placeholder="Enter your password"
              {...register("password")} // Bind the input to React Hook Form
              error={errors.password?.message}
            />
          </div>

          <div className="flex justify-between">
            <div className="mb-4">
              <Checkbox
                name="rememberMe"
                label="Remember Me"
                register={register} // Pass register function to Checkbox
                errors={errors} // Optionally pass errors to display validation messages
              />
            </div>
            {errors.rememberMe?.message}
            <Link
              href="/forget-password"
              className="text-[#28913F] text-center text-sm leading-5 font-normal"
            >
              Forget password
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          loading={isPending}
          disabled={isPending}
          className="w-full bg-[#28913F]"
        >
          Sign In
        </Button>
      </form>
      <p className="text-center text-sm leading-5 font-normal mb-6">
        Need an account?{" "}
        <Link href="/register" className="text-[#28913F]">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
