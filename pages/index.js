import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import LevelSubmitDialog from '../components/levelSubmitDialog';
import LevelSearch from '../components/levelSearch';
import Tiers from '../components/tiers';

export default function Home({ nlwData, user }) {
   const [level, setLevel] = useState({});
   const [platformer, setPlatformer] = useState(false);
   const [completionSubmission, setCompletionSubmission] = useState(false);
   const infoMsg = <p className='font-thin text-lg sm:text-lg md:text-xl 2xl:text-xl lg:text-xl text-center'>This website, inspired by the <a href='https://docs.google.com/spreadsheets/d/1YxUE2kkvhT2E6AjnkvTf-o8iu_shSLbuFkEFcZOvieA/edit?gid=190861115#gid=190861115' target='_blank' noreferrer='true' className='font-thin text-lg sm:text-lg md:text-xl 2xl:text-xl lg:text-xl text-center text-blue-400 hover:underline hover:text-blue-300 active:text-blue-200 duration-200 transition-colors'>NLW Spreadsheet</a>, aims to enhance the user experience of the spreadsheet making information easier to find and access. The website allows users to submit records to track progress as well as have a global leaderboard. This website is a token of appreciation for all the work done by the mods maintaining the list for all of us to use. Join the <a href='https://discord.gg/vW88ZFtTY2' target='_blank' noreferrer='true' className='font-thin text-lg sm:text-lg md:text-xl 2xl:text-xl lg:text-xl text-center text-blue-400 hover:underline hover:text-blue-300 active:text-blue-200 duration-200 transition-colors'>Discord server</a> to address issues or be apart of the community</p>
   const colours = {
    'Beginner ': 'text-beginner',
    'Easy ': 'text-easy',
    'Medium ': 'text-medium',
    'Hard ': 'text-hard',
    'Very Hard ': 'text-veryhard',
    'Insane ': 'text-insane',
    'Extreme ': 'text-extreme',
    'Remorseless ': 'text-remorseless',
    'Relentless ': 'text-relentless',
    'Terrifying ': 'text-terrifying',
    'Catastrophic ': 'text-catastrophic',
    'Fuck': 'text-white',
    'Beginner Tier': 'text-beginner',
    'Easy Tier': 'text-easy',
    'Medium Tier': 'text-medium',
    'Hard Tier': 'text-hard',
    'Very Hard Tier': 'text-veryhard',
    'Insane Tier': 'text-insane',
    'Extreme Tier': 'text-extreme',
    'Remorseless Tier': 'text-remorseless',
    'Relentless Tier': 'text-relentless',
    'Terrifying Tier': 'text-terrifying',
    'Catastrophic Tier': 'text-catastrophic',
    'Fuck Tier': 'text-white',
 };
 
  useEffect(() => {}, [nlwData]);

   return (
      <>
        <div className='flex min-h-screen min-w-screen overflow-y-hidden snap-x snap-mandatory justify-center items-stretch backdrop-blur-sm'>
          <div className='flex flex-col px-4 pt-4 pb-8 w-screen justify-stretch flex-shrink-0 snap-center md:w-1/4 overflow-y-scroll max-h-screen gap-2'>
              <div className='flex flex-col items-start gap-2'>
                <div className='flex gap-4 items-end justify-center'>
                  <div className='flex flex-col'>
                    <p className='font-inter'>{platformer ? 'Platformer Levels' : 'Regular Levels'}</p>
                    <Switch
                    checked={platformer}
                    onChange={() => {
                      setPlatformer(!platformer);
                      setLevel({});
                    }}
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
                  <button onClick={() => {
                      let level = {};
                      if (platformer) {
                        let randTier = Math.floor(Math.random() * nlwData?.platformers?.length);
                        let randLevel = Math.floor(Math.random() * nlwData?.platformers[randTier]?.levels.length);
                        level = Object.assign({}, {'tier': nlwData?.platformers[randTier]?.name}, nlwData?.platformers[randTier]?.levels[randLevel]);
                      } else {
                        let randTier = Math.floor(Math.random() * nlwData?.demons?.length);
                        let randLevel = Math.floor(Math.random() * nlwData?.demons[randTier]?.levels.length);
                        level = Object.assign({}, {'tier': nlwData?.demons[randTier]?.name}, nlwData?.demons[randTier]?.levels[randLevel]);
                      }
                      setLevel(level);
                    }} className='bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 rounded-lg px-4 py-1 text-lg font-inter duration-200 transition-colors'>Random Level</button>
                </div>
                <LevelSearch nlwData={nlwData} platformer={platformer} setSearchedLevel={setLevel} />
              </div>
              <div className='flex flex-col pb-10 sm:pb-0'>
                {platformer ? (
                    <Tiers tierData={nlwData.platformers} levels={nlwData.platformers?.levels} setLevel={setLevel} />
                ) : (
                  <>
                    <Tiers tierData={nlwData.demons} level={nlwData.demons?.levels} setLevel={setLevel} />
                  </>
                )}
              </div>
          </div>
          <div className='flex flex-col items-center justify-center flex-shrink-0 snap-center w-screen top-0 md:w-2/4'>
              {Object.keys(level).length > 0 ? (
                <div className='flex flex-col items-center justify-center gap-1 sm:gap-4 w-full'>
                    <p className={`text-4xl font-inter ${colours[level?.tier]}`}>{level?.name}</p>
                    {level?.name !== 'None Yet!' ? (
                      <>
                        <p className='text-lg font-medium text-center underline underline-offset-2 text-indigo-200'><span className='text-xl font-inter text-white'>Creators:</span> {level?.creators}</p>
                        <iframe width='560' height='315' className='block border-none w-[400px] h-[225px] sm:w-[420px] sm:h-[235px] xl:w-[720px] xl:h-[403px]' src={`https://www.youtube.com/embed/${level?.videoID}`} allow='autoplay' allowFullScreen></iframe>
                        <div className='grid grid-cols-3 justify-stretch w-full px-10'>
                          {platformer ? <p className='text-xl font-inter text-center'>Checkp.</p> : <p className='text-xl font-inter text-center'>Length</p>}
                          <p className='text-xl font-inter text-center'>Skillsets</p>
                          <p className='text-xl font-inter text-center'>Enjoyment</p>
                        </div>
                        <div className='grid grid-cols-3 justify-stretch w-full px-10'>
                          {platformer ? <p className='text-lg font-medium text-center text-indigo-200'>{level.checkp}</p> : <p className='text-lg font-medium text-center text-indigo-200'>{level?.length}</p>}
                          <p className='text-lg font-medium text-center text-indigo-200'>{level?.skillsets}</p>
                          <p className='text-lg font-medium text-center text-indigo-200'>{level?.enj}</p>
                        </div>
                        <p className='text-xl font-inter border-t-2 pt-2 w-3/4 text-center border-indigo-500'>Description:</p>
                        <p className='text-center text-md px-4 font-medium text-indigo-200'>{level?.desc}</p>
                        {user?.full_name ? (
                          <button onClick={() => setCompletionSubmission(true)} className='text-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 duration-200 transition-colors px-2 py-1 sm:px-4 sm:py-2 rounded-xl font-inter'>Submit Completion</button>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <LevelSubmitDialog level={level} nlwData={nlwData} platformer={platformer} user={user} toggle={completionSubmission} setToggle={setCompletionSubmission} />
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center w-full gap-4'>
                  {nlwData?.demons ? (
                    <>
                      <p className='font-inter text-3xl'>Find a level to start!</p>
                      <button onClick={() => {
                        let level = {};
                        if (platformer) {
                          let randTier = Math.floor(Math.random() * nlwData?.platformers?.length);
                          let randLevel = Math.floor(Math.random() * nlwData?.platformers[randTier]?.levels.length);
                          level = Object.assign({}, {'tier': nlwData?.platformers[randTier]?.name}, nlwData?.platformers[randTier]?.levels[randLevel]);
                        } else {
                          let randTier = Math.floor(Math.random() * nlwData?.demons?.length);
                          let randLevel = Math.floor(Math.random() * nlwData?.demons[randTier]?.levels.length);
                          level = Object.assign({}, {'tier': nlwData?.demons[randTier]?.name}, nlwData?.demons[randTier]?.levels[randLevel]);
                        }
                        setLevel(level);
                      }} className='bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 rounded-lg px-4 py-1 text-lg font-inter duration-200 transition-colors'>Random Level</button>
                    </>
                  ) : (
                    <p className='font-inter text-3xl'>Loading level data...</p>
                  )}
                </div>
              )}
          </div>
          <div className='flex flex-col items-center justify-center flex-shrink-0 snap-center w-screen overflow-y-scroll px-4 py-6 md:w-1/4 gap-2'>
              {infoMsg}
          </div>
        </div>
    </>
   )
}