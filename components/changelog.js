import { useState, useEffect } from 'react';

export default function Changelog({ nlwData, lwData, lw }) {
   const [clPages, setClPages] = useState([]);
   const [page, setPage] = useState(0);

   useEffect(() => {
      let c = 0;
      let page = [];
      let pages = [];
      if (lw) {
         lwData?.changelog?.map((changes, index) => {
            if (c < 8) {
               page.push(changes);
               c += 1;
            } else {
               c = 0;
               pages.push(page);
               page = [];
               page.push(changes);
            }
         });
         pages.push(page);
      } else {
         nlwData?.changelog?.map((changes, index) => {
            if (c < 10) {
               page.push(changes);
               c += 1;
            } else {
               c = 0;
               pages.push(page);
               page = [];
               page.push(changes);
            }
         });
         pages.push(page);
      }

      setClPages([...pages]);
   }, [nlwData, lwData, lw])

   function changePage(type) {
        if (type === 'minus' && page > 0) {
            setPage(page - 1)
        } else if (type === 'plus' && page < clPages.length -1) {
            setPage(page + 1)
        }
   }

   return (
      <div className='flex flex-col items-center justify-center gap-6 h-screen max-h-screen overflow-y-scroll'>
        <div className='flex flex-col items-center justify-center gap-4 h-3/4'>
            <p className='text-3xl font-inter underline underline-offset-2'>Changelog</p>
            <div className='flex flex-col items-center justify-center gap-2'>
                {clPages[page]?.map((changes, index) => (
                <div className='flex flex-col items-center justify-center' key={index}>
                    <p className='font-inter text-indigo-400 text-center'>{changes.date}:</p>
                    <p className='font-inter text-center'>{changes.changes}</p>
                </div>
                ))}
            </div>
        </div>
         <div className='flex gap-4 items-center justify-center h-1/4'>
            <button className={`bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 py-1 px-2 transition-colors duration-200 rounded-lg ${page === 0 ? 'disabled' : 'enabled'}`} onClick={() => changePage('minus')}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg></button>
            <p className=''>Page <span className='font-bold'>{page + 1}</span> of <span className='font-bold'>{clPages.length}</span></p>
            <button className={`bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 py-1 px-2 transition-colors duration-200 rounded-lg ${page === clPages.length ? 'disabled' : 'enabled'}`} onClick={() => changePage('plus')}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg></button>
         </div>
      </div>
   )
}


/*
      <div className='flex flex-col items-center justify-center'>
         <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vThkBDXwv1z3VYWJTTkRd2EswPOBS-70X2yHEzLPo1AmyYWTHbwVFlYuHbeKEVk1CWLgdIgkm0oE7js/pubhtml?widget=true&amp;headers=false" height={500} className='w-full'></iframe>      
      </div>

*/