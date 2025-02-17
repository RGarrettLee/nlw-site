import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LevelSubmitDialog from '../components/levelSubmitDialog';

export default function Profile({ nlwData, user, users }) {
   const { full_name, avatar_url, completions, gd_username } = user;
   const [levels, setLevels] = useState([]);
   const [usernames, setUsernames] = useState([]);
   const [completionSubmission, setCompletionSubmission] = useState(false);
   const [usernameSubmission, setUsernameSubmission] = useState(false);
   const router = useRouter();

   useEffect(() => {
      let names = [];
      users.map((user) => {
         if (user.gd_username !== null) {
            names.push(user.gd_username);
         }
      })

      async function getLevels() {
         let levels = [];
         let counter = 0;

         nlwData.map((tier) => {
            tier.levels.map((level) => {
               levels.push(Object.assign({}, { 'uid': counter, 'tier': tier.name.replace('Tier', '') }, level));
               counter++;
            })
         });
   
         setLevels([...levels]);
      }

      getLevels();
      setUsernames([...names]);
   }, [nlwData, users])

   function getTierProgress(tier) {
      let progress = 0;

      levels.map((level) => {
         if (tier.name.toLowerCase() === (level.tier + 'Tier').toLowerCase()) {
            if (completions.find(({ uid }) => uid === level.uid)?.status === 'approved') {
               progress++;
            }
            
         }
      })

      return progress;
   }

   function submitCompletion() {
      setCompletionSubmission(true);
   }

   function submitUsername() {
      setUsernameSubmission(true);
   }

   return (
      <>
         {user?.full_name ? (
            <div className='flex flex-col items-center justify-center min-h-screen min-w-screen gap-4'>
               <div className='flex items-center justify-center mb-6 gap-6'>
                  <img className='rounded-full' height={100} width={100} src={avatar_url} alt='user pfp' />
                  {gd_username === null ? (
                     <h2 className='text-3xl font-inter'>{full_name}</h2>
                  ) : (
                     <h2 className='text-3xl font-inter'>{gd_username}</h2>
                  )}
               </div>
               <div className='flex items-center justify-center gap-6 '>
                  {gd_username === null ? (
                     <button className='text-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 duration-200 transition-colors px-4 py-2 rounded-xl font-inter'>Submit GD username</button>
                  ) : (
                     <></>
                  )}
                  <button onClick={() => submitCompletion()} className='text-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 duration-200 transition-colors px-4 py-2 rounded-xl font-inter'>Submit completion</button>
               </div>
               
               <div className='flex flex-col items-center justify-center gap-2'>
                  <p className='text-2xl font-inter'>Completions</p>
                  <div className='grid grid-cols-2 sm:grid-cols-2 sm:grid-rows-subgrid gap-4 backdrop-blur-sm rounded-lg px-4 py-2'>
                     {nlwData.map((tier, index) => (
                        <div className='flex flex-col items-center justify-center gap-2' key={index}>
                           <p className='text-lg text-center font-semibold'>{tier.name}</p>
                           <p className='font-thin'><span className='text-red-600 font-bold'>{getTierProgress(tier)}</span> / <span className='text-green-500 font-bold'>{tier.levels.length}</span></p>
                           <div className='w-32 bg-gray-700 rounded-full'>
                              <div className={`bg-indigo-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full py-0.5`} style={{ width: `${getTierProgress(tier) / tier.levels.length}%`}}>{Math.floor(getTierProgress(tier) / tier.levels.length)}%</div> {/* get percantage of completions */}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <LevelSubmitDialog levels={levels} nlwData={nlwData} user={user} toggle={completionSubmission} setToggle={setCompletionSubmission} />
            </div>
         ) : (
            <div className='min-h-screen min-w-screen'>
               <p className='font-semibold text-center text-2xl'>redirecting to login...</p>
               
            </div>
         )}
      </>
   )
}

// add way to view all completions

//{router.push('/login')}