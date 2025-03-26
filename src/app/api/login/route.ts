import { getJwtSecretKey } from '@/lib/auth';
import { SignJWT } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const secretKey = getJwtSecretKey();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_SECRET_PASSWORD) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  try {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(secretKey)

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    )
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Token generation failed' },
      { status: 500 }
    )
  }
}