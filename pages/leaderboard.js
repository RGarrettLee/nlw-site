import { useState, useEffect } from 'react';
import Completions from '../components/completions';
import Colours from '../util/colours';

export default function Leaderboard({ users }) {
   const [ranked, setRanked] = useState([]);
   const [sortedTiers, setSortedTiers] = useState([]);
   const [user, setUser] = useState({});
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
         let levels = [];
         let tiers = [];

         user.completions.map((level) => {
            if (user.completions.find(({ creators }) => creators === level.creators)?.status === 'approved' && user.completions.find(({ name }) => name === level.name)) {
               if (!tiers.find(({ name }) => name === level.tier)) {
                  tiers.push({ 'name': level.tier, 'count': 1 });
               } else {
                  tiers.find(({ name }) => name === level.tier).count+= 1;
               }
               levels.push(level);
            }
         });
         let temp = user;
         temp.completions = levels;
         temp.tiers = tiers;
         temp.tiers.sort((a, b) => b.count - a.count);
         setSortedTiers([...temp.tiers.sort((a, b) => sortOrder.indexOf(a.name.trim()) - sortOrder.indexOf(b.name.trim()))]);
         userList.push(temp);
      });

      userList.sort((a, b) => b.completions.length - a.completions.length);

      setRanked([...userList]);
      setUser(userList[0]);
   }, [users, Colours]);

   return (
      <div className='flex min-h-screen min-w-screen overflow-y-hidden snap-x snap-mandatory justify-center items-stretch backdrop-blur-sm'>
         <div className='flex flex-col px-4 pt-4 w-screen justify-stretch flex-shrink-0 snap-center md:w-1/4 overflow-y-scroll max-h-screen gap-2'>
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
         <div className='flex flex-col w-screen items-center justify-center flex-shrink-0 snap-center md:w-3/4'>
            {user?.full_name ? (
               <div className='flex flex-col items-center justify-center gap-10'>
                  <div className='flex flex-col items-center justify-center gap-5'>
                     <div className='flex gap-5 items-center justify-center'>
                        <img src={user.avatar_url} className='rounded-full' height={100} width={100} alt='user pfp' />
                        <p className='font-inter text-4xl'>{user.full_name}</p>
                     </div>
                     <div className='flex flex-wrap items-center justify-items-center gap-3'>
                           {sortedTiers.map((tier, key) => (
                              <p key={key} className={`${colours[tier.name + 'Tier']} text-black px-4 py-2 font-inter text-center`}><span className='font-inter text-black'>{tier.count}</span> {tier.name}</p>
                           ))}
                     </div>
                  </div>
                  <Completions completions={user.completions} />
               </div>
            ) : (
               <p className='font-inter text-3xl'>Loading leaderboard...</p>
            )}
         </div>
      </div>
   )
}