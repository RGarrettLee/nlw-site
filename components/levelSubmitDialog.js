import { Dialog, DialogPanel, DialogTitle, Fieldset, Legend, Field, Input, Select, Label, Textarea } from '@headlessui/react';
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react';
import supabase from '../db/connection';

export default function LevelSubmitDialog({ level, nlwData, platformer, user, toggle, setToggle }) {
   const [searchedLevel, setSearchedLevel] = useState({});
   const [embed, setEmbed] = useState('');
   const [url, setUrl] = useState('');
   const [personalEnj, setPersonalEnj] = useState(0);
   const [personalRate, setPersonalRate] = useState('Beginner Tier');
   const [opinion, setOpinion] = useState('');
   const [attempts, setAttempts] = useState(0);

   function resetValues() {
      setPersonalEnj(0);
      setPersonalRate('Beginner Tier');
      setOpinion('');
      setAttempts(0);
      setUrl('');
      setSearchedLevel({});
      setEmbed('');
   }

   function getEmbed(url) {
      const ytRegEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const medalRegEx = /^.*(medal\/|games\/|geometry-dash\/|clips\/)([^#&?]*\?invite\=cr\-[^#&?]*).*/

      if (url.match(ytRegEx) && url.match(ytRegEx)[2].length === 11) {
         setUrl(url);
         setEmbed('https://www.youtube.com/embed/'+url.match(ytRegEx)[2]);
      } else if (url.match(medalRegEx) && url.match(medalRegEx)[1] === 'clips/') {
         let mod = url.replace('clips', 'clip');
         setUrl(url);
         setEmbed(mod.match(medalRegEx)[0]);
      } else {
         setEmbed('not embeddable')
      }
   }

   async function submitRecord() {
      window.alert('Your record has been submitted and is awaiting approval');

      let completion = Object.assign({}, { 'personalEnj': personalEnj, 'personalRate': personalRate, 'opinion': opinion, 'attempts': attempts, 'video': url, 'embed': embed, 'status': 'pending', 'platformer': platformer }, level)
      let completions = user.completions;

      completions.push(completion);

      await supabase.from('profiles').update({ completions: completions }).eq('full_name', user.full_name)

      resetValues();
      setToggle(false);
   }

   return (
      <Dialog as='div' className='relative z-40' open={toggle} onClose={() => {
         setToggle(false);
         resetValues();
      }}>
         <div className='fixed inset-0 w-screen overflow-y-auto'>
            <div className='flex flex-col min-h-full items-center justify-center'>
            <DialogPanel transition className="flex flex-col items-center justify-center gap-4 w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                  <DialogTitle className='font-inter text-center text-2xl'>Submit Completion</DialogTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => setToggle(false)} className="absolute size-10 sm:hidden bg-red-600 hover:bg-red-500 active:bg-red-400 top-2 right-2 rounded-lg">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  <div className='flex flex-col items-center justify-center gap-2'>
                     <div className='flex flex-col items-center justify-center'>
                        <p className='text-xl font-thin'><span className='font-bold'>{level.name}</span> by <span className='font-semibold underline-offset-2 underline'>{level.creators}</span></p>
                     </div>
                     <Fieldset className='space-y-3 rounded-xl bg-white/5 p-6 text-center'>
                        <Legend className='text-base/7 font-bold'>Details</Legend>
                        <Field className='flex flex-col items-center justify-center gap-2'>
                           <Label className='text-md/6 font-medium'>Enjoyment</Label>
                           <Select onChange={(event) => setPersonalEnj(event.target.value)} className='w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6' required>
                              {Array.apply(0, Array(10)).map((x, i) => (
                                 <option key={i} className='text-black'>{i+1}</option>
                              ))}
                           </Select>
                           <Label className='text-md/6 font-medium'>Personal Rating</Label>
                           <Select onChange={(event) => setPersonalRate(event.target.value)} className='w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6' required>
                              {nlwData?.demons.map((tier, index) => (
                                 <option key={index} className='text-black' value={tier.name}>{tier?.name?.replace('tier', '')}</option>
                              ))}
                           </Select>
                           <Textarea onChange={(event) => setOpinion(event.target.value)} className='resize-none w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/5' rows={4} placeholder='Optional: Share your thoughts'></Textarea>
                           <Label className='text-md/6 font-medium'>Attempt Count</Label>
                           <Input onChange={(event) => setAttempts(event.target.value)} className='bg-white/5 py-1.5 px-3 text-sm/6 rounded-lg' name='attempts' type='number' required />
                           <Label className='text-md/6 font-medium' required>Video Link</Label>
                           <Input onChange={(event) => getEmbed(event.target.value)} className='bg-white/5 py-1.5 px-3 text-sm/6 rounded-lg' name='link' />
                           {embed !== '' ? (
                              <div className='flex flex-col items-center justify-center gap-2'>
                                 <button type='submit' onClick={() => submitRecord()} className='px-4 py-2 bg-green-700 hover:bg-green-600 active:bg-green-500 duration-200 transition-colors rounded-xl font-inter'>Submit record</button>
                                 {embed !== 'not embeddable' ? (
                                    <iframe width='300' height='169' className='block mx-auto border-none' src={embed} allow='autoplay' allowFullScreen></iframe>
                                 ) : (
                                    <></>
                                 )}
                              </div>
                           ) : (
                              <></>
                           )}
                        </Field>
                     </Fieldset>
                  </div>
               </DialogPanel>
            </div>
         </div>
      </Dialog>
   )
}