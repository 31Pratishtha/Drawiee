import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes: string[] = ['/', '/room']
const publicRoutes: string[] = ['/signin', '/signup']

export default function proxy(req: NextRequest, res: NextResponse) {
	const { pathname } = req.nextUrl

	const token = req.cookies.get('auth_token')?.value

	if (!token && protectedRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL('/signin', req.nextUrl))
	}

  if(token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}
