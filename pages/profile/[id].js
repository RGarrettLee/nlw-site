import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Page({ users, nlwData }) {
   const [user, setUser] = useState({});
   const [levels, setLevels] = useState([]);
   const router = useRouter();

   useEffect(() => {
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

      async function getUsers() {
         let notfound = true;

         users.map((user) => {
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
   }, [router.query.id, users]);

   function getTierProgress(tier) {
      let progress = 0;

      levels?.map((level) => {
         if (tier.name.toLowerCase() === (level?.tier + 'Tier').toLowerCase()) {
            if (user?.completions.find(({ uid }) => uid === level.uid)?.status === 'approved') {
               progress++;
            }
         }
      })

      return progress;
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