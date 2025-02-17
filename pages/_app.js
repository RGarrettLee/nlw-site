import '@/styles/globals.css'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '../components/header';
import supabase from '../db/connection';

export default function App({ Component, pageProps }) {
  const [nlwData, setNlwData] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function getData() {
      await supabase.from('NLW').select('name, desc, levelCount, levels')
      .then((result) => {
        setNlwData([...result['data']]);
      })
    }

    
    async function getUsers() {
      await supabase.from('profiles').select('full_name, avatar_url, completions, gd_username')
      .then((result) => {
          setUsers([...result.data]);
      })
    }
    
    async function getUser() {
      let auth = {};
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          auth = value.data.user;
        }
      });

      if (auth !== {}) {
        await supabase.from('profiles').select('id, full_name, admin, completions, gd_username, avatar_url')
          .then((result) => {
            result.data.map((user) => {
              if (user.id === auth.id) {
                setUser(user);
              }
            })
          })
      }
    }

    getUser();
    getData();
    getUsers();
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Non-Listworthy Extreme Demons</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
        <meta name='description' content='A website based on the NLW spreadsheet to make an easier user experience'/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='keywords' content='NLW, NLW Spreadsheet, extreme demons, geometry dash demon list, gd demon list, extreme demon list, extreme list, non listworthy demons, not listworthy demons, non-listworthy demons, non listworthy extreme demons, not listworthy extreme demons, non-listworthy extreme demons, non-listworthy extreme demon spreadsheet' />
        <meta name='twitter:image' content='https://static.wikia.nocookie.net/geometry-dash-unofficial/images/3/36/Extreme_Demon.png/revision/latest?cb=20180214082927'/>   
      </Head>
      <Header user={user} />
      <Component {...pageProps} nlwData={nlwData} users={users} user={user} />
    </div>
  )
}
