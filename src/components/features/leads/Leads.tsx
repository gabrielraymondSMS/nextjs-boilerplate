"use client";
import Badge from "@/components/common/badge/Badge";
import Button from "@/components/common/button/Button";
import InputSearch from "@/components/common/form/InputSearch";
import HeaderPage from "@/components/common/header/HeaderPage";
import MyIcon from "@/components/common/icon/MyIcon";
import Pagination from "@/components/common/table/Pagination";
import Table from "@/components/common/table/Table";
import { useDeleteLead } from "@/hooks/useDeleteLead";
import { useLeadList } from "@/hooks/useLeads";
import { encryptData } from "@/lib/utils/crypto";
import { Column } from "@/types/ColumnType";
import { LeadsType } from "@/types/LeadType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import ConfirmationLead from "./ConfirmationLead";

const Leads = () => {
  const router = useRouter();

  const [leadDetail, setLeadDetail] = useState<LeadsType>();
  const [isShowConfirmationDelete, setIsShowCofimationDelete] =
    useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
  });

  const { data: leadListData, isLoading: isLeadListLoading } = useLeadList({
    page: pagination.page,
    limit: pagination.limit,
  });

  const { mutate: deleteLead, isPending: isPendingDelete } = useDeleteLead();

  const handleToEdit = useCallback(
    (row: any) => {
      const encryptedId = encryptData(row.createdDate);
      const encryptedData = encryptData(JSON.stringify(row));
      sessionStorage.setItem(row.createdDate, encryptedData);
      router.push(`/leads/${encryptedId}`);
    },
    [router]
  );

  const handleClickDelete = (user: LeadsType) => {
    setLeadDetail(user);
    setIsShowCofimationDelete(true);
  };

  const handleDelete = () => {
    if (leadDetail?.id) {
      deleteLead(
        { id: leadDetail?.id },
        {
          onSuccess: () => {
            setIsShowCofimationDelete(false);
          },
        }
      );
    }
  };

  const columns = useMemo<Column<LeadsType>[]>(
    () => [
      {
        key: "user",
        label: "Full Name",
        sortable: true,
        render: (value, row) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-200"></div>
            <span className="capitalize"> {row?.user?.name ?? "-"}</span>
          </div>
        ),
      },
      {
        key: "email",
        label: "Email Address",
        sortable: true,
        render: (value, row) => <div>{row?.user?.email ?? "-"}</div>,
      },
      {
        key: "phone",
        label: "Phone Number",
        sortable: true,
        render: (value, row) => <div>{row?.user?.phone ?? "-"}</div>,
      },

      {
        key: "company_size",
        label: "Size of Company",
        sortable: true,
      },
      {
        key: "status",
        label: "User Status",
        render: (value: any) => (
          <div>
            <Badge
              text={value ? "Approved" : "Archived"}
              state={value ? "success" : "nonactive"}
              dot={true}
            />
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
  return (
    <>
      <ConfirmationLead
        setIsShow={setIsShowCofimationDelete}
        isShow={isShowConfirmationDelete}
        handleSubmit={handleDelete}
        title="Confirm Delete Lead?"
        desc={
          "Are you sure you want to delete this lead? This action cannot be undone."
        }
        primaryButton="Delete"
        secondaryButton="Cancel"
        stylePrimaryButton="danger"
        isLoading={isPendingDelete}
      />
      <div className=" pb-16 overflow-auto h-[calc(100vh-68px)] px-8 pt-6">
        <HeaderPage
          title="Leads"
          button={
            <div className="flex items-center gap-4">
              <div className="max-w-[200px]">
                <InputSearch
                  name="test"
                  onChange={() => {}}
                  placeholder="Search"
                  className=""
                />
              </div>
              <div className="mt-1 w-[200px]">
                <Link href="/leads/create">
                  <Button className="h-[40px] w-full">
                    <div className="flex items-center gap-2 justify-center">
                      <MyIcon
                        src="/assets/icons/ic-plus.svg"
                        width={20}
                        height={20}
                      />
                      Create New Leads
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          }
        />

        <Table
          columns={columns}
          data={leadListData?.data}
          rowKey="id"
          // onSelectionChange={handleSelectionChange}
          pagination={leadListData?.pagination}
          setPagination={setPagination}
          isLoading={isLeadListLoading}
        />
      </div>

      <div className="px-8 border-t absolute bottom-0 left-0 w-full bg-white  py-4">
        <Pagination
          pagination={leadListData?.pagination}
          setPagination={setPagination}
          isLoading={false}
        />
      </div>
    </>
  );
};

export default Leads;
