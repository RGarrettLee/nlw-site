import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import ViewCompletions from '../components/viewCompletions';

export default function Profile({ nlwData, user, users }) {
   const { full_name, avatar_url, completions, gd_username } = user;
   const [levels, setLevels] = useState([]);
   const [plevels, setPlevels] = useState([]);
   const [isPlatformer, setIsPlatformer] = useState(false);
   const [usernames, setUsernames] = useState([]);
   const [usernameSubmission, setUsernameSubmission] = useState(false);
   const [viewCompletions, setViewCompletions] = useState(false);
   const [tier, setTier] = useState({});
   const [tieredCompletions, setTieredCompletions] = useState([]);

   useEffect(() => {
      let names = [];
      users.map((user) => {
         if (user.gd_username !== null) {
            names.push(user.gd_username);
         }
      })

      async function getLevels() {
         let levels = [];
         let plevels = [];
         let counter = 0;

         nlwData.demons?.map((tier) => {
            tier.levels.map((level) => {
               levels.push(Object.assign({}, { 'uid': counter, 'tier': tier.name.replace('Tier', '') }, level));
               counter++;
            })
         });

         nlwData.platformers?.map((tier) => {
            tier.levels.map((level) => {
               plevels.push(Object.assign({}, { 'uid': counter, 'tier': tier.name.replace('Tier', '') }, level));
               counter++;
            })
         });
   
         setPlevels([...plevels]);
         setLevels([...levels]);
      }

      getLevels();
      setUsernames([...names]);
   }, [nlwData, users])

   function getTierProgress(tier) {
      let progress = 0;

      if (isPlatformer) {
         plevels.map((level) => {
            if (tier.name.toLowerCase() === (level.tier + 'Tier').toLowerCase()) {
               if (completions.find(({ uid }) => uid === level.uid)?.status === 'approved') {
                  progress++;
               }
               
            }
         })
      } else {
         levels.map((level) => {
            if (tier.name.toLowerCase() === (level.tier + 'Tier').toLowerCase()) {
               if (completions.find(({ uid }) => uid === level.uid)?.status === 'approved') {
                  progress++;
               }
               
            }
         })
      }


      return progress;
   }

   function openCompletion(tier) {
      let levels = [];

      completions.map((level) => {
         if (tier.name.toLowerCase() === (level.tier + 'Tier').toLowerCase()) {
            if (completions.find(({uid}) => uid === level.uid)?.status ==='approved' && completions.find(({name}) => name === level.name) && completions.find(({ platformer }) => platformer === isPlatformer)) {
               levels.push(level);
            }
         }
      })

      setTieredCompletions([...levels]);
      setTier(tier);
      setViewCompletions(true);
   }

   function submitUsername() {
      setUsernameSubmission(true);
   }

   return (
      <>
         {user?.full_name ? (
            <div className='flex flex-col items-center justify-center min-h-screen min-w-screen'>
               <div className='flex items-center justify-center mb-6 gap-6'>
                  <img className='rounded-full' height={100} width={100} src={avatar_url} alt='user pfp' />
                  {gd_username === null ? (
                     <h2 className='text-3xl font-inter'>{full_name}</h2>
                  ) : (
                     <h2 className='text-3xl font-inter'>{gd_username}</h2>
                  )}
               </div>
               <div className='flex items-center justify-center gap-6 '>
                  {/*{gd_username === null ? (
                     <button className='text-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 duration-200 transition-colors px-2 py-1 sm:px-4 sm:py-2 rounded-xl font-inter'>Submit GD username</button>
                  ) : (
                     <></>
                  )}*/}
               </div>
               
               <div className='flex flex-col items-center justify-center gap-2'>
                  <p className='text-2xl font-inter'>Progress</p>
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
                  <div className='grid grid-cols-2 sm:grid-cols-2 sm:grid-rows-subgrid gap-4 backdrop-blur-sm rounded-lg px-4 py-2'>
                     {isPlatformer ? (
                        <>
                           {nlwData.platformers?.map((tier, index) => (
                              <div className='flex flex-col items-center justify-center gap-2' key={index}>
                                 <p className='text-lg text-center font-semibold'>{tier.name}</p>
                                 <button onClick={() => openCompletion(tier)} className='font-thin hover:scale-125 transition-transform duration-100'><span className='text-red-600 font-bold'>{getTierProgress(tier)}</span> / <span className='text-green-500 font-bold'>{tier.levels.length}</span></button>
                                 <div className='w-32 bg-gray-700 rounded-full'>
                                    <div className={`bg-indigo-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full py-0.5`} style={{ width: `${getTierProgress(tier) / tier.levels.length}%`}}>{Math.floor(getTierProgress(tier) / tier.levels.length)}%</div> {/* get percantage of completions */}
                                 </div>
                              </div>
                           ))}
                        </>
                     ) : (
                        <>
                           {nlwData.demons?.map((tier, index) => (
                              <div className='flex flex-col items-center justify-center gap-2' key={index}>
                                 <p className='text-lg text-center font-semibold'>{tier.name}</p>
                                 <button onClick={() => openCompletion(tier)} className='font-thin hover:scale-125 transition-transform duration-100'><span className='text-red-600 font-bold'>{getTierProgress(tier)}</span> / <span className='text-green-500 font-bold'>{tier.levels.length}</span></button>
                                 <div className='w-32 bg-gray-700 rounded-full'>
                                    <div className={`bg-indigo-600 text-xs font-medium text-blue-100 text-center leading-none rounded-full py-0.5`} style={{ width: `${getTierProgress(tier) / tier.levels.length}%`}}>{Math.floor(getTierProgress(tier) / tier.levels.length)}%</div> {/* get percantage of completions */}
                                 </div>
                              </div>
                           ))}
                        </>
                     )}
                  </div>
               </div>
               <ViewCompletions completions={tieredCompletions} tier={tier} toggle={viewCompletions} setToggle={setViewCompletions} />
            </div>
         ) : (
            <div className='min-h-screen min-w-screen'>
               <p className='font-semibold text-center text-2xl'>you are not logged in</p>
            </div>
         )}
      </>
   )
}