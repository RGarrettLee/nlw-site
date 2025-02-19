import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Tooltip } from '@mui/material';

export default function Tiers({ tierData, setLevel }) {

   return (
      <>
         {tierData?.map((tier, key) => (
            <Disclosure key={key} as='div' className='py-2' defaultOpen={false}>
            { ({ open }) => (
               <>
                  <Tooltip title={tier.desc} enterTouchDelay={200} slotProps={{ tooltip: { sx: { userSelect: false, textAlign: 'center', fontSize: '12px' }} }} disableInteractive arrow placement='top'>
                  <DisclosureButton className='group flex bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 rounded-lg w-fit px-4 py-1 duration-200 transition-colors items-center justify-between gap-1'>
                     <span className='text-xl font-inter text-white group-data-[hover]:text-white/80'>{tier.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${open ? '' : 'rotate-180 transform'} duration-200 transition-transform`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                  </DisclosureButton>
                  </Tooltip>
                  <DisclosurePanel className='mt-2 text-sm/5 text-white gap-1'>
                     {tier.levels?.map((level, index) => (
                        <button onClick={() => setLevel(level)} key={index} className='text-lg m-0.5 text-start font-inter hover:bg-indigo-600 active:bg-indigo-500 focus:bg-purple-900 duration-200 transition-colors rounded-lg w-fit px-4 py-2'>{level.name}</button>
                     ))}
                  </DisclosurePanel>
               </>
            )}
            </Disclosure>
         ))}
      </>
   )
}