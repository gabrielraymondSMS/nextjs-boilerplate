import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';
import { users } from '../../users/data';

const SECRET_KEY = 'your_secret_key_here'



export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, password } = body

    // dummy password check, for boilerplate only
    const user = users.find((u) => u.email === email)

    if (!user || password !== 'password') {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    )

    return NextResponse.json({ data: { token: token } })
}