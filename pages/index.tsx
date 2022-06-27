import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link';
import { client } from '../libs/client'

export type Blog = {
  title: string,
  id: number,
  publishedAt: string,
  content: string,
  eyecatch?: {
    url: string,
    height: number,
    width: number
  }
}

const Home: NextPage<{blogs: Blog[]}> = ({ blogs }:{blogs:Blog[]}) => {
  return (
    <div>
      <h1>ねもろぐ</h1>
      <ul>
        {blogs.map((blog: Blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home
