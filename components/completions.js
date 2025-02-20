import { useEffect, useState } from 'react';
import Colours from '../util/colours';

export default function Completions({ completions }) {
   const { colours } = Colours();
   const sortOrder = [
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
   ]

   const [sortedCompletions, setSortedCompletions] = useState([]);

   useEffect(() => {
      setSortedCompletions([...completions.sort((a, b) => sortOrder.indexOf(a.tier.trim()) - sortOrder.indexOf(b.tier.trim()))]);
   }, [completions]);



   return ( 
      <div className='flex gap-4 items-center justify-center flex-wrap px-3'>
         {sortedCompletions.map((level, key) => (
            <div key={key}>
               {level.status === 'approved' ? (
                  <div className={`flex flex-col items-center justify-center ${colours[level.tier.trim() + ' Tier']}`}>
                     <div className='flex flex-col items-start relative min-h-20'>
                        <p className={`font-inter text-2xl pt-2 px-4 ${level.tier !== 'Fuck' ? 'text-black' : 'text-red-600'}`}>{level.name}</p>
                        <p className='text-lg sm:text-2xl text-black rounded-tr-xl absolute px-3 pb-1 bottom-0 left-0 font-inter'>{level.personalEnj}</p>
                        <a href={level.video} target='_blank' noreferrer='true'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`absolute bottom-1 right-2 size-6 ${level.tier !== 'Fuck' ? 'text-black hover:text-white active:text-white/80' : 'text-white hover:text-white/80 active:text-white/60'} duration-200 transition-colors`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg></a>
                     </div>
                  </div>
               ) : (
                  <></>
               )}
            </div>
         ))}
      </div>
   )
}

/*
                        <p className='font-inter text-black px-4 text-center mb-10'>{level.tier} Tier</p>
                        <p className='font-medium text-black px-4 text-center mb-9'>Personal Rate: {level.personalRate.replace('Tier', '').trim()}</p>

                        {level.opinion ? (
                           <>
                              <p className='font-medium text-sm mt-2 text-black px-4 text-center'>Opinion:</p>
                              <textarea className='bg-transparent resize-none text-black w-full text-sm px-4 mb-9'>{level.opinion}</textarea>
                           </>
                        ) : (
                           <></>
                        )}*/