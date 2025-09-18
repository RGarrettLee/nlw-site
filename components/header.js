import Link from 'next/link';

export default function Header({ user }) {
   return (
      <>
         <div className='flex py-2 px-5 justify-end sticky top-0 z-10 bg-indigo-700'>
            <div className='flex sm:gap-2 items-center justify-start flex-grow'>
               <Link href='/' className=' hover:text-blue-200 text-sm sm:text-2xl font-inter active:text-blue-100 inline px-2 duration-200 transition-colors'>Extreme Demon Tiers</Link>
               <img src='https://i.imgur.com/fC47uO1.png' className='hidden md:block h-14 w-17' />
            </div>
            <div className='flex items-center justify-center'>
               <Link href='/leaderboard'><li className='hover:text-blue-200 font-inter active:text-blue-100 inline px-2 duration-200 transition-colors'>leaderboard</li></Link>
               {user.admin ? (
                  <Link href='/submissions'><li className='hover:text-blue-200 font-inter active:text-blue-100 inline px-2 duration-200 transition-colors'>submissions</li></Link>
               ) : (
                  <></>
               )}
               {!user.avatar_url ? (
                  <Link href='/login'><li className='hover:text-blue-200 font-inter active:text-blue-100 inline px-2 duration-200 transition-colors'>login</li></Link>
               ) : (
                  <>
                     <Link href='/profile'><li className='hover:text-blue-200 font-inter active:text-blue-100 inline px-2 duration-200 transition-colors'>profile</li></Link>
                     <Link href='/logout'><li className='hover:text-blue-200 font-inter active:text-blue-100 inline px-2 duration-200 transition-colors'>logout</li></Link>
                  </>
               )}
            </div>
         </div>
      </>
   )
}