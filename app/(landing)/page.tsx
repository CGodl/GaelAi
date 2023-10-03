import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
	return (
		<>
			<div>Welcome to Landing Page! (Unprotected)</div>
			<div>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
				
				
			</div>
		</>
	);
}
