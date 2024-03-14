'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/mwadmin/AuthContext'; // Adjust the path as needed

export const useAdminAuth = () => {
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        setIsLoading(false);
      } else {
        router.push('/mwadmin/login'); // Adjust the login path as needed
      }
    }
  }, [user, authLoading, router]);

  return { isLoading };
};
