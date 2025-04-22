import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Tooltip } from '@mui/material';

export default function Tiers({ tierData, setLevel }) {
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
      'Fuck': 'bg-fuck',
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
      'Fuck': 'bg-fuck',
   };

   function returnLevel(level, tier) {
      setLevel(Object.assign({}, { 'tier': tier.name.replace('Tier', '') }, level));
   }

   return (
      <>
         {tierData?.map((tier, key) => (
            <Disclosure key={key} as='div' className='py-2' defaultOpen={false}>
            { ({ open }) => (
               <>
                  <Tooltip title={tier.desc} enterTouchDelay={200} slotProps={{ tooltip: { sx: { userSelect: false, textAlign: 'center', fontSize: '12px' }} }} disableInteractive arrow placement='top'>
                  <DisclosureButton className={`group flex ${colours[tier.name]} ${hover[tier.name]} ${active[tier.name]} ${tier.name === 'Fuck' ? 'border-2 border-white/35' : ''} ${open ? 'sticky top-0' : ''} rounded-lg w-fit px-4 py-1 duration-200 transition-colors items-center justify-between gap-1`}>
                     <span className={`text-xl font-inter ${tier.name === 'Fuck' ? 'text-red-600 group-hover:text-red-400 group-active:text-red-300' : 'text-black'} duration-200 transition-colors`}>{tier.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${open ? '' : 'rotate-180 transform'} ${tier.name === 'Fuck' ? 'text-white' : 'text-black'} duration-200 transition-transform`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                  </DisclosureButton>
                  </Tooltip>
                  <DisclosurePanel className='mt-2 text-sm/5 text-white gap-1'>
                     {tier.levels?.map((level, index) => (
                        <button onClick={() => returnLevel(level, tier)} key={index} className='m-0.5 text-start hover:bg-indigo-600 active:bg-indigo-500 focus:bg-purple-900 duration-200 transition-colors rounded-lg w-fit px-4 py-2'>
                           <div className='flex flex-col items-center justify-center'>
                              <p className='text-lg text-center font-inter'>{level.name}</p>
                              <p className='text-base font-thin underline underline-offset-2'>{level.skillsets}</p>
                           </div>
                        </button>
                     ))}
                  </DisclosurePanel>
               </>
            )}
            </Disclosure>
         ))}
      </>
   )
}