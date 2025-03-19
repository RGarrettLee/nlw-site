import { useState, useEffect } from 'react';

export default function GdIconView({ user }) {
   const [oldID, setOldID] = useState(0);
   const [gdInfo, setGdInfo] = useState({});
   const iconSize = 75;

   async function getGdIcons() {
      if (!gdInfo.username && user.gdID > 0) {
         fetch(`https://gdbrowser.com/api/profile/${user.gdID}`)
         .then((response) => response.json())
         .then((result) => {
            setGdInfo(result);
         })
      }
   }

   useEffect(() => {
      getGdIcons();
   }, [gdInfo])

   useEffect(() => {
      setGdInfo({});
      getGdIcons();
   }, [user])

   return (
      <>
         {gdInfo?.username ? (
            <div className='flex gap-4 items-center justify-center bg-indigo-900/30 px-4 py-2 rounded-lg'>
               <img src={`https://gdicon.oat.zone/icon.png?type=cube&value=${gdInfo.icon}&color1=${gdInfo.col1}&color2=${gdInfo.col2}`} width={iconSize} height={iconSize} alt='cube icon' />
               <img src={`https://gdicon.oat.zone/icon.png?type=ship&value=${gdInfo.ship}&color1=${gdInfo.col1}&color2=${gdInfo.col2}`} width={iconSize} height={iconSize} alt='cube icon' />
               <img src={`https://gdicon.oat.zone/icon.png?type=ball&value=${gdInfo.ball}&color1=${gdInfo.col1}&color2=${gdInfo.col2}`} width={iconSize} height={iconSize} alt='cube icon' />
               <img src={`https://gdicon.oat.zone/icon.png?type=ufo&value=${gdInfo.ufo}&color1=${gdInfo.col1}&color2=${gdInfo.col2}`} width={iconSize} height={iconSize} alt='cube icon' />
               <img src={`https://gdicon.oat.zone/icon.png?type=wave&value=${gdInfo.wave}&color1=${gdInfo.col1}&color2=${gdInfo.col2}`} width={iconSize} height={iconSize} alt='cube icon' />
               <img src={`https://gdicon.oat.zone/icon.png?type=robot&value=${gdInfo.robot}&color1=${gdInfo.col1}&color2=${gdInfo.col2}`} width={iconSize} height={iconSize} alt='cube icon' />
               <img src={`https://gdicon.oat.zone/icon.png?type=spider&value=${gdInfo.spider}&color1=${gdInfo.col1}&color2=${gdInfo.col2}`} width={iconSize} height={iconSize} alt='cube icon' />
               <img src={`https://gdicon.oat.zone/icon.png?type=swing&value=${gdInfo.swing}&color1=${gdInfo.col1}&color2=${gdInfo.col2}`} width={iconSize} height={iconSize} alt='cube icon' />
            </div>
         ) : (
            <></>
         )}
      </>
   )
}