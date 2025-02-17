import { useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../db/connection';

export default function Logout() {
   const router = useRouter();

   useEffect(() => {
      async function signOut() {
         const { error } = await supabase.auth.signOut();
         router.reload(window.location.pathname);
      };

      signOut();
   }, []);

   return (
      <div className='flex flex-col items-center justify-center min-h-screen min-w-screen'>
         <h2 className='text-center text-2xl font-inter'>logging out...</h2>
      </div>
   )
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}