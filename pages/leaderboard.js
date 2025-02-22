import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { Autocomplete, TextField } from '@mui/material';
import Completions from '../components/completions';

export default function Leaderboard({ users }) {
   const [ranked, setRanked] = useState([]);
   const [user, setUser] = useState({});
   const [isPlatformer, setIsPlatformer] = useState(false);
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

   useEffect(() => {
      let userList = [];

      users.map((user) => {
         let dlevels = [];
         let plevels = [];
         let tiers = [];
         let ptiers = [];
         
         user.completions.map((level) => {
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
         userList.push(temp);
      });

      userList.sort((a, b) => b.dcompletions.length - a.dcompletions.length);

      setRanked([...userList]);
      setUser(userList[0]);
   }, [users]);

   function getUser(e) {
      let username = '';

      e.target.innerText === '' ? username = e.target.parentNode.innerText : username = e.target.innerText;

      setUser(ranked.find(({ full_name }) => full_name === username));
   }

   function reloadLeaderboard() {
      setIsPlatformer(!isPlatformer);
      if (isPlatformer) {
         setRanked([...ranked.sort((a, b) => b.dcompletions.length - a.dcompletions.length)]);
         setUser(ranked.sort((a, b) => b.dcompletions.length - a.dcompletions.length)[0]);
      } else if (!isPlatformer) {
         setRanked([...ranked.sort((a, b) => b.pcompletions.length - a.pcompletions.length)]);
         setUser(ranked.sort((a, b) => b.pcompletions.length - a.pcompletions.length)[0]);
      }
   }

   return (
      <div className='flex min-h-screen min-w-screen overflow-y-hidden snap-x snap-mandatory justify-center items-stretch backdrop-blur-sm'>
         <div className='flex flex-col px-4 pt-4 w-screen items-center justify-stretch flex-shrink-0 snap-center md:w-1/4 overflow-y-scroll max-h-screen gap-2'>
            <div className='flex items-center gap-4'>
               <div className='flex flex-col items-center justify-center'>
                  <p className='font-inter text-xs md:text-base'>{isPlatformer ? 'Platformer Levels' : 'Regular Levels'}</p>
                  <Switch
                     checked={isPlatformer}
                     onChange={reloadLeaderboard}
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
               <Autocomplete
                  disablePortal
                  options={ranked}
                  renderOption={(props, option) => (
                     <li {...props}>
                        <div className='flex gap-2 items-center justify-center'>
                           <img src={option.avatar_url} className='rounded-full' height={50} width={50} alt='user pfp' />
                           <p className='font-inter text-black'>{option.full_name}</p>
                        </div>
                     </li>
                  )}
                  autoSelect
                  sx={{ width: {xs: 250, sm: 175, md: 180, lg: 250} , bgcolor: 'gray' }}
                  getOptionLabel={(option) => option.full_name}
                  onChange={(event) => getUser(event)}
                  renderInput={(params) => <TextField {...params} label='Search user' variant='filled' />}
               />
            </div>
            <div className='flex flex-col pb-10 sm:pb-0 items-center justify-center gap-2'>
               {ranked.map((u, key) => (
                  <button key={key} onClick={() => setUser(u)} className={`flex gap-2 items-center justify-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 ${u === user ? 'bg-purple-900' : ''} rounded-lg transition-colors duration-200 px-3 py-2`}>
                        <div className='flex flex-col items-center justify-center min-w-64'>
                           <div className='flex gap-2 items-center justify-center'>
                              <p className={`${key === 0 ? 'text-yellow-400' : 'text-slate-400'} font-inter text-2xl`}>#{key+1}</p>
                              <img src={u.avatar_url} className='rounded-full' height={50} width={50} alt='user pfp' />
                              <p className='text-xl font-inter'>{u.full_name}</p>
                           </div>
                        </div>
                  </button>
               ))}
            </div>
         </div>
         <div className='flex flex-col w-screen items-center justify-center flex-shrink-0 snap-center pt-10 sm:pt-0 md:w-3/4'>
            {user?.full_name ? (
               <div className='flex flex-col items-center justify-center gap-10'>
                  <div className='flex flex-col items-center justify-center gap-5'>
                     <a href={`/profile/${user.full_name}`} className='flex gap-5 items-center justify-center px-4 py-2 hover:bg-white/5 duration-200 transition-colours'>
                        <img src={user.avatar_url} className='rounded-full' height={100} width={100} alt='user pfp' />
                        <p className='font-inter text-4xl'>{user.full_name}</p>
                     </a>
                     <div className='flex flex-wrap items-center justify-center gap-3'>
                        {isPlatformer ? (
                           <>
                              {user.ptiers.map((tier, key) => (
                                 <p key={key} className={`${colours[tier.name + 'Tier']} text-black px-4 py-2 font-inter text-center`}><span className='font-inter text-black'>{tier.count}</span> {tier.name}</p>
                              ))}
                           </>
                        ) : (
                           <>
                              {user.tiers.map((tier, key) => (
                                 <p key={key} className={`${colours[tier.name + 'Tier']} text-black px-4 py-2 font-inter text-center`}><span className='font-inter text-black'>{tier.count}</span> {tier.name}</p>
                              ))}
                           </>
                        )}
                     </div>
                  </div>
                  {isPlatformer ? (
                     <Completions completions={user.pcompletions} />
                  ) : (
                     <Completions completions={user.dcompletions} />
                  )}
                  
               </div>
            ) : (
               <p className='font-inter text-3xl'>Loading leaderboard...</p>
            )}
         </div>
      </div>
   )
}