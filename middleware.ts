import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';


// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

export default authMiddleware({
	publicRoutes: ['/', "/api/webhook"],
	afterAuth(auth, req, evt) {

        //redirect logged in users away from the landing page
		if (auth.userId && auth.isPublicRoute) {
            const redirectToDash = new URL('/dashboard', req.url)
            return NextResponse.redirect(redirectToDash)
        }

			
	},
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
