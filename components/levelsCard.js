import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function LevelsCard({ tierData, toggle, setToggle }) {
   const cols = [
      { field: 'name', headerName: 'Level Name', headerClassName: 'header', headerAlign: 'center', width: 300 },
      { field: 'creators', headerName: 'Creator(s)', headerClassName: 'header', headerAlign: 'center', width: 200, sortable: false },
      { field: 'length', headerName: 'Length', headerClassName: 'header', headerAlign: 'center', width: 70 },
      { field: 'skillsets', headerName: 'Skillsets', headerClassName: 'header', headerAlign: 'center', width: 200, sortable: false },
      { field: 'enj', headerName: 'Enj.', headerClassName: 'header', headerAlign: 'center', width: 70 },
      { field: 'desc', headerName: 'Description/Notes', headerClassName: 'header', headerAlign: 'center', width: 500 ,  sortable: false }
   ];

   const paginationModel = { page: 0, pageSize: -1 };

   function getRowId(row) {
      return tierData.levels.indexOf(row);
   }
      
   return (
      <>
         <Dialog as='div' className='relative z-40' open={toggle} onClose={() => setToggle(false)}>
               <div className='fixed inset-0 w-full overflow-y-auto'>
                  <div className='flex flex-col min-h-full items-center justify-center'>
                     <DialogPanel transition className='flex lg:items-center lg:justify-center w-screen rounded-2xl lg:px-20 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>        
                        <div className='relative bg-slate-800 rounded-lg'>
                           <DialogTitle className='text-3xl px-4 py-2 font-inter text-center'>{tierData.name}</DialogTitle>
                           <p className='text-xl font-thin text-center mb-2'><span className='text-green-600 font-bold'>{tierData.levelCount}</span> levels</p>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => setToggle(false)} className="absolute size-5 sm:size-10 bg-red-600 hover:bg-red-500 active:bg-red-400 top-1 right-1 sm:top-2 sm:right-2 rounded-lg">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                           </svg>
                           <div className='flex flex-col items-center justify-center'>
                              <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', height: '500px', width:'100%', '& .header': { backgroundColor: 'slategray', color: 'ghostwhite', textWrap: 'wrap' } }}>
                                 <DataGrid rows={tierData.levels} getRowId={getRowId} getRowHeight={() => 'auto'} columns={cols} initialState={{ pagination: { paginationModel }}}  sx={{ width: '100%', border: 0, backgroundColor: 'ghostwhite', color: 'black', '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': { display: 'none' } }} />
                              </Box>
                           </div>
                        </div>
                     </DialogPanel>
                  </div>
               </div>
         </Dialog>
      </>
   )
}