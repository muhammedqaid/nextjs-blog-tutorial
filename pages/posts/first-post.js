import Link from 'next/link';
import Head from 'next/head';  
import Script from 'next/script';  // Optimses when scripts aee fetched and executed 

import Layout from '../../components/layout';


export default function FirstPost() {
  return (
    <Layout>
        <Head>
            <title>First Post</title>
            {/* <script src="https://connect.facebook.net/en_US/sdk.js"></script> */}
            <Script
                scr="https://connect.facebook.net/en_US/sdk.js"
                strategy='lazyOnload' //when to load
                onLoad={() =>
                    console.log('script loaded correctly, window.FB has been populated')
                } // What to do immediately after script finished loaded 
            />
        </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">Back to home</Link>
        </h2>
    </Layout>
  );
}