import fs from 'fs';  // This is a Node.js module that lets us read files from file system
import path from 'path';  // Node.js module that lets us manipulate file paths 
import matter from 'gray-matter';  // library which allows us to parse the metadata in a markdown file 
import { remark } from 'remark';  // library for rendering markdown file
import html from 'remark-html';


const postsDirectory = path.join(process.cwd(), 'posts');
const projectsDirectory = path.join(process.cwd(), 'projects');

// The below fetches data from the file system - but we can similarly fetch data from other sources such as an external API endpoint!


export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');
  
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
  
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
  
      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

export function getSortedProjectsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');
  
      // Read markdown file as string
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
  
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
  
      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });
    // Sort posts by date
    return allProjectsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
}
// External API example

// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from an external API endpoint
//   const res = await fetch('..');
//   return res.json();
// }

// Database Query Example

// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...)

// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }


export function getAllPostIds(){
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    // Have to return an array of Objects with each having the params key containing an object with id!
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}


// async as we need to use await for remark - to fetch data asynchronously
  // So also need to update getStaticProps
export async function getPostData(id){
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Combine data with id and contentHtml
  return {
    id, 
    contentHtml,
    ...matterResult.data
  }
}