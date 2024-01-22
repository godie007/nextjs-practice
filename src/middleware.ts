import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isAuth = request.cookies.has('token')
    // se filtra el path solo de navegacion 
    let path = request.nextUrl.pathname
    // si es un archivo o un direcorio no path next
    if (path.includes('.')) {
        return NextResponse.next()
    }
    // si esta autenticado redirecciona a sitios privados pero si ya esta en un sitio privado no hace nada
    if (isAuth && !path.startsWith('/home')) {
        return NextResponse.rewrite(new URL('/home', request.url))
    }
    // si no esta autenticado redirecciona a sitios publicos pero si ya esta en un sitio publico no hace nada
    if (!isAuth && path.startsWith('/home')) {
        return NextResponse.rewrite(new URL('/', request.url))
    }

    // return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    // const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password']; son publicas
    matcher: ['/home/:path*'],
}