"use client";
import Badge from "@/components/common/badge/Badge";
import Button from "@/components/common/button/Button";
import InputSearch from "@/components/common/form/InputSearch";
import HeaderPage from "@/components/common/header/HeaderPage";
import MyIcon from "@/components/common/icon/MyIcon";
import Pagination from "@/components/common/table/Pagination";
import Table from "@/components/common/table/Table";
import { Column } from "@/types/ColumnType";
import moment from "moment";
import React, { useMemo, useState } from "react";

type WorkOrderTypes = {
  id: number;
  client_name: string;
  company_name: string;
  company_number: string;
  energy_bill: number;
  acd_status: "created" | "verified" | "signed" | string;
  preclose_date: string; // ISO date string
  preclose_meeting_link: string;
  wo_status:
    | "waiting for approval"
    | "archived"
    | "upload energy"
    | "waiting for ACD"
    | "waiting for preclosing date"
    | "waiting quotation form"
    | "waiting provider submission"
    | "waiting for quotation comparison"
    | "waiting for meeting"
    | "completed / archived"
    | string;
};

const dummyData = [
  {
    id: 1,
    client_name: "John Doe",
    company_name: "Tech Solutions",
    company_number: "TS-001",
    energy_bill: 1500,
    acd_status: "created",
    preclose_date: "2025-04-15",
    preclose_meeting_link: "https://meet.example.com/12345",
    wo_status: "waiting for approval",
  },
  {
    id: 2,
    client_name: "Jane Smith",
    company_name: "Green Energy",
    company_number: "GE-002",
    energy_bill: 2200,
    acd_status: "verified",
    preclose_date: "2025-04-18",
    preclose_meeting_link: "https://meet.example.com/67890",
    wo_status: "waiting for ACD",
  },
  {
    id: 3,
    client_name: "Michael Johnson",
    company_name: "Solar Innovations",
    company_number: "SI-003",
    energy_bill: 1800,
    acd_status: "signed",
    preclose_date: "2025-04-20",
    preclose_meeting_link: "https://meet.example.com/11223",
    wo_status: "waiting for meeting",
  },
  {
    id: 4,
    client_name: "Emily Brown",
    company_name: "Eco Power",
    company_number: "EP-004",
    energy_bill: 2000,
    acd_status: "created",
    preclose_date: "2025-04-25",
    preclose_meeting_link: "https://meet.example.com/44556",
    wo_status: "waiting for quotation comparison",
  },
  {
    id: 5,
    client_name: "Robert Wilson",
    company_name: "Future Energy",
    company_number: "FE-005",
    energy_bill: 2500,
    acd_status: "verified",
    preclose_date: "2025-04-30",
    preclose_meeting_link: "https://meet.example.com/77889",
    wo_status: "archived",
  },
  {
    id: 6,
    client_name: "Emily Brown",
    company_name: "Eco Power",
    company_number: "EP-004",
    energy_bill: 2000,
    acd_status: "created",
    preclose_date: "2025-04-25",
    preclose_meeting_link: "https://meet.example.com/44556",
    wo_status: "uploaded",
  },
  {
    id: 7,
    client_name: "Robert Wilson",
    company_name: "Future Energy",
    company_number: "FE-005",
    energy_bill: 2500,
    acd_status: "verified",
    preclose_date: "2025-04-30",
    preclose_meeting_link: "https://meet.example.com/77889",
    wo_status: "completed",
  },
];

const getStatusStyle = (status: string) => {
  if (status.toLowerCase().includes("waiting for"))
    return "bg-[#F5F5F5] text-[#717680]";
  if (status.toLowerCase() === "archived") return "bg-[#FEF3F2] text-[#D92D20]";
  if (status.toLowerCase() === "uploaded") return "bg-[#EFF8FF] text-[#1570EF]";
  if (status.toLowerCase() === "completed")
    return "bg-[#ECFDF3] text-[#027A48]";
  return "bg-gray-200 text-gray-600"; // Default style
};

const getAcdStatusStyle = (status: string) => {
  if (status.toLowerCase() === "created") return "bg-[#FEF3C7] text-[#B45309]";
  if (status.toLowerCase() === "verified") return "bg-[#D1FAE5] text-[#047857]";
  if (status.toLowerCase() === "signed") return "bg-[#E0E7FF] text-[#3730A3]";
  return "bg-gray-200 text-gray-600"; // Default style
};

const WorkOrder = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
  });

  const columns = useMemo<Column<WorkOrderTypes>[]>(
    () => [
      {
        key: "client_name",
        label: "Client Name",
        sortable: true,
        width: "",
        fixed: "left",
      },
      {
        key: "company_name",
        label: "Company Name",
        sortable: true,
        width: "500px",
      },
      {
        key: "company_number",
        label: "Company Number",
        sortable: true,
        width: "500px",
      },
      {
        key: "energy_bill",
        label: "Energy Bill",
        sortable: true,
        width: "500px",
      },
      {
        key: "acd_status",
        label: "ACD Status",
        render: (value: any) => (
          <div>
            <Badge
              text={value}
              state={value}
              customStyle={getAcdStatusStyle(value)}
            />
          </div>
        ),
        sortable: true,
      },
      {
        key: "preclose_date",
        label: "Preclose Date",
        width: "200px",
        render: (value: any) => <div>{moment(value).format("DD-MM-YYYY")}</div>,
        sortable: true,
      },
      {
        key: "preclose_meeting_link",
        label: "Preclose Meeting Link",
        sortable: false,
        width: "200px",
      },
      {
        key: "wo_status",
        label: "WO Status",
        render: (value: any) => (
          <div>
            <div>
              <Badge
                text={value}
                state={value}
                customStyle={getStatusStyle(value)}
              />
            </div>
          </div>
        ),
        sortable: true,
        width: "500px",
      },
      {
        key: "id",
        label: "",
        fixed: "right",
        render: (value, row) =>
          // value: any,
          // row: User
          {
            return (
              <div className="flex gap-6">
                <MyIcon
                  src="/assets/icons/ic-trash.svg"
                  width={20}
                  height={20}
                  className="hover:text-[#D92D20] cursor-pointer"
                />

                <div
                // onClick={() => handleToEdit(row)}
                >
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
        width: "200px",
      },
    ],
    []
  );
  return (
    <>
      <div className=" pb-16 overflow-auto h-[calc(100vh-68px)] px-8 pt-6">
        <HeaderPage
          title="Work Order"
          button={
            <div className="flex items-center gap-4">
              <div className="max-w-[200px]">
                <InputSearch
                  name="test"
                  //   onChange={() => {}}
                  placeholder="Search"
                  className=""
                />
              </div>
              <div className="mt-1 w-fit">
                <Button
                  className="h-[40px] w-full"
                  //   onClick={() => handleClickCreate()}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <MyIcon
                      src="/assets/icons/ic-plus.svg"
                      width={20}
                      height={20}
                    />
                    Create New Work Order
                  </div>
                </Button>
              </div>
            </div>
          }
        />

        {/* <div className="w-[2000px]"> */}
        <Table
          columns={columns}
          data={dummyData}
          rowKey="id"
          //   onSelectionChange={handleSelectionChange}
          //   pagination={userListData?.pagination}
          //   setPagination={setPagination}
          isLoading={false}
          minWidth="w-[1500px]"
        />
        {/* </div> */}
      </div>

      <div className="px-3 border-t absolute bottom-0 left-0 w-full bg-white  py-4">
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          isLoading={false}
        />
      </div>
    </>
  );
};

export default WorkOrder;
