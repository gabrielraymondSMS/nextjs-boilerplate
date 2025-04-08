import InputPassword from "@/components/common/form/InputPassword";
import InputText from "@/components/common/form/InputText";
import MyIcon from "@/components/common/icon/MyIcon";
import Modal from "@/components/common/modal/Modal";
import PhotoProfileUpload from "./PhotoProfileUpload";
import Button from "@/components/common/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "@/lib/validation/validationSchemas";
import { roleOptions } from "@/lib/options/Options";
import CustomSelect from "@/components/common/form/CustomSelect";
import InputPhone from "@/components/common/form/InputPhone";
import { useCreateUser } from "@/hooks/users/useCreateUser";
import { CreateUserFormInputs } from "@/types/ColumnType";
import ConfirmationUser from "./ConfirmationUser";
import { useState } from "react";

const CreateUser = ({
  isShow,
  setIsShow,
}: {
  isShow: boolean;
  setIsShow: (prev: any) => void;
}) => {
  const { mutate } = useCreateUser();

  const [isShowConfirmationCreate, setIsShowConfirmationCreate] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<CreateUserFormInputs>({
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit: SubmitHandler<CreateUserFormInputs> = (data) => {
    mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
      },
      {
        onSuccess: () => {
          setIsShow(false);
          setIsShowConfirmationCreate(false);
          reset();
        },
        onError: () => {
          setIsShow(true);
          setIsShowConfirmationCreate(false);
        }
      }
    );
  };

  const handleCancel = () => {
    setIsShow(false);
    reset();
  };

  const roleValue = watch("role");
  const phoneValue = watch("phone");

  const handleClickCreate = async () => {
    const isValid = await trigger();
    if (isValid) {
      setIsShowConfirmationCreate(true);
      setIsShow(false);
    }
  };

  const handleClickCancel = () => {
    setIsShow(true);
    setIsShowConfirmationCreate(false);
  };

  const header = () => {
    return (
      <div className="flex gap-5">
        <div className="rounded-full p-2 bg-[#C3EFCB] border-[8px] border-[#E0F8E4] w-fit h-fit">
          <MyIcon
            src="/assets/icons/ic-map.svg"
            width={24}
            height={24}
            className="text-[#267D39]"
          />
        </div>
        <div className="w-full">
          <h1 className="text-lg font-semibold">Create New User</h1>
          <p className="text-sm font-normal text-[#535862]">
            Fill in the information for create new user
          </p>
        </div>
      </div>
    );
  };

  const footer = () => {
    return (
      <div className="flex gap-4">
        <Button
          className="w-full"
          style="outline_secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button className="w-full" onClick={handleClickCreate}>
          Create New User
        </Button>
      </div>
    );
  };

  return (
    <>
      <ConfirmationUser
        setIsShow={setIsShowConfirmationCreate}
        isShow={isShowConfirmationCreate}
        handleSubmit={handleSubmit(onSubmit)}
        handleClickCancel={handleClickCancel}
        title="Confirm Create User?"
        desc="Are you sure you want to create this user?"
        primaryButton="Submit"
        secondaryButton="Cancel"
      />
      <Modal
        header={header()}
        footer={footer()}
        isShow={isShow}
        setIsShow={setIsShow}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PhotoProfileUpload />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-auto max-h-[40dvh]">
              <InputText
                label="Name"
                placeholder="Enter your name"
                {...register("name")} // Bind the input to React Hook Form
                error={errors.name?.message} // Pass validation error message
              />

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

              <InputPhone
                name="role"
                label="User Role"
                placeholder="Select role"
                value={phoneValue ?? ""}
                onChange={(value) => setValue("phone", value)}
                onBlur={() => setValue("phone", phoneValue)}
                error={errors.phone?.message}
              />

              <InputText
                label="Email"
                placeholder="Enter your email"
                {...register("email")} // Bind the input to React Hook Form
                error={errors.email?.message}
              />

              <InputPassword
                label="Password"
                placeholder="Enter your password"
                {...register("password")} // Bind the input to React Hook Form
                error={errors.password?.message}
              />
              <InputPassword
                label="Confirm Password"
                placeholder="Enter your confirm password"
                {...register("confirmPassword")} // Bind the input to React Hook Form
                error={errors.confirmPassword?.message}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateUser;
