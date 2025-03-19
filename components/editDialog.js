import { Dialog, DialogPanel, DialogTitle, Fieldset, Field, Input, Label } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../db/connection';

export default function EditDialog({ user, toggle, setToggle }) {
   const [nick, setNick] = useState('');
   const [gdID, setGdID] = useState(0);
   const router = useRouter();

   useEffect(() => {
      setNick(user.nickname);
      setGdID(parseInt(user.gdID));
   }, [user]);

   async function submitUpdates() {
      window.alert('You have updated your profile');

      let updatedUser = user;

      if (updatedUser.nickname !== nick) {
         updatedUser.nickname = nick;
      }
      if (updatedUser.gdID !== gdID) {
         updatedUser.gdID = gdID;
      }

      await supabase.from('profiles').update({ nickname: nick, gdID: gdID }).eq('full_name', user.full_name);
      setToggle(false);
      router.reload();
   }

   return (
      <Dialog as='div' className='z-40' open={toggle} onClose={() => { setToggle(false)}}>
         <div className='fixed inset-0 w-screen overflow-y-auto'>
            <div className='flex flex-col min-h-full items-center justify-center'>
               <DialogPanel transition className='flex flex-col items-center justify-center gap-4 w-full max-w-md rounded-xl bg-slate-900 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>
                  <DialogTitle className='font-inter text-center text-2xl'>Edit Profile</DialogTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => setToggle(false)} className="absolute size-10 sm:hidden bg-red-600 hover:bg-red-500 active:bg-red-400 top-2 right-2 rounded-lg">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  <div className='flex flex-col items-center justify-center gap-4'>
                     <Fieldset className='space-y-3 rounded-xl bg-white/5 p-6 text-center'>
                        <Field className='flex flex-col items-center justify-center gap-2'>
                           <Label className='text-md/6 font-medium'>Nickname</Label>
                           <Input onChange={(event) => setNick(event.target.value)} value={nick} className='rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6' />
                           <Label className='text-md/6 font-medium'>GD Account ID (Optional)</Label>
                           <Input onChange={(event) => setGdID(event.target.value)} value={gdID} className='rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6' type='number' />
                        </Field>
                     </Fieldset>
                     <div className='flex gap-4 items-center justify-center'>
                        <button onClick={() => submitUpdates()} className='px-4 py-2 rounded-lg font-inter bg-green-600 hover:bg-green-500 active:bg-green-400 duration-200 transition-colors'>Save</button>
                        <button onClick={() => setToggle(false)} className='px-4 py-2 rounded-lg font-inter bg-red-600 hover:bg-red-500 active:bg-red-400 duration-200 transition-colors'>Cancel</button>
                     </div>
                  </div>
               </DialogPanel>
            </div>
         </div>
      </Dialog>
   )
}