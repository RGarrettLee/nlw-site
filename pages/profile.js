import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import EditDialog from '../components/editDialog';
import GdIconView from '../components/gdIconView';
import supabase from '../db/connection';

export default function Profile({ user }) {
   const [profile, setProfile] = useState({});
   const [isWish, setIsWish] = useState(false);
   const [isPlatformer, setIsPlatformer] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [level, setLevel] = useState({});
   const sortOrder = [
      'Nightmare',
      'Unreal',
      'Menacing',
      'Demonic',
      'Apocalpytic',
      'Monstrous',
      'Merciless',
      'Excruciating',
      'Inexorable',
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
      'Inexorable Tier': 'bg-inexorable',
      'Excruciating Tier': 'bg-excruciating',
      'Merciless Tier': 'bg-merciless',
      'Monstrous Tier': 'bg-monstrous',
      'Apocalyptic Tier': 'bg-apocalyptic',
      'Demonic Tier': 'bg-demonic',
      'Menacing Tier': 'bg-menacing',
      'Unreal Tier': 'bg-unreal',
      'Nightmare Tier': 'bg-nightmare',
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
      'Inexorable ': 'text-inexorable',
      'Excruciating ': 'text-excruciating',
      'Merciless ': 'text-merciless',
      'Monstrous ': 'text-monstrous',
      'Apocalyptic ': 'text-apocalyptic',
      'Demonic ': 'text-demonic',
      'Menacing ': 'text-menacing',
      'Unreal ': 'text-unreal',
      'Nightmare ': 'text-nightmare',     
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
      'Inexorable Tier': 'text-inexorable',
      'Excruciating Tier': 'text-excruciating',
      'Merciless Tier': 'text-merciless',
      'Monstrous Tier': 'text-monstrous',
      'Apocalyptic Tier': 'text-apocalyptic',
      'Demonic Tier': 'text-demonic',
      'Menacing Tier': 'text-menacing',
      'Unreal Tier': 'text-unreal',
      'Nightmare Tier': 'text-nightmare',
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
      'Inexorable Tier': 'hover:bg-inexorable/80',
      'Excruciating Tier': 'hover:bg-excruciating/80',
      'Merciless Tier': 'hover:bg-merciless/80',
      'Monstrous Tier': 'hover:bg-monstrous/80',
      'Apocalyptic Tier': 'hover:bg-apocalyptic/80',
      'Demonic Tier': 'hover:bg-demonic/80',
      'Menacing Tier': 'hover:bg-menacing/80',
      'Unreal Tier': 'hover:bg-unreal/80',
      'Nightmare Tier': 'hover:bg-nightmare/80',
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
      'Inexorable Tier': 'active:bg-inexorable/60',
      'Excruciating Tier': 'active:bg-excruciating/60',
      'Merciless Tier': 'active:bg-merciless/60',
      'Monstrous Tier': 'active:bg-monstrous/60',
      'Apocalyptic Tier': 'active:bg-apocalyptic/60',
      'Demonic Tier': 'active:bg-demonic/60',
      'Menacing Tier': 'active:bg-menacing/60',
      'Unreal Tier': 'active:bg-unreal/60',
      'Nightmare Tier': 'active:bg-nightmare/60',
      'Fuck': 'bg-fuck',
   };

   const router = useRouter();

   useEffect(() => {
      let dlevels = [];
      let plevels = [];
      let tiers = [];
      let ptiers = [];
      let wishTiers = [];

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

      user.wishlist?.map((level) => {
         if (user.wishlist.includes(level) && (level.status !== 'approved' || level.status !== 'pending') && !level.platformer) {
            if (!wishTiers.find(({ name }) => name === level.tier)) {
               wishTiers.push({ 'name': level.tier, 'count': 1 });
            } else {
               wishTiers.find(({ name }) => name === level.tier).count+= 1;
            }
            //dlevels.push(level);
         }
         if (user.wishlist.includes(level) && (level.status !== 'approved' || level.status !== 'pending') && level.platformer){
            if (!wishTiers.includes(({ name }) => name === level.tier)) {
               wishTiers.push({ 'name': level.tier, 'count': 1 });
            } else {
               wishTiers.find(({ name }) => name === level.tier).count+= 1;
            }
            plevels.push(level);
         }
      });
      //temp.wishlist.sort();
      temp.wishTiers = wishTiers;
      temp.wishTiers.sort((a, b) => sortOrder.indexOf(a.name.trim()) - sortOrder.indexOf(b.name.trim()));
      //temp.ptiers.sort((a, b) => sortOrder.indexOf(a.name.trim()) - sortOrder.indexOf(b.name.trim()));

      console.log(temp);

      setProfile(temp);
   }, [user, sortOrder]);
      
   async function deleteRecord() {
      let completions = user.completions;
      let pos = completions.indexOf(level);
      let confirm = prompt(`Type the name of the level to confirm deletion: ${level.name}`);


      if (confirm === level.name) {
         completions.splice(pos, 1);
         await supabase.from('profiles').update({ completions: completions }).eq('full_name', user.full_name);
         window.alert(`You have deleted ${user.full_name}'s record of ${level.name}`);
         router.reload();
      } 
   }

   async function deleteFromWishlist() {
      let wishlist = user.wishlist;
      let pos = wishlist.indexOf(level);
      wishlist.splice(pos, 1);
      await supabase.from('profiles').update({ wishlist: wishlist }).eq('full_name', user.full_name);
      router.reload();
   }

   return (
      <div className='flex min-h-screen min-w-screen overflow-y-hidden snap-x snap-mandatory justify-center items-stretch backdrop-blur-sm'>
         {user?.full_name ? (
            <>
               <div className='flex flex-col px-4 pt-4 w-screen items-start justify-stretch flex-shrink-0 snap-center md:w-1/5 overflow-y-scroll max-h-screen gap-4'>
                  <div className='flex gap-4 items-center'>
                     <Switch
                        checked={isWish}
                        onChange={() => {
                           setIsWish(!isWish);
                           setLevel({});
                        }}
                        className={`${isWish ? 'bg-indigo-700' : 'bg-indigo-500'}
                           relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                        >
                        <span className="sr-only">Use setting</span>
                        <span
                           aria-hidden="true"
                           className={`${isWish ? 'translate-x-9' : 'translate-x-0'}
                              pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                     </Switch>
                     <p className='text-2xl font-inter'>{isWish ? 'Wishlist' : 'Completions'}</p>
                  </div>
                  <div className='flex gap-4 items-center justify-center'>
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
                     <p className='text-2xl font-inter'>{isPlatformer ? 'Platformer Levels' : 'Regular Levels'}</p>
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
                           {isWish ? (
                              <>
                                 {user.wishTiers?.map((tier, key) => (
                                    <div key={key}>
                                       <p className='font-inter text-lg'>{tier.name} Tier</p>
                                       {user.wishlist?.map((level, index) => (
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
                              </>
                           ) : (
                              <>
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
                              </>
                           )}
                        </div>
                     )}
                  </div>
               </div>
               <div className='flex flex-col w-screen items-center justify-center flex-shrink-0 snap-center gap-10 pt-10 sm:pt-0 md:w-4/5'>
                  <div className='flex flex-col items-center gap-4'>
                     <div className='flex gap-4 items-center justify-center'>
                        <img className='rounded-full' src={profile.avatar_url} width={100} height={100} alt='user pfp' />
                        {profile.nickname ? (
                           <p className='font-inter text-4xl'>{profile.nickname}</p>
                        ) : (
                           <p className='font-inter text-4xl'>{profile.full_name}</p>
                        )}
                     </div>
                     <GdIconView user={user} />
                     <button onClick={() => setOpenEdit(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 hover:text-white/75 active:text-white/50 duration-200 transition-colors absolute top-2 sm:top-5 sm:right-5">
                     <EditDialog user={user} toggle={openEdit} setToggle={setOpenEdit} />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                     </svg></button>
                     <div className='flex flex-col items-center gap-2'>
                        <p className='text-xl font-inter'>Extreme Demons Completed: <span className='text-green-500'>{user?.dcompletions?.length + user?.pcompletions?.length}</span></p>
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
                              {isWish ? (
                                 <>
                                    <iframe width='560' height='315' className='block border-none w-[400px] h-[225px] sm:w-[420px] sm:h-[235px] xl:w-[720px] xl:h-[403px]' src={`https://www.youtube.com/embed/${level?.videoID}`} allow='autoplay' allowFullScreen></iframe>
                                    <div className='flex flex-col gap-1 items-center'>
                                       <p className='text-xl font-inter text-white'>Skillsets:</p>
                                       <p className='text-lg font-medium text-center underline underline-offset-2 text-indigo-200'>{level?.skillsets}</p>
                                    </div>
                                 </>
                              ) : (
                                 <>
                                    <div className='flex flex-col gap-1 items-center'>
                                       <p className='text-xl font-inter text-white'>Skillsets:</p>
                                       <p className='text-lg font-medium text-center underline underline-offset-2 text-indigo-200'>{level?.skillsets}</p>
                                    </div>
                                    <a href={level.video} target='_blank' noreferrer='true'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute top-7 right-1/3 size-6 text-white hover:text-blue-300 active:text-blue-200 duration-200 transition-colors">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                    </svg></a>
                                    <div className='flex md:flex-col w-full justify-center items-center gap-3'>
                                       <div className='flex flex-col md:grid md:grid-cols-4 justify-stretch sm:w-1/2 md:px-10'>
                                          <p className='text-xl font-inter text-center'>Personal Rating:</p>
                                          <p className='text-xl font-inter text-center'>Enjoyment:</p>
                                          <p className='text-xl font-inter text-center'>Attempts:</p>
                                          <p className='text-xl font-inter text-center'>Worst Fail:</p>
                                       </div>
                                       <div className='flex flex-col md:grid md:grid-cols-4 justify-stretch md:w-1/2 md:px-10'>
                                          <p className={`text-xl font-medium text-center ${textColours[level?.personalRate]}`}>{level?.personalRate}</p>
                                          <p className='text-xl font-medium text-center text-indigo-200'>{level?.personalEnj}</p>
                                          <p className='text-xl font-medium text-center text-indigo-200'>{level?.attempts}</p>
                                          <p className='text-xl font-medium text-center text-red-500'>{level?.worstFail}%</p>
                                       </div>
                                    </div>
                                 </>
                              )}
                              {level?.opinion !== '' && !isWish ? (
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
                           {isWish ? (
                              <button onClick={() => deleteFromWishlist()} className='px-4 py-2 bg-red-600 hover:bg-red-500 active:bg-red-400 rounded-lg duration-200 transition-colors font-inter text-black'>Delete from Wishlist</button>
                           ) : (
                              <button onClick={() => deleteRecord()} className='px-4 py-2 bg-red-600 hover:bg-red-500 active:bg-red-400 rounded-lg duration-200 transition-colors font-inter text-black'>Delete Record</button>
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