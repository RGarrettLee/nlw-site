import { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Switch } from '@headlessui/react';
import LevelSearch from '../components/levelSearch';

export default function Home({ nlwData, user }) {
   const [level, setLevel] = useState({});
   const [platformer, setPlatformer] = useState(false);
   const infoMsg = <p className='font-thin text-lg sm:text-lg md:text-xl 2xl:text-xl lg:text-xl text-center'>This website, inspired by the NLW spreadsheet, aims to enhance the user experience of the spreadsheet making information easier to find and access. The website allows users to submit records to track progress as well as have a global leaderboard. This website is a token of appreciation for all the work done by the mods maintaining the list for all of us to use. Join the <a href='https://discord.gg/vW88ZFtTY2' target='_blank' noreferrer='true' className='font-thin text-lg sm:text-lg md:text-xl 2xl:text-xl lg:text-xl text-center text-blue-400 hover:underline hover:text-blue-300 active:text-blue-200 duration-200 transition-colors'>Discord server</a> to address issues or be apart of the community</p>

   return (
      <>
        <div className='flex min-h-screen min-w-screen overflow-y-hidden snap-x snap-mandatory justify-center items-stretch backdrop-blur-sm'>
          <div className='flex flex-col px-4 pt-4 w-screen justify-stretch flex-shrink-0 snap-center md:w-1/4 overflow-y-scroll max-h-screen gap-2'>
              <div className='flex flex-col items-start gap-2'>
                <div className='flex flex-col'>
                    <p className='font-inter'>{platformer ? 'Platformer Levels' : 'Regular Levels'}</p>
                    <Switch
                    checked={platformer}
                    onChange={setPlatformer}
                    className={`${platformer ? 'bg-indigo-700' : 'bg-indigo-500'}
                      relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                    >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${platformer ? 'translate-x-9' : 'translate-x-0'}
                          pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                    </Switch>
                </div>
                <LevelSearch nlwData={nlwData} setSearchedLevel={setLevel} />
              </div>
              <div className='flex flex-col pb-10 sm:pb-0'>
                {nlwData.map((tier, key) => (
                    <Disclosure key={key} as='div' className='py-2' defaultOpen={false}>
                      { ({ open }) => (
                        <>
                          <DisclosureButton className='group flex bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 rounded-lg w-fit px-4 py-1 duration-200 transition-colors items-center justify-between gap-1'>
                            <span className='text-xl font-inter text-white group-data-[hover]:text-white/80'>{tier.name}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${open ? '' : 'rotate-180 transform'} duration-200 transition-transform`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                              </svg>
                          </DisclosureButton>
                          <DisclosurePanel className='mt-2 text-sm/5 text-white gap-1'>
                              {tier.levels.map((level, index) => (
                                <button onClick={() => setLevel(level)} key={index} className='text-lg m-0.5 text-start font-inter hover:bg-indigo-600 active:bg-indigo-500 focus:bg-purple-900 duration-200 transition-colors rounded-lg w-fit px-4 py-2'>{level.name}</button>
                              ))}
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                ))}
              </div>
          </div>
          <div className='flex flex-col items-center justify-center flex-shrink-0 snap-center w-screen md:w-2/4'>
              {Object.keys(level).length > 0 ? (
                <div className='flex flex-col items-center justify-center gap-4 w-full'>
                    <p className='text-4xl font-inter'>{level?.name}</p>
                    <p className='text-lg font-medium text-center underline underline-offset-2 text-indigo-200'><span className='text-xl font-inter text-white'>Creators:</span> {level?.creators}</p>
                    {level?.tier ? (
                      <p className='text-xl font-inter text-indigo-200'>{level.tier}</p>
                    ) : (
                      <></>
                    )}
                    <div className='grid grid-cols-3 justify-stretch w-full px-10'>
                          <p className='text-xl font-inter text-center'>Length:</p>
                          <p className='text-xl font-inter text-center'>Skillsets:</p>
                          <p className='text-xl font-inter text-center'>Enjoyment:</p>
                      </div>
                    <div className='grid grid-cols-3 justify-stretch w-full px-10'>
                      <p className='text-lg font-medium text-center text-indigo-200'>{level?.length}</p>
                      <p className='text-lg font-medium text-center text-indigo-200'>{level?.skillsets}</p>
                      <p className='text-lg font-medium text-center text-indigo-200'>{level?.enj}</p>
                    </div>
                    <p className='text-xl font-inter border-t-2 pt-2 w-3/4 text-center border-indigo-500'>Description:</p>
                    <p className='text-center text-md px-4 font-medium text-indigo-200'>{level?.desc}</p>
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center w-full gap-4'>
                    <p className='font-inter text-3xl'>Find a level to start!</p>
                    <button onClick={() => {
                      let randTier = Math.floor(Math.random() * nlwData.length - 1);
                      let randLevel = Math.floor(Math.random() * nlwData[randTier].levels.length - 1);

                      let level = Object.assign({}, {'tier': nlwData[randTier].name}, nlwData[randTier].levels[randLevel]);

                      setLevel(level);
                    }} className='bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 rounded-lg px-4 py-1 text-lg font-inter duration-200 transition-colors'>Random Level</button>
                </div>
              )}
          </div>
          <div className='flex flex-col items-center justify-center flex-shrink-0 snap-center w-screen px-4 md:w-1/4 gap-2'>
              {infoMsg}
          </div>
        </div>
    </>
   )
}

/*{levels.map((level, key) => (
   <button key={key} className='text-lg text-start font-inter hover:bg-indigo-600 active:bg-indigo-500 focus:bg-indigo-600 duration-200 transition-colors rounded-lg w-fit px-4 py-2'>{level.name}</button>
))}*/