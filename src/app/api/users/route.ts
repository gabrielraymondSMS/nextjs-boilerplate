import { NextRequest, NextResponse } from 'next/server'
import { users } from './data'



export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const start = (page - 1) * limit
    const end = start + limit

    const paginated = users.slice(start, end)

    return NextResponse.json({
        data: {
            data: paginated,
            pagination: {
                page,
                limit,
                total: users.length,
                totalPages: Math.ceil(users.length / limit),
            }
        }
    })
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        role: body.role || 'user',
        name: body.name || '',
        email: body.email || '',
        phone: body.phone || '',
        image: body.image || '',
        status: body.status ?? true,
        email_verified: false,
        createdDate: new Date().toISOString(),
    }

    users.push(newUser)

    return NextResponse.json(
        {
            "success": true,
            "message": "POST /users successful",
            "data": newUser,
            "statusCode": 201
        })
}
