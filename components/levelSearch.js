import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import LevelSubmitDialog from "./levelSubmitDialog";

export default function LevelSearch({ nlwData, platformer, setSearchedLevel }) {
   const [levels, setLevels] = useState([]);

   useEffect(() => {
      async function getLevels() {
         let levels = [];
         let counter = 0;

         if (platformer) {
            nlwData.platformers?.map((tier) => {
               tier.levels.map((level) => {
                  levels.push(Object.assign({}, { 'uid': counter, 'tier': tier.name.replace('Tier', '') }, level));
                  counter++;
               })
            });
         } else {
            nlwData.demons?.map((tier) => {
               tier.levels.map((level) => {
                  levels.push(Object.assign({}, { 'uid': counter, 'tier': tier.name.replace('Tier', '') }, level));
                  counter++;
               })
            });
         }

   
         setLevels([...levels]);
      }

      getLevels();
   }, [nlwData, platformer]);

   function findLevel(e) {
      if (e.target.innerHTML.length < 31) {
         let res = levels.find(({ uid }) => uid === parseInt(e.target?.attributes?.id?.value));
         if (res === undefined) {
            res = {};
         }

         setSearchedLevel(res);
      } else {
         let idStart = e.target.innerHTML.substring(31);
         let eid = ''

         for (let i = 0; i < idStart.length; i++) {
            if (idStart.charAt(i) !== '"') {
               eid += idStart.charAt(i);
            } else {
               break;
            }
         }
   
         let res = levels.find(({ uid }) => uid === parseInt(eid));
         if (res === undefined) {
            res = {};
         }
         setSearchedLevel(res);
      }
   }

   return (
      <>
         <div className='flex flex-col items-center justify-center gap-2'>
            <div className='flex items-center justify-center gap-2'>
               <Autocomplete
                  disablePortal
                  options={levels}
                  renderOption={(props, option) => (
                     <li className='flex flex-col items-center justify-center text-center'{...props} key={option.uid}>
                        <div className='flex gap-2'>
                           <p id={option.uid} className='font-thin'>{option.name}</p>
                        </div>
                     </li>
                  )}
                  autoSelect
                  sx={{ width: {xs: 300, sm: 175, md: 180, lg: 300} , bgcolor: 'gray' }}
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => option.uid}
                  onChange={(event) => findLevel(event)}
                  renderInput={(params) => <TextField {...params} label='Search level' variant='filled' />}
               />
            </div>
         </div>
      </>
   )
}