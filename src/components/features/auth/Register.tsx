"use client";
import Button from "@/components/common/button/Button";
import CustomSelect from "@/components/common/form/CustomSelect";
import InputPassword from "@/components/common/form/InputPassword";
import InputText from "@/components/common/form/InputText";
import MyIcon from "@/components/common/icon/MyIcon";
import { useRegister } from "@/hooks/auth/useRegister";
import { createUserSchema } from "@/lib/validation/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateUserFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const Register = () => {
  // const [inputValue, setInputValue] = useState("");
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUserFormInputs>({
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit: SubmitHandler<CreateUserFormInputs> = (data) => {
    mutate(data);
  };

  // Define options for the role select input
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "editor", label: "Editor" },
  ];

  // Watch the role value to pass it to the CustomSelect component
  const roleValue = watch("role");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <div className="w-full">
      <MyIcon src="/assets/icons/logo-sonergy.svg" width={150} height={60} />
      <div className="mt-2 mb-6">
        <h1 className="font-extrabold text-3xl mb-2">Sign Up</h1>
        <p className="text-sm leading-5 font-normal text-[#4B5563]">
          Sign up to enjoy the feature of Sonergy
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="mb-6">
          <div className="mb-4">
            <InputText
              label="Name"
              placeholder="Enter your name"
              {...register("name")} // Bind the input to React Hook Form
              error={errors.name?.message} // Pass validation error message
            />
          </div>
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

          <div className="mb-4">
            <InputPassword
              label="Confirm Password"
              placeholder="Enter your confirm password"
              {...register("confirmPassword")} // Bind the input to React Hook Form
              error={errors.confirmPassword?.message}
            />
          </div>
          <div className="mb-4">
            <CustomSelect
              name="role"
              label="User Role"
              placeholder="Select role"
              value={roleValue}
              onChange={(value) => setValue("role", value)}
              onBlur={() => setValue("role", roleValue)}
              options={roleOptions}
              error={errors.role?.message}
            />
          </div>
        </div>

        <Button
          type="submit"
          loading={isPending}
          disabled={isPending}
          className="w-full bg-[#28913F]"
        >
          Sign Up
        </Button>
      </form>
      <p className="text-center text-sm leading-5 font-normal mb-6">
        Already have an account?{" "}
        <Link href="/login" className="text-[#28913F]">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
