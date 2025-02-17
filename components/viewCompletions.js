import { Dialog, DialogTitle, DialogPanel, Textarea } from '@headlessui/react';

export default function ViewCompletions({ completions, tier, toggle, setToggle }) {
   
   return (
      <>
         <Dialog as='div' className='relative z-40' open={toggle} onClose={() => setToggle(false)}>
            <div className='fixed inset-0 w-screen overflow-y-scroll'>
               <div className='flex flex-col min-h-full min-w-full items-center justify-center'>
                  <DialogPanel transition className='flex flex-col items-center justify-center w-screen rounded-2xl px-20 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>        
                     <div className='relative bg-slate-800 rounded-lg'>
                        <DialogTitle className='text-3xl px-4 py-2 font-inter text-center'>{tier.name}</DialogTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => setToggle(false)} className="absolute size-5 sm:size-8 bg-red-600 hover:bg-red-500 active:bg-red-400 duration-200 transition-colors top-1 right-1 sm:top-2 sm:right-2 rounded-lg">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        <div className={`${completions.length > 1 ? `sm:grid ${completions.length > 4 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} justify-center gap-4` : 'sm:flex sm:flex-col sm:items-center sm:justify-center'} flex flex-col`}>
                           {completions.map((level, key) => (
                              <div key={key} className='relative bg-white/10 min-h-40 min-w-72 p-4 m-2 rounded-xl'>
                                 <div className='flex flex-col items-center justify-center'>
                                    <p className='font-thin text-lg sm:text-xl text-center'><span className='text-xl sm:text-2xl font-inter'>{level.name}</span> by <span className='text-xl sm:text-2xl font-inter'>{level.creators}</span></p>
                                    <p className='text-lg sm:text-3xl border-r-4 border-b-0 border-t-4 border-l-0 bg-red-700 border-red-700 rounded-tr-xl absolute px-3 pb-1 bottom-0 left-0'>{level.personalEnj}</p>
                                    <p className='text-md sm:text-lg font-thin'>Attempts: <span className='font-inter'>{level.attempts}</span></p>
                                    <p className='text-md sm:text-lg font-thin'>Personal Rating: <span className='font-inter'>{level.personalRate}</span></p>
                                    <p className='text-md sm:text-lg font-thin'>Skillsets: <span className='font-inter'>{level.skillsets}</span></p>
                                    {level.opinion !== '' ? (
                                       <>
                                          <p className='text-md sm:text-lg font-semibold'>Personal Opinion:</p>
                                          <Textarea className='text-md sm:text-lg min-w-full text-center text-white bg-transparent font-thin resize-none rounded-lg px-2 mb-5' readonly='true'>{level.opinion}</Textarea>
                                       </>
                                    ) : (
                                       <></>
                                    )}
                                 </div>
                                 <a href={level.video} target='_blank' noreferrer='true'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute bottom-1 right-2 size-6 hover:text-blue-300 active:text-blue-200 duration-200 transition-colors">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                 </svg></a>
                              </div>
                           ))}
                        </div>
                     </div>
                  </DialogPanel>
               </div>
            </div>
         </Dialog>
      </>
   )
}