import { Dialog, DialogPanel, DialogTitle, Fieldset, Field, Input, Label } from '@headlessui/react';
import { useState, useEffect } from 'react';

export default function SubmissionsDialog({ user, toggle, setToggle }) {
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


   useEffect(() => {

   }, [user]);


   return (
      <Dialog as='div' className='z-40' open={toggle} onClose={() => { setToggle(false)}}>
         <div className='fixed inset-0 w-screen overflow-y-auto'>
            <div className='flex flex-col min-h-full items-center justify-center'>
               <DialogPanel transition className='flex flex-col items-center justify-center gap-4 w-full max-w-md rounded-xl bg-slate-900 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>
                  <DialogTitle className='font-inter text-center text-2xl'>View Submissions</DialogTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => setToggle(false)} className="absolute size-10 sm:hidden bg-red-600 hover:bg-red-500 active:bg-red-400 top-2 right-2 rounded-lg">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  <div className='flex flex-col items-center justify-center gap-4'>
                    {user.completions?.map((level, index) => (
                        <>
                        {level.status === 'pending' ? (
                            <div className='flex gap-4 justify-center items-center'>
                              <p key={index} className={`text-lg m-0.5 text-start font-inter hover:cursor-pointer ${textColours[level.tier + 'Tier']}  duration-200 transition-colors`}>{level.name}</p>
                              <p className='font-inter text-lg'>|</p>
                              <p className={`${level.status === 'pending' ? 'text-yellow-400' : 'text-green-400'} text-lg m-0.5 text-start font-inter`}>{level.status}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                        </>
                    ))}
                     <div className='flex gap-4 items-center justify-center'>
                        <button onClick={() => setToggle(false)} className='px-4 py-2 rounded-lg font-inter bg-red-600 hover:bg-red-500 active:bg-red-400 duration-200 transition-colors'>Close</button>
                     </div>
                  </div>
               </DialogPanel>
            </div>
         </div>
      </Dialog>
   )
}