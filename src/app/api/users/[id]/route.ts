import { NextRequest, NextResponse } from "next/server";
import { users } from "../data";

export const dynamic = "force-dynamic";

type Context = {
    params: {
        id: string;
    };
};

export async function GET(req: NextRequest, context: Context) {
    try {
        const { id } = context.params;
        const user = users.find((u) => u.id === Number(id));

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: String(error) },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, context: Context) {
    try {
        const id = Number(context.params.id);
        const index = users.findIndex((u) => u.id === id);
        if (index === -1) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const data = await req.json();
        users[index] = { ...users[index], ...data };

        return NextResponse.json({
            message: "User updated successfully",
            user: users[index],
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: String(error) },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, context: Context) {
    try {
        const id = Number(context.params.id);
        const index = users.findIndex((u) => u.id === id);
        if (index === -1) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const deletedUser = users.splice(index, 1)[0];
        return NextResponse.json({
            message: "User deleted",
            user: deletedUser,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: String(error) },
            { status: 500 }
        );
    }
}
