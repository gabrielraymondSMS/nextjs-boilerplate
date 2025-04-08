'use client'
import { useUserList } from "@/hooks/queries/placeholder/useUsers";
import Table from "../common/table/Table";
import { useCreatePost } from "@/hooks/mutation/placeholder/useCreatePost";

const columns: any = [
    {
        key: "name",
        label: "Name",
        sortable: true,
        sticky: "left",
        // render: (value: any) => <span>{value}</span>,
    },
    {
        key: "email",
        label: "Email",
        sortable: true,
        // render: (value: any) => <span>{value}</span>,
    },
    {
        key: "phone",
        label: "Phone",
        sortable: true,
        // render: (value: any) => <span>{value}</span>,
    },
    {
        key: "username",
        label: "Username",
        sortable: true,
        // render: (value: any) => <span>{value}</span>,
    },
];

const PostList = () => {
    const {
        data: userData,
        isLoading: isUserLoading,
        error: userError,
    }: { data: any; isLoading: boolean; error: any } = useUserList();

    const { mutate, isPending } = useCreatePost();
    // const [name, setName] = useState("");

    const handleAddPokemon = () => {
        mutate({
            title: 'foo',
            body: 'bar',
            userId: 1,
        });
    };

    if (isUserLoading) return <div>Loading...</div>;
    if (userError) return <div>Error: {userError.message}</div>;


    return (
        <div>

            <h1 className="text-2xl font-bold mb-4">User Table</h1>
            <div className="h-[calc(75dvh-160px)] w-[400px]" >
                <Table
                    data={userData}
                    columns={columns}
                    defaultSort={{ key: "name", direction: "asc" }}
                />
            </div >

            {/* <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New Pokemon"
            /> */}
            <button onClick={handleAddPokemon} disabled={isPending}>
                {isPending ? "Adding..." : "Add Pokemon"}
            </button>
        </div>
    )
}

export default PostList