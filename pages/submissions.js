import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import supabase from '../db/connection';

export default function Submissions({ globalSetUser }) {
   const [users, setUsers] = useState();
   const [user, setUser] = useState({});
   const [level, setLevel] = useState({});
   const [pos, setPos] = useState(0);
   const router = useRouter();
   const colours = {
      'Beginner Tier': 'bg-beginner',
      'Easy Tier': 'bg-easy',
      'Medium Tier': 'bg-medium',
      'Hard Tier': 'bg-hard',
      'Very Hard Tier': 'bg-veryhard',
      'Insane Tier': 'bg-insane',
      'Extreme Tier': 'bg-extreme',
      'Remorseless Tier': 'bg-remorseless',
      'Relentless Tier': 'bg-relentless',
      'Terrifying Tier': 'bg-terrifying',
      'Catastrophic Tier': 'bg-catastrophic',
      'Inexorable Tier': 'bg-inexorable',
      'Excruciating Tier': 'bg-excruciating',
      'Merciless Tier': 'bg-merciless',
      'Monstrous Tier': 'bg-monstrous',
      'Apocalyptic Tier': 'bg-apocalyptic',
      'Demonic Tier': 'bg-demonic',
      'Menacing Tier': 'bg-menacing',
      'Unreal Tier': 'bg-unreal',
      'Nightmare Tier': 'bg-nightmare',
      'FuckTier': 'bg-white',
   };

   const hover = {
      'Beginner Tier': 'hover:bg-beginner/80',
      'Easy Tier': 'hover:bg-easy/80',
      'Medium Tier': 'hover:bg-medium/80',
      'Hard Tier': 'hover:bg-hard/80',
      'Very Hard Tier': 'hover:bg-veryhard/80',
      'Insane Tier': 'hover:bg-insane/80',
      'Extreme Tier': 'hover:bg-extreme/80',
      'Remorseless Tier': 'hover:bg-remorseless/80',
      'Relentless Tier': 'hover:bg-relentless/80',
      'Terrifying Tier': 'hover:bg-terrifying/80',
      'Catastrophic Tier': 'hover:bg-catastrophic/80',
      'Inexorable Tier': 'hover:bg-inexorable/80',
      'Excruciating Tier': 'hover:bg-excruciating/80',
      'Merciless Tier': 'hover:bg-merciless/80',
      'Monstrous Tier': 'hover:bg-monstrous/80',
      'Apocalyptic Tier': 'hover:bg-apocalyptic/80',
      'Demonic Tier': 'hover:bg-demonic/80',
      'Menacing Tier': 'hover:bg-menacing/80',
      'Unreal Tier': 'hover:bg-unreal/80',
      'Nightmare Tier': 'hover:bg-nightmare/80',
      'FuckTier': 'hover:bg-white/75',
   };

   const active = {
      'Beginner Tier': 'active:bg-beginner/60',
      'Easy Tier': 'active:bg-easy/60',
      'Medium Tier': 'active:bg-medium/60',
      'Hard Tier': 'active:bg-hard/60',
      'Very Hard Tier': 'active:bg-veryhard/60',
      'Insane Tier': 'active:bg-insane/60',
      'Extreme Tier': 'active:bg-extreme/60',
      'Remorseless Tier': 'active:bg-remorseless/60',
      'Relentless Tier': 'active:bg-relentless/60',
      'Terrifying Tier': 'active:bg-terrifying/60',
      'Catastrophic Tier': 'active:bg-catastrophic/60',
      'Inexorable Tier': 'active:bg-inexorable/60',
      'Excruciating Tier': 'active:bg-excruciating/60',
      'Merciless Tier': 'active:bg-merciless/60',
      'Monstrous Tier': 'active:bg-monstrous/60',
      'Apocalyptic Tier': 'active:bg-apocalyptic/60',
      'Demonic Tier': 'active:bg-demonic/60',
      'Menacing Tier': 'active:bg-menacing/60',
      'Unreal Tier': 'active:bg-unreal/60',
      'Nightmare Tier': 'active:bg-nightmare/60',
      'FuckTier': 'active:bg-white/50',
   };

   useEffect(() => {
      async function getUsers() {
         await supabase.from('profiles').select('full_name, avatar_url, completions, gdID, nickname')
         .then((result) => {
            setUsers([...result.data]);
         })
       }

       getUsers();
   }, [users])

   function hasCompletions(user) {
      let result = false;
      user.completions.map((completion) => {
         if (completion.status === 'pending') {
            result = true;
            return false;
         }
      })

      return result
   }

   function setInfo(user, level, key) {
      setLevel(level);
      setUser(user);
      setPos(key);
   }

   async function approveSubmission(user, key) {
      let newUser = user;
      newUser.completions[key].status = 'approved';

      await supabase.from('profiles').update({ completions: newUser.completions }).eq('full_name', user.full_name);
      window.alert(`You have approved the completion of ${newUser.completions[key].name} by ${newUser.completions[key].creators} performed by ${user.full_name}`);
      setUser(newUser);
      //router.reload();
   }

   async function denySubmission(user, key) {
      let newUser = user;

      window.alert(`You have denied the completion of ${newUser.completions[key].name} by ${newUser.completions[key].creators} performed by ${user.full_name}`);

      if (newUser.completions.length > 1) {
         newUser.completions.splice(key, 1);
      } else {
         newUser.completions.shift();
      }

      await supabase.from('profiles').update({ completions: newUser.completions }).eq('full_name', user.full_name);
      setUser(newUser);
      //router.reload();
   }


   return (
      <div className='flex min-h-screen min-w-screen overflow-y-hidden snap-x snap-mandatory justify-center items-stretch backdrop-blur-sm'>
         <div className='flex flex-col px-4 pt-4 w-screen items-start justify-stretch flex-shrink-0 snap-center md:w-1/5 overflow-y-scroll max-h-screen'>
            {users?.map((user, key) => (
               <>
                  {hasCompletions(user) ? (
                     <Disclosure key={key} as='div' className='py-2' defaultOpen={false}>
                     { ({ open }) => (
                        <>
                           <DisclosureButton className={`group flex bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 focus:bg-purple-900 ${open ? 'sticky top-0' : ''} rounded-lg w-fit px-4 py-1 duration-200 transition-colors items-center justify-between gap-4`}>
                              <img src={user.avatar_url} className='rounded-full' height={50} width={50} alt='user pfp' />
                              <p className='font-inter text-xl'>{user.full_name}</p>
                           </DisclosureButton>
                           <DisclosurePanel className='mt-2 text-sm/5 text-white gap-1'>
                              {user.completions?.map((completion, index) => (
                                 <div key={index} className='flex flex-col'>
                                    {completion.status === 'pending' ? (
                                       <div>
                                          <button onClick={() => setInfo(user, completion, index)} className={`${colours[completion.tier + 'Tier']} ${hover[completion.tier + 'Tier']} ${active[completion.tier + 'Tier']} text-black m-0.5 text-start duration-200 transition-colors rounded-lg w-fit px-4 py-2`}>
                                             <p className='font-inter text-lg'>{completion.name}</p>
                                          </button>
                                       </div>
                                    ) : (
                                       <></>
                                    )}
                                 </div>
                              ))}
                           </DisclosurePanel>
                        </>
                     )}
                  </Disclosure>
                  ) : (
                     <></>
                  )}
               </>
            ))}
         </div>
         <div className='flex flex-col w-screen items-center justify-center flex-shrink-0 snap-center gap-10 pt-10 sm:pt-0 md:w-4/5'>
            {level?.name ? (
               <div className='flex flex-col items-center gap-2'>
                  <p className='font-inter text-4xl'>{level.name}</p>
                  <p className='font-inter text-xl'>completed by <span className='text-green-400'>{user.full_name}</span></p>
                  {level.embed !== 'not embeddable' ? (
                     <iframe width='560' height='315' className='block border-none w-[400px] h-[225px] sm:w-[420px] sm:h-[235px] xl:w-[720px] xl:h-[403px]' src={level.embed} allow='autoplay' allowFullScreen></iframe>
                  ) : (
                     <></>
                  )}
                  <table className='table-fixed'>
                     <tbody>
                        <tr className='bg-gray-200 text-black font-inter' align='center'>
                           <td className="border-gray-800 border-2 px-1" width="137" height="40">
                              <strong>Personal Enj</strong>
                           </td>
                           <td className="border-gray-800 border-2 px-1" width="282">
                              <strong>Personal Rate</strong>
                           </td>
                           <td className="border-gray-800 border-2 px-1" width="137" height="40">
                              <strong>Attempts</strong>
                           </td>
                           <td className="border-gray-800 border-2 px-1" width="282">
                              <strong>Worst Fail</strong>
                           </td>
                        </tr>
                        <tr className='font-inter text-center bg-indigo-700'>
                           <td className="">{level.personalEnj}</td>
                           <td className="border-gray-800 border-2 px-1">{level.personalRate}</td>
                           <td className="border-gray-800 border-2 px-1">{level.attempts}</td>
                           <td className="border-gray-800 border-2 px-1">{level.worstFail}%</td>
                        </tr>
                     </tbody>
                  </table>
                  {level?.opinion ? (
                     <div className='flex flex-col items-center w-3/4'>
                        <p className='font-inter text-xl'>Opinion:</p>
                        <p className='font-medium text-lg'>{level.opinion}</p>
                     </div>
                  ) : (
                     <></>
                  )}
                  <div className='flex gap-4'>
                     <button onClick={() => approveSubmission(user, pos)} className='text-black px-4 py-2 bg-green-500 hover:bg-green-400 active:bg-green-300 rounded-lg font-inter duration-200 transition-colors'>Approve</button>
                     <button onClick={() => denySubmission(user, pos)} className='text-black px-4 py-2 bg-red-600 hover:bg-red-500 active:bg-red-400 rounded-lg font-inter duration-200 transition-colors'>Reject</button>
                  </div>
               </div>
            ) : (
               <p className='font-inter text-4xl'>No record has been selected</p>
            )}
         </div>
      </div>
   )
}