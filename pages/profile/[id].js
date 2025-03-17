import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Switch } from '@headlessui/react';

export default function Page({ users, nlwData }) {
   const [user, setUser] = useState({});
   const [profile, setProfile] = useState({});
   const [isPlatformer, setIsPlatformer] = useState(false);
   const [level, setLevel] = useState({});
   const sortOrder = [
      'Catastrophic',
      'Terrifying',
      'Relentless',
      'Remorseless',
      'Extreme',
      'Insane',
      'Very Hard',
      'Hard',
      'Medium',
      'Easy',
      'Beginner',
      'Fuck'
   ];
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
      'Fuck': 'bg-fuck',
   };
   const textColours = {
      'Beginner ': 'text-beginner',
      'Easy ': 'text-easy',
      'Medium ': 'text-medium',
      'Hard ': 'text-hard',
      'Very Hard ': 'text-veryhard',
      'Insane ': 'text-insane',
      'Extreme ': 'text-extreme',
      'Remorseless ': 'text-remorseless',
      'Relentless ': 'text-relentless',
      'Terrifying ': 'text-terrifying',
      'Catastrophic ': 'text-catastrophic',
      'Fuck': 'text-white',
      'Beginner Tier': 'text-beginner',
      'Easy Tier': 'text-easy',
      'Medium Tier': 'text-medium',
      'Hard Tier': 'text-hard',
      'Very Hard Tier': 'text-veryhard',
      'Insane Tier': 'text-insane',
      'Extreme Tier': 'text-extreme',
      'Remorseless Tier': 'text-remorseless',
      'Relentless Tier': 'text-relentless',
      'Terrifying Tier': 'text-terrifying',
      'Catastrophic Tier': 'text-catastrophic',
      'Fuck Tier': 'text-white',
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
      'Fuck': 'bg-fuck',
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
      'Fuck': 'bg-fuck',
   };

   const router = useRouter();

   useEffect(() => {
      async function getUsers() {
         let notfound = true;

         users?.map((user) => {
            if (user.full_name === router.query.id) {
               let dlevels = [];
               let plevels = [];
               let tiers = [];
               let ptiers = [];

               user.completions?.map((level) => {
                  if (user.completions.includes(level) && level.status === 'approved' && !level.platformer) {
                     if (!tiers.find(({ name }) => name === level.tier)) {
                        tiers.push({ 'name': level.tier, 'count': 1 });
                     } else {
                        tiers.find(({ name }) => name === level.tier).count+= 1;
                     }
                     dlevels.push(level);
                  }
                  if (user.completions.includes(level) && level.status === 'approved' && level.platformer){
                     if (!ptiers.includes(({ name }) => name === level.tier)) {
                        ptiers.push({ 'name': level.tier, 'count': 1 });
                     } else {
                        ptiers.find(({ name }) => name === level.tier).count+= 1;
                     }
                     console.log(level);
                     plevels.push(level);
                  }
               });
               let temp = user;
               temp.dcompletions = dlevels;
               temp.pcompletions = plevels;
               temp.ptiers = ptiers;
               temp.tiers = tiers;
               temp.tiers.sort((a, b) => sortOrder.indexOf(a.name.trim()) - sortOrder.indexOf(b.name.trim()));
               temp.ptiers.sort((a, b) => sortOrder.indexOf(a.name.trim()) - sortOrder.indexOf(b.name.trim()));
         
               setProfile(temp);
               setUser(user);
               notfound = false;
            }
         });
   
         if (notfound) {
            setUser({ notfound: true });
         }
      }

      getUsers();
   }, [users, nlwData, router.query.id]);

   return (
      <div className='flex min-h-screen min-w-screen overflow-y-hidden snap-x snap-mandatory justify-center items-stretch backdrop-blur-sm'>
         {user?.full_name ? (
            <>
               <div className='flex flex-col px-4 py-4 w-screen items-start justify-stretch flex-shrink-0 snap-center md:w-1/5 overflow-y-scroll max-h-screen gap-4'>
                  <p className='text-2xl font-inter'>Completions</p>
                  <div className='flex flex-col items-center justify-center'>
                     <p className='font-inter'>{isPlatformer ? 'Platformer Levels' : 'Regular Levels'}</p>
                     <Switch
                        checked={isPlatformer}
                        onChange={setIsPlatformer}
                        className={`${isPlatformer ? 'bg-indigo-700' : 'bg-indigo-500'}
                           relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                        >
                        <span className="sr-only">Use setting</span>
                        <span
                           aria-hidden="true"
                           className={`${isPlatformer ? 'translate-x-9' : 'translate-x-0'}
                              pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                     </Switch>
                  </div>
                  <div className='flex flex-col gap-2'>
                     {isPlatformer ? (
                        <>
                        <div className='flex flex-col gap-2'>
                           {user.ptiers?.map((tier, key) => (
                              <div key={key}>
                                 <p className='font-inter text-lg'>{tier.name} Tier</p>
                                 {user.pcompletions?.map((level, index) => (
                                    <div className='flex flex-col gap-2' key={index}>
                                       {level.tier === tier.name ? (
                                          <button onClick={() => setLevel(level)} key={index} className={`text-lg m-0.5 text-start font-inter ${colours[tier.name + 'Tier']} ${hover[tier.name + 'Tier']} ${active[tier.name + 'Tier']} text-black duration-200 transition-colors rounded-lg w-fit px-4 py-2`}>{level.name}</button>
                                       ) : (
                                          <></>
                                       )}
                                    </div>
                                 ))}
                              </div>
                           ))}
                        </div>
                        </>
                     ) : (
                        <div className='flex flex-col gap-2'>
                           {user.tiers?.map((tier, key) => (
                              <div key={key}>
                                 <p className='font-inter text-lg'>{tier.name} Tier</p>
                                 {user.dcompletions?.map((level, index) => (
                                    <div className='flex flex-col gap-2' key={index}>
                                       {level.tier === tier.name ? (
                                          <button onClick={() => setLevel(level)} key={index} className={`text-lg m-0.5 text-start font-inter ${colours[tier.name + 'Tier']} ${hover[tier.name + 'Tier']} ${active[tier.name + 'Tier']} text-black duration-200 transition-colors rounded-lg w-fit px-4 py-2`}>{level.name}</button>
                                       ) : (
                                          <></>
                                       )}
                                    </div>
                                 ))}
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
               <div className='flex flex-col w-screen items-center justify-center flex-shrink-0 snap-center gap-10 pt-10 sm:pt-0 md:w-4/5'>
                  <div className='flex flex-col items-center gap-4'>
                     <div className='flex gap-4 items-center justify-center'>
                        <img className='rounded-full' src={profile.avatar_url} width={100} height={100} alt='user pfp' />
                        <p className='font-inter text-4xl'>{profile.full_name}</p>
                     </div>
                     <div className='flex flex-col items-center gap-2'>
                        <p className='text-xl font-inter'>NLW Demons Completed: <span className='text-green-500'>{user?.dcompletions?.length + user?.pcompletions?.length}</span></p>
                        <div className='flex flex-wrap items-center justify-center gap-3'>
                           {isPlatformer ? (
                              <>
                                 {user?.ptiers?.map((tier, key) => (
                                    <p key={key} className={`${colours[tier.name + 'Tier']} text-black px-4 py-2 rounded-2xl font-inter text-center`}><span className='font-inter text-black'>{tier.count}</span> {tier.name}</p>
                                 ))}
                              </>
                           ) : (
                              <>
                                 {user?.tiers?.map((tier, key) => (
                                    <p key={key} className={`${colours[tier.name + 'Tier']} text-black px-4 py-2 rounded-2xl font-inter text-center`}><span className='font-inter text-black'>{tier.count}</span> {tier.name}</p>
                                 ))}
                              </>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className='flex flex-col items-center justify-center w-full'>
                     {Object.keys(level).length > 0 ? (
                        <div className='flex flex-col relative items-center justify-center gap-4 w-full'>
                           <p className={`text-4xl ${textColours[level.tier + ['Tier']]} font-inter`}>{level?.name}</p>
                           {level?.name !== 'None Yet!' ? (
                              <>
                              <p className='text-lg font-medium text-center underline underline-offset-2 text-indigo-200'><span className='text-xl font-inter text-white'>Creators:</span> {level?.creators}</p>
                              <div className='flex flex-col gap-1 items-center'>
                                 <p className='text-xl font-inter text-white'>Skillsets:</p>
                                 <p className='text-lg font-medium text-center underline underline-offset-2 text-indigo-200'>{level?.skillsets}</p>
                              </div>
                              <a href={level.video} target='_blank' noreferrer='true'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute top-7 right-1/3 size-6 text-white hover:text-blue-300 active:text-blue-200 duration-200 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                              </svg></a>
                              <div className='grid grid-cols-4 justify-stretch w-1/2 px-10'>
                                 <p className='text-xl font-inter text-center'>Personal Rating:</p>
                                 <p className='text-xl font-inter text-center'>Enjoyment:</p>
                                 <p className='text-xl font-inter text-center'>Attempts:</p>
                                 <p className='text-xl font-inter text-center'>Worst Fail:</p>
                              </div>
                              <div className='grid grid-cols-4 justify-stretch w-1/2 px-10'>
                                 <p className={`text-xl font-medium text-center ${textColours[level?.personalRate]}`}>{level?.personalRate}</p>
                                 <p className='text-xl font-medium text-center text-indigo-200'>{level?.personalEnj}</p>
                                 <p className='text-xl font-medium text-center text-indigo-200'>{level?.attempts}</p>
                                 <p className='text-xl font-medium text-center text-red-500'>{level?.worstFail}%</p>
                              </div>
                              {level?.opinion !== '' ? (
                                 <>
                                    <p className='text-xl font-inter border-t-2 pt-2 w-1/2 text-center border-indigo-500'>Opinon:</p>
                                    <p className='text-center text-lg px-4 font-medium text-indigo-200'>{level?.opinion}</p>
                                 </>
                              ) : (
                                 <></>
                              )}
                              </>
                           ) : (
                              <></>
                           )}
                        </div>
                     ) : (
                        <></>
                     )}
                  </div>
               </div>
            </>
         ) : (
            <div className='min-h min-w-screen'>
               <p className='font-semibold text-center text-2xl'>you are not logged in</p>
            </div>
         )}
      </div>
   )
}