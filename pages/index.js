import Tiers from '../components/tiers';
import LevelSearch from '../components/levelSearch';

export default function Home({ nlwData }) {

  return (
    <>
      <div className='flex flex-col justify-center items-center mt-10 sm:mt-0 sm:min-h-screen gap-5 mb-auto'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <h1 className='text-3xl font-inter text-center'>Non-Listworthy Extreme Demons</h1>
          <p className='font-thin text-lg sm:text-lg md:text-xl 2xl:text-xl lg:text-xl text-center'>This website is way to look at the <a className='text-blue-400 hover:underline hover:text-blue-300 active:text-blue-200 duration-200 transition-colors' href='https://docs.google.com/spreadsheets/d/1YxUE2kkvhT2E6AjnkvTf-o8iu_shSLbuFkEFcZOvieA/edit?gid=190861115#gid=190861115' target='_blank' noreferrer='true'>NLW Spreadsheet</a> in a more user friendly experience</p>
          <img src='https://i.imgur.com/fC47uO1.png' className='h-40 w-44 sm:h-56 sm:w-64' />
        </div>
        <div className='flex flex-col justify-center items-center gap-4'>
          <LevelSearch nlwData={nlwData} />
          <Tiers tierData={nlwData} />
        </div>
      </div>
    </>
  )
}


// collect data from other sheets on the NLW