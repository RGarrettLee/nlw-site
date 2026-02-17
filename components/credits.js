import Link from "next/link";

export default function Credits() {
    return (
        <div className='flex flex-col items-center content-center gap-6 h-full max-h-full overflow-y-scroll'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <h2 className='text-4xl font-inter'>NLW LIST TEAM</h2>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <p className='font-inter text-3xl text-supremeObserver underline-offset-2 underline'>Supreme Observer</p>
                    <p className='font-inter text-2xl text-purple-400'>Rito</p>
                    <p className='font-inter text-3xl text-divineCouncil underline-offset-2 underline'>The Divine Council</p>
                    <p className='font-inter text-2xl'>Andorra</p>
                    <p className='font-inter text-2xl'>Electroanimator</p>
                    <p className='font-inter text-2xl'>Fawxu</p>
                    <p className='font-inter text-3xl text-observer underline-offset-2 underline'>Observers</p>
                    <p className='font-inter text-2xl'>faucet</p>
                    <p className='font-inter text-2xl text-purple-400'>GALAXXYSS</p>
                    <p className='font-inter text-2xl'>Heco</p>
                    <p className='font-inter text-2xl'>Remithe5</p>
                    <p className='font-inter text-2xl'>vonic</p>
                    <p className='font-inter text-3xl text-sheetEditor underline-offset-2 underline'>Sheet Editors</p>
                    <p className='font-inter text-2xl'>Amber</p>
                    <p className='font-inter text-2xl'>cuin894</p>
                    <p className='font-inter text-2xl'>kgamesync</p>
                    <p className='font-inter text-2xl'>Livyoshi</p>
                    <p className='font-inter text-2xl text-purple-400'>NEBUNYX</p>
                    <p className='font-inter text-2xl'>plimbus</p>
                    <p className='font-inter text-2xl'>SmileBullet</p>
                </div>
                <br />
                <h2 className='text-4xl font-inter text-red-500'>Website Creator</h2>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <Link href='/profile/sidewinder_' className='font-inter text-2xl hover:bg-white/5 px-2 py-1 rounded-lg'>Sidewinder</Link>
                </div>
            </div>
        </div>
    )
}