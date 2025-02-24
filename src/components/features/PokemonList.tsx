"use client";
import { usePokemonList } from "@/hooks/usePokemon";
import Link from "next/link";
import Table from "../common/Table";
import { Pokemon } from "@/types/api/pokemon";
import { useUserList } from "@/hooks/useUsers";

// interface Data {
//   id: number;
//   name: string;
//   age: number;
//   status: "Active" | "Inactive";
// }

// const dataUser: Data[] = [
//   { id: 1, name: "John Doe", age: 28, status: "Active" },
//   { id: 2, name: "Jane Smith", age: 34, status: "Inactive" },
//   { id: 3, name: "Sam Green", age: 45, status: "Active" },
// ];

export const PokemonList = () => {
  const {
    data,
    isLoading,
    error,
  }: { data: any; isLoading: boolean; error: any } = usePokemonList();

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  }: { data: any; isLoading: boolean; error: any } = useUserList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columns: any = [
    {
      key: "url",
      label: "ID",
      sortable: true,
      render: (value: any) => <span>{value}</span>,
    },
    { key: "name", label: "Name", sortable: true },
    {
      key: "action",
      label: "Action",
      sortable: true,
      sticky: "right",
      render: (_: any, row: Pokemon, idx: any) => (
        <Link
          href={`/pokemon/${row.name}`}
          className={`px-2 py-1 text-sm rounded-full bg-green-100 text-green-800"`}
        >
          Detail
        </Link>
      ),
    },
  ];

  return (
    <div className="">
      <h1>Pokemon List</h1>
      {/* <ul>
        {data?.results.map((pokemon) => (
          <li key={pokemon.name}>
            <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul> */}
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      < div className="h-[500px] w-[400px]" >
        <Table
          data={data?.results}
          columns={columns}
          defaultSort={{ key: "name", direction: "asc" }}
        />
      </div >
    </div >
  );
};
