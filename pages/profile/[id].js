import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import ViewCompletions from '../../components/viewCompletions';

export default function Page({ users, nlwData }) {
   const [user, setUser] = useState({});
   const [levels, setLevels] = useState([]);
   const [plevels, setPlevels] = useState([]);
   const [isPlatformer, setIsPlatformer] = useState(false);
   const [viewCompletions, setViewCompletions] = useState(false);
   const [tier, setTier] = useState({});
   const [tieredCompletions, setTieredCompletions] = useState([]);
   const router = useRouter();

   useEffect(() => {
      async function getLevels() {
         let levels = [];
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

      async function getUsers() {
         let notfound = true;

         users?.map((user) => {
            if (user.full_name === router.query.id) {
               setUser(user);
               notfound = false;
            }
         });
   
         if (notfound) {
            setUser({ notfound: true });
         }
      }

      getUsers();
      getLevels();
   }, [users, nlwData, router.query.id]);

   function getTierProgress(tier) {
      let progress = 0;

      if (isPlatformer) {
         plevels.map((level) => {
            if (tier.name.toLowerCase() === (level.tier + 'Tier').toLowerCase()) {
               if (user?.completions.find(({ uid }) => uid === level.uid)?.status === 'approved') {
                  progress++;
               }
               
            }
         })
      } else {
         levels.map((level) => {
            if (tier.name.toLowerCase() === (level.tier + 'Tier').toLowerCase()) {
               if (user?.completions.find(({ uid }) => uid === level.uid)?.status === 'approved') {
                  progress++;
               }
               
            }
         })
      }

      return progress;
   }

   function openCompletion(tier) {
      let levels = [];

      user?.completions.map((level) => {
         if (tier.name.toLowerCase() === (level.tier + 'Tier').toLowerCase()) {
            if (user?.completions.find(({uid}) => uid === level.uid)?.status ==='approved' && user?.completions.find(({name}) => name === level.name) && user?.completions.find(({ platformer }) => platformer === isPlatformer)) {
               levels.push(level);
            }
         }
      })
      setTieredCompletions([...levels]);
      setTier(tier);
      setViewCompletions(true);
   }

   return (
      <>
         {user?.full_name ? (
            <div className='flex flex-col items-center justify-center min-h-screen min-w-screen gap-4'>
               <div className='flex items-center justify-center mb-6 gap-6'>
                  <img className='rounded-full' height={100} width={100} src={user?.avatar_url} alt='user pfp' />
                  {user?.gd_username === null ? (
                     <h2 className='text-3xl font-inter'>{user?.full_name}</h2>
                  ) : (
                     <h2 className='text-3xl font-inter'>{user?.gd_username}</h2>
                  )}
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
            <div className='flex flex-col items-center justify-center min-h-screen min-w-screen'>
               {!user?.notfound ? (
                  <h2 className='text-center text-3xl font-inter'>loading profile...</h2>
               ) : (
                  <h2 className='text-center text-3xl font-inter'>That user does not exist</h2>
               )}
            </div>
         )}
      </>
   )
}