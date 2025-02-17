import Link from 'next/link';

export default function Header({ user }) {
   return (
      <>
         <div className='flex justify-end mt-5 px-5 sticky top-0'>
            <ul className='list-none inline'>
               <Link href='/'><li className='hover:text-blue-200 font-inter active:text-blue-100 inline px-2 duration-200 transition-colors'>tiers</li></Link>
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
            </ul>
         </div>
      </>
   )
}