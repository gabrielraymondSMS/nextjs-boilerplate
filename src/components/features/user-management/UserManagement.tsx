"use client";
import Badge from "@/components/common/badge/Badge";
import HeaderPage from "@/components/common/header/HeaderPage";
import MyIcon from "@/components/common/icon/MyIcon";
import Table from "@/components/common/table/Table";
import { useUserList } from "@/hooks/users/useUsers";
import { Column } from "@/types/ColumnType";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CreateUser from "./CreateUser";
import InputSearch from "@/components/common/form/InputSearch";
import Button from "@/components/common/button/Button";
import { encryptData } from "@/lib/utils/crypto";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/table/Pagination";
import { useSnackbarStore } from "@/stores/useSnackbarStore";
import ConfirmationUser from "./ConfirmationUser";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";

interface User {
  id: number | string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: boolean;
  createdDate: Date;
}

const UserManagement = () => {
  const router = useRouter();

  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const [isShowCreateUser, setIsShowCreateUser] = useState<boolean>(false);
  const [isShowConfirmationDelete, setIsShowCofimationDelete] =
    useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<User>();
  const [selectedData, setSelectedData] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
  });

  // Call the custom useUserList hook with pagination params
  const {
    data: userListData,           // 👥 The list of users returned from the API
    isLoading: isUserListLoading, // ⏳ Loading state while fetching user data
    // error: userError,          // ❌ Optional: uncomment to handle errors
  } = useUserList({
    page: pagination.page,        // 🔢 Current page number from component state
    limit: pagination.limit,      // 📦 Number of items per page
  });


  const { mutate: deleteUser, isPending: isPendingDelete } = useDeleteUser();

  const handleToEdit = useCallback(
    (row: any) => {
      const encryptedId = encryptData(row.createdDate);
      const encryptedData = encryptData(JSON.stringify(row));
      sessionStorage.setItem(row.createdDate, encryptedData);
      router.push(`/users/${encryptedId}`);
    },
    [router]
  );

  const handleClickDelete = (user: User) => {
    setUserDetail(user);
    setIsShowCofimationDelete(true);
  };

  // Memoize the columns array to prevent unnecessary re-renders
  const columns = useMemo<Column<User>[]>(
    () => [
      { key: "name", label: "Full Name", sortable: true },
      // { key: "phone", label: "Phone Number", sortable: true },
      { key: "email", label: "Email Address", sortable: true },
      {
        key: "role",
        label: "User Role",
        sortable: true,
      },
      {
        key: "status",
        label: "User Status",
        render: (value: any) => (
          <div>
            {value ? (
              <Badge text={"active"} state={"success"} />
            ) : (
              <Badge text={"inactive"} state={"danger"} />
            )}
          </div>
        ),
        sortable: true,
      },
      {
        key: "id",
        label: "",
        render: (value, row) =>
        // value: any,
        // row: User
        {
          return (
            <div className="flex gap-6">
              <div onClick={() => handleClickDelete(row)}>
                <MyIcon
                  src="/assets/icons/ic-trash.svg"
                  width={20}
                  height={20}
                  className="hover:text-[#D92D20] cursor-pointer"
                />
              </div>

              <div onClick={() => handleToEdit(row)}>
                <MyIcon
                  src="/assets/icons/ic-edit.svg"
                  width={20}
                  height={20}
                  className="hover:text-[#039855] cursor-pointer"
                />
              </div>
            </div>
          );
        },
      },
    ],
    [handleToEdit]
  );

  // Memoize the onSelectionChange function to prevent unnecessary re-renders
  const handleSelectionChange = useCallback((selectedData: User[]) => {
    setSelectedData(selectedData);
  }, []);

  const handleClickCreate = () => {
    setIsShowCreateUser(true);
  };

  const handleDelete = () => {
    if (userDetail?.id) {
      deleteUser({ id: userDetail?.id }, {
        onSuccess: () => {
          setIsShowCofimationDelete(false);
        }
      });
    }
  };

  return (
    <>
      <ConfirmationUser
        setIsShow={setIsShowCofimationDelete}
        isShow={isShowConfirmationDelete}
        handleSubmit={handleDelete}
        title="Confirm Delete User?"
        desc={
          <span>
            Are you sure you want to delete this user? This action <br />
            cannot be undone.
          </span>
        }
        primaryButton="Delete"
        secondaryButton="Cancel"
        stylePrimaryButton="danger"
        isLoading={isPendingDelete}
      />
      <div className="pb-20 overflow-auto h-[calc(100vh-68px)] px-8 pt-6">
        <CreateUser isShow={isShowCreateUser} setIsShow={setIsShowCreateUser} />
        <HeaderPage
          title="User Management"
          button={
            <div className="flex items-center gap-4 flex-col sm:flex-row">
              <div className="sm:max-w-[200px] w-full">
                <InputSearch
                  name="test"
                  // onChange={() => {}}
                  placeholder="Search"
                  className=""
                />
              </div>
              <div className="mt-1 sm:w-[200px] w-full">
                <Button
                  className="h-[40px] w-full"
                  onClick={() => handleClickCreate()}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <MyIcon
                      src="/assets/icons/ic-plus.svg"
                      width={20}
                      height={20}
                    />
                    Create New User
                  </div>
                </Button>
              </div>
            </div>
          }
        />
        {/* {!isUserListLoading && ( */}
        <Table
          columns={columns}
          data={userListData?.data}
          rowKey="id"
          onSelectionChange={handleSelectionChange}
          pagination={userListData?.pagination}
          setPagination={setPagination}
          isLoading={isUserListLoading}
        />
      </div>
      {/* )} */}
      <div className="px-8 border-t absolute bottom-0 left-0 w-full bg-white  py-4">
        <Pagination
          pagination={userListData?.pagination}
          setPagination={setPagination}
          isLoading={isUserListLoading}
        />
      </div>
    </>
  );
};

export default UserManagement;
