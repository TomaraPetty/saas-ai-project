import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();

  console.log('error:', error, isLoading, user);
  return (
    <div>
      <h1>This is the homepage</h1>
      <div>
        <Link href='/api/auth/login'>Login</Link>
      </div>
    </div>
  );
}
