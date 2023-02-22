import Head from 'next/head';

import Date from  '../../components/date';
import Layout from  '../../components/layout';
import { getAllPostIds, getPostData } from '../../utils/posts.js'

import utilStyles from '../../styles/utils.module.css';


export default function Post({ postData }) {
  return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            {/* This is called dangerous as it may make you vulnerable to XSS  */}
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}} />
        </article>
    </Layout>
    );
}

export async function getStaticPaths() {
    // Return a list of possible values for id
    const paths = getAllPostIds();
    return {
        paths,  // contains array of known paths 
        fallback: false,  //     false - for any path not returned by getStaticPaths will result in 404 page
    }
}

export async function getStaticProps({ params }){
    // Fetch necessary data for the blog post using params.id
    // getStaticProps's params know the key is named id as it is the value of the filename
    // Have to add await as getPostData uses await 
    const postData = await getPostData(params.id);

    return {
        props: {
            postData
        }
    };
}