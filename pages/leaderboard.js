import { useState, useEffect } from 'react';
import ViewCompletions from '../components/viewCompletions';

export default function Leaderboard({ users }) {
   const [ranked, setRanked] = useState([]);
   const [tier, setTier] = useState({});
   const [completions, setCompletions] = useState([]);
   const [viewCompletions, setViewCompletions] = useState(false);

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
         userList.push(temp);
      });

      userList.sort((a, b) => b.completions.length - a.completions.length);

      setRanked([...userList]);
   }, [users]);

   function openCompletion(tier, user) {
      let levels = [];

      user.completions.map((level) => {
         if (tier.name.toLowerCase().trim() === level.tier.toLowerCase().trim()) {
            if (user.completions.find(({ creators }) => creators === level.creators)?.status === 'approved' && user.completions.find(({ name }) => name === level.name)) {
               levels.push(level);
            }
         }
      });

      setCompletions([...levels]);
      setTier(tier);
      setViewCompletions(true);
   }

   return (
      <div className='flex flex-col items-center justify-center min-w-screen min-h-screen gap-3'>
         <div className='flex flex-col items-center justify-center gap-2 w-1/2 backdrop-blur-sm p-10'>
            <h2 className='font-inter text-3xl underline-offset-2 underline'>Leaderboard</h2>
            {ranked.map((user, key) => (
               <div key={key} className='grid grid-cols-2 gap-2 items-center justify-center'>
                  <a href={`/profile/${user.full_name}`} className='hover:bg-white/5 rounded-lg transition-colors duration-200 px-3 py-2'>
                     <div className='flex flex-col items-center justify-center min-w-64'>
                        <div className='flex gap-2 items-center justify-center'>
                           <p className={`${key === 0 ? 'text-yellow-400' : 'text-slate-400'} font-inter text-2xl`}>#{key+1}</p>
                           <img src={user.avatar_url} className='rounded-full' height={50} width={50} alt='user pfp' />
                           <p className='text-xl font-inter'>{user.full_name}</p>
                        </div>
                        <p className='text-lg font-medium underline-offset-2 underline'><span className='text-green-500 font-inter'>{user.completions.length}</span> demons completed</p>
                     </div>
                  </a>
                  <div className='flex flex-col items-center justify-center'>
                     <p className='text-lg font-inter'>Tiers:</p>
                     <div className='grid grid-cols-3 grid-rows-subgrid justify-items-center gap-2'>
                        {user.tiers.map((tier, key) => (
                           <button key={key} onClick={() => openCompletion(tier, user)} className='bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 duration-200 transition-colors rounded-lg px-4 py-2 font-medium text-center'><span className='text-green-400'>{tier.count}</span> {tier.name}</button>
                        ))}
                     </div>
                     <ViewCompletions completions={completions} tier={tier} toggle={viewCompletions} setToggle={setViewCompletions} />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}