import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import LevelSubmitDialog from "./levelSubmitDialog";

export default function LevelSearch({ nlwData, user }) {
   const [levels, setLevels] = useState([]);
   const [searchedLevel, setSearchedLevel] = useState({});

   useEffect(() => {
      async function getLevels() {
         let levels = [];
         let counter = 0;

         nlwData.map((tier) => {
            tier.levels.map((level) => {
               levels.push(Object.assign({}, { 'uid': counter, 'tier': tier.name.replace('Tier', '') }, level));
               counter++;
            })
         });
   
         setLevels([...levels]);
      }

      getLevels();
   }, [nlwData]);

   function findLevel(e) {
      if (e.target.innerHTML.length < 31) {
         let res = levels.find(({ uid }) => uid === parseInt(e.target.attributes.id.value));
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
                  sx={{ width: 300, bgcolor: 'ghostwhite' }}
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => option.uid}
                  onChange={(event) => findLevel(event)}
                  renderInput={(params) => <TextField {...params} label='Search level' variant='filled' />}
               />
            </div>
            <div className={`flex flex-col items-center justify-center`}>
               {searchedLevel?.name ? (
               <table className='table-fixed mx-2'>
                  <tbody>
                     <tr className='backdrop-blur-sm text-white' align='center'>
                        <td className='border-gray-700 border-2 px-1' width='150' height='20'>
                           <strong>Tier</strong>
                        </td>
                        <td className='border-gray-700 border-2 px-1' width='150' height='20'>
                           <strong>Creator(s)</strong>
                        </td>
                        <td className='border-gray-700 border-2 px-1' width='100' height='20'>
                           <strong>Length</strong>
                        </td>
                        <td className='border-gray-700 border-2 px-1' width='150' height='20'>
                           <strong>Skillsets</strong>
                        </td>
                        <td className='border-gray-700 border-2 px-1' width='100' height='20'>
                           <strong>Enj.</strong>
                        </td>
                        <td className='border-gray-700 border-2 px-1' width='300' height='20'>
                           <strong>Description/Notes</strong>
                        </td>
                     </tr>
                     <tr className='backdrop-blur-sm text-black text-center' key={searchedLevel?.id}>
                        <td className='border-gray-700 border-2 px-1 text-white font-inter'>{searchedLevel?.tier}</td>
                        <td className='border-gray-700 border-2 px-1 text-white font-inter'>{searchedLevel?.creators}</td>
                        <td className='border-gray-700 border-2 px-1 text-white font-inter'>{searchedLevel?.length}</td>
                        <td className='border-gray-700 border-2 px-1 text-white font-inter'>{searchedLevel?.skillsets}</td>
                        <td className='border-gray-700 border-2 px-1 text-white font-inter'>{searchedLevel?.enj}</td>
                        <td className='border-gray-700 border-2 px-1 text-white font-inter' height='20'>{searchedLevel.length > 200 ? searchedLevel?.desc : searchedLevel?.desc.substring(0, 200)+'...'}</td>
                     </tr>
                  </tbody>
               </table>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </>
   )
}