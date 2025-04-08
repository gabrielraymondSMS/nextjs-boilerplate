"use client";
// import { useUserList } from "@/hooks/useUsers";
import { FC } from "react";

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   phone: string;
//   email: string;
//   address: {
//     city: string;
//     zipcode: string;
//   };
// }z

const UserList: FC = () => {
  // const {
  //   data: userListData,
  //   isLoading: isUserListLoading,
  //   error: userError,
  // } = useUserList();

  // const columns: Column<User>[] = [
  //   { key: "name", label: "Name", sortable: true },
  //   { key: "username", label: "Username", sortable: true },
  //   { key: "phone", label: "Phone", sortable: true },
  //   { key: "email", label: "Email", sortable: true },
  //   {
  //     key: "address",
  //     label: "Address",
  //     sortable: false, // Sorting on objects is not practical
  //     render: (value: string | number | { city: string; zipcode: string }) => {
  //       if (
  //         typeof value === "object" &&
  //         value !== null &&
  //         "city" in value &&
  //         "zipcode" in value
  //       ) {
  //         return (
  //           <div>
  //             <p>
  //               <strong>City:</strong> {value.city}
  //             </p>
  //             <p>
  //               <strong>Zipcode:</strong> {value.zipcode}
  //             </p>
  //           </div>
  //         );
  //       }
  //       return "-"; // Handle cases where value might be a string or number
  //     },
  //   },
  // ];

  // if (isUserListLoading) return <p>Loading users...</p>;
  // if (userError) return <p className="text-red-500">Failed to load users.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <div className="h-[500px] w-full">
        {/* <Table
          data={userListData}
          columns={columns}
          defaultSort={{ key: "name", direction: "asc" }}
        /> */}
      </div>
    </div>
  );
};

export default UserList;
