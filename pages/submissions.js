import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import supabase from '../db/connection';

export default function Submissions() {
   const [users, setUsers] = useState()
   const router = useRouter();

   useEffect(() => {
      async function getUsers() {
         await supabase.from('profiles').select('full_name, avatar_url, completions, gd_username')
         .then((result) => {
             setUsers([...result.data]);
         })
       }

       getUsers();
   }, [])

   async function approveSubmission(user, key) {
      let completions = user.completions;
      completions[key].status = 'approved';

      await supabase.from('profiles').update({ completions: completions }).eq('full_name', user.full_name);
      window.alert(`You have approved the completion of ${completions[key].name} by ${completions[key].creators} performed by ${user.full_name}`)
      router.reload();
   }

   async function denySubmission(user, key) {
      let completions = user.completions;

      window.alert(`You have denied the completion of ${completions[key].name} by ${completions[key].creators} performed by ${user.full_name}`);

      if (completions.length > 1) {
         completions.splice(key, 1);
      } else {
         completions.shift();
      }

      await supabase.from('profiles').update({ completions: completions }).eq('full_name', user.full_name);
      router.reload();
   }


   return (
      <>
         <div className='grid grid-cols-2 grid-rows-subgrid min-w-screen min-h-screen'>
            <div className='flex flex-col items-center justify-center bg-white/5 m-4 rounded-lg gap-2'>
               <h2 className='font-inter text-xl underline underline-offset-2'>Level Submissions</h2>
               <div className='flex flex-col items-center justify-center gap-4'>
                  {users?.map((user) => (
                     <>
                        {user?.completions?.map((completion, key) => (
                           <div key={key} className='flex flex-col items-center justify-center'>
                              {completion.status === 'pending' ? (
                                 <div className='flex flex-col items-center justify-center gap-2 bg-indigo-700/75 p-4 rounded-lg'>
                                    <div className='flex items-center min-w-2xl max-w-2xl justify-center gap-4'>
                                       <div className='flex flex-col items-center justify-center'>
                                          <p className='font-inter text-lg'>{completion.name} by {completion.creators}</p>
                                          <p className='font-inter text-md underline underline-offset-2'>{completion.tier} Tier</p>
                                          <p className='font-thin'>Attempts: {completion.attempts}</p>
                                          <p className='font-thin'>Enj Rating: {completion.personalEnj}</p>
                                          <p className='font-thin'>Personal Rating: {completion.personalRate}</p>
                                          {completion.opinion.length > 0 ? (
                                             <>
                                                <p className='font-thin text-wrap break-all'>Opinion: {completion.opinion}</p>
                                                <p className='font-medium text-lg'>Submitted by: {user.full_name}</p>
                                             </>
                                          ) : (
                                             <></>
                                          )}
                                       </div>
                                       <iframe width='300' height='169' className='block mx-auto border-none' src={completion.embed} allow='autoplay' allowFullScreen></iframe>
                                    </div>
                                    <div className='flex items-center justify-center gap-4'>
                                       <button onClick={() => approveSubmission(user, key)} className='px-4 py-2 bg-green-700 hover:bg-green-600 active:bg-green-500 duration-200 transition-colors rounded-lg'>Approve</button>
                                       <button onClick={() => denySubmission(user, key)} className='px-4 py-2 bg-red-700 hover:bg-red-600 active:bg-red-500 duration-200 transition-colors rounded-lg'>Deny</button>
                                       <a href={completion.video} target='_blank' noreferrer='true' className='px-4 py-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-300 duration-200 transition-colors rounded-lg'>Video</a>
                                    </div>
                                 </div>
                              ) : (
                                 <></>
                              )}
                           </div>
                        ))}
                     </>
                  ))}
               </div>
            </div>
            <div className='flex flex-col items-center justify-center bg-white/5 m-4 rounded-lg'>
               <h2 className='font-inter text-xl underline underline-offset-2'>Username Submissions</h2>
            </div>
         </div>
      </>
   )
}