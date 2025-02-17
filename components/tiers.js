import { useState } from 'react';
import { Tooltip } from '@mui/material';
import LevelsCard from './levelsCard';

export default function Tiers({ tierData }) {
   const [tier, setTier] = useState({})
   const [open, setOpen] = useState(false);

   function displayLevels(tier) {
      setTier(tier);
      setOpen(true);
   }

   return (
      <>
         <div className='flex flex-col items-center justify-center gap-4 mb-2'>
            <p className='text-2xl font-inter'>Tiers</p>
            <div className='grid grid-cols-2 sm:grid-cols-2 sm:grid-rows-subgrid gap-2'>
               {tierData.map((tier, index) => (
                  <div className='flex flex-col items-center justify-center' key={index}>
                     <Tooltip title={tier.desc} enterTouchDelay={200} slotProps={{ tooltip: { sx: { userSelect: false, textAlign: 'center', fontSize: '12px' }} }} disableInteractive arrow placement='top'>
                        <button onClick={() => displayLevels(tier)} key={index} className='text-xl px-4 py-2 bg-indigo-800 hover:bg-indigo-600 active:bg-indigo-400 duration-200 transition-colors rounded-lg select-none'>{tier.name}</button>
                     </Tooltip>
                  </div>
               ))}
            </div>
            <LevelsCard tierData={tier} toggle={open} setToggle={setOpen} />
         </div>
      </>
   )
}