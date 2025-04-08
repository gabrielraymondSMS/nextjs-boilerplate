"use client";
import Badge from "@/components/common/badge/Badge";
import Button from "@/components/common/button/Button";
import HeaderPage from "@/components/common/header/HeaderPage";
import MyIcon from "@/components/common/icon/MyIcon";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import PhotoProfileUpload from "./PhotoProfileUpload";
import InputText from "@/components/common/form/InputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserFormInputs, User } from "@/types/ColumnType";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserSchema } from "@/lib/validation/validationSchemas";
import CustomSelect from "@/components/common/form/CustomSelect";
import InputPhone from "@/components/common/form/InputPhone";
import { roleOptions } from "@/lib/options/Options";
import InputPassword from "@/components/common/form/InputPassword";
import { decryptData } from "@/lib/utils/crypto";
import { useRouter } from "next/navigation";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";
import ConfirmationUser from "./ConfirmationUser";
import { useApproveUser } from "@/hooks/auth/useApprove";

interface EditUserProps {
  userId: string;
}

const EditUser: React.FC<EditUserProps> = ({ userId }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [isShowConfirmationActive, setIsShowConfirmationActive] =
    useState<boolean>(false);
  const [isShowConfirmationUpdate, setIsShowConfirmationUpdate] =
    useState<boolean>(false);
  const { mutate, isPending } = useUpdateUser();
  const { mutate: mutateApprove, isPending: isPendingApprove } =
    useApproveUser();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateUserFormInputs>({
    resolver: yupResolver(updateUserSchema),
    shouldUnregister: true,
  });

  const roleValue = watch("role");
  const phoneValue = watch("phone");

  useEffect(() => {
    if (!userId) return;
    const storedData = sessionStorage.getItem(userId);
    if (!storedData) {
      alert("Anda Tidak Mempunyai Akses");
      return;
    }

    try {
      const userDataDecrypted: User = JSON.parse(decryptData(storedData));
      if (userDataDecrypted) {
        console.log(userDataDecrypted);
        reset(userDataDecrypted);
        setUserData(userDataDecrypted);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat memuat data pengguna.");
    }
  }, [userId, reset]);

  const cleanedData = useMemo(() => {
    return (data: UpdateUserFormInputs) =>
      Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== "" && value !== undefined && value !== null
        )
      );
  }, []);

  const onSubmit: SubmitHandler<UpdateUserFormInputs> = useCallback(
    (data) => {
      if (!userData?.id) {
        alert("User ID tidak ditemukan.");
        return;
      }

      const sanitizedData = cleanedData(data);
      mutate(
        { id: userData.id, body: sanitizedData },
        {
          onSuccess: () => {
            router.push("/users");
          },
        }
      );
    },
    [cleanedData, mutate, userData, router]
  );

  const handleActive = useCallback(() => {
    if (!userData?.id) {
      alert("User ID tidak ditemukan.");
      return;
    }
    mutateApprove(
      { email: userData?.email, status: "activate" },
      // {
      //   onSuccess: () => {
      //     router.push("/users");
      //   },
      // }
    );
  }, [mutateApprove, userData, router]);

  return (
    <>
      <div className=" pb-16 overflow-auto h-[calc(100vh-68px)] px-8 pt-6  ">
        <ConfirmationUser
          setIsShow={setIsShowConfirmationActive}
          isShow={isShowConfirmationActive}
          handleSubmit={() => {
            handleActive();
          }}
          title="Confirm User Activation?"
          desc="Are you sure you want to activate this user?"
          primaryButton="Activate"
          secondaryButton="Cancel"
        />
        <ConfirmationUser
          setIsShow={setIsShowConfirmationUpdate}
          isShow={isShowConfirmationUpdate}
          handleSubmit={handleSubmit(onSubmit)}
          title="Confirm User Update?"
          desc="Are you sure you want to update this user?"
          primaryButton="Update"
          secondaryButton="Cancel"
          isLoading={isPending}
        />
        <HeaderPage
          title={
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/users")}>
                <MyIcon
                  src="/assets/icons/ic-chevron_down.svg"
                  width={24}
                  height={24}
                  className="rotate-90"
                />
              </button>
              <h1 className="capitalize">{userData?.name}</h1>
              {userData?.status ? (
                <Badge status={"active"} state="success" />
              ) : (
                <Badge status={"inactive"} state="nonactive" />
              )}
            </div>
          }
          button={
            <div className="flex items-center gap-4">
              <Button
                className="w-fit"
                style="outline_secondary"
                onClick={() => setIsShowConfirmationActive(true)}
              >
                Activate User
              </Button>
              <Button
                className="w-fit"
                style="primary"
                onClick={() => setIsShowConfirmationUpdate(true)}
              >
                Save
              </Button>
            </div>
          }
        />

        <form>
          <PhotoProfileUpload />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputText
              label="Name"
              placeholder="Enter your name"
              {...register("name")}
            />

            <CustomSelect
              name="role"
              label="User Role"
              placeholder="Select role"
              value={roleValue ? roleValue : `${userData?.role}`}
              onChange={(value) => setValue("role", value)}
              onBlur={() => setValue("role", roleValue)}
              options={roleOptions}
              error={errors.role?.message}
            />

            <InputPhone
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phoneValue ?? `${userData?.phone}`} // From your form state
              onChange={(value) => setValue("phone", value)} // Your state setter
              onBlur={() => { }} // Optional blur handler
              error={errors.phone?.message}
            />

            <InputText
              label="Email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
            />

            <InputPassword
              label="Password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
            />
            <InputPassword
              label="Confirm Password"
              placeholder="Enter your confirm password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
