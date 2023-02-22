import styles from '../styles/layout.module.css';  // load module 
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Muhammed Qaid';
export const siteTitle = 'Next.js Sample Website';


// home is a boolean passed in
export default function Layout({ children, home }) {
    // give the div a class name matching that in the css file 
    return (
        <div className={styles.container}>
            {/* Adding meta tags (like og:image which are sued to describe page's content) */}
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                name="description"
                content="Learn how to build a personal website using Next.js"
                />
                <meta
                property="og:image"
                content={`https://og-image.vercel.app/${encodeURI(
                    siteTitle,
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                {/* Think this is different if home or not. When not home, no link back home */}
                {home ? (
                <>
                    <Image
                    priority
                    src="/imgs/MonteProfile.JPG"
                    className={utilStyles.borderCircle}
                    height={144}
                    width={144}
                    alt=""
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
                ) : (
                <>
                    <Link href="/">
                    <Image
                        priority
                        src="/imgs/MonteProfile.JPG"
                        className={utilStyles.borderCircle}
                        height={108}
                        width={108}
                        alt=""
                    />
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                    <Link href="/" className={utilStyles.colorInherit}>
                        {name}
                    </Link>
                    </h2>
                </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
        </div>
    );
}