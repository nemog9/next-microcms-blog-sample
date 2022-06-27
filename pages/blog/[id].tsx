import { client } from "../../libs/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { Blog } from "../index";
import { format } from "date-fns";
import Image from "next/image";
import cheerio from "cheerio";
import hljs from "highlight.js";
import Link from "next/link";

type PathParams = {
  id: string
}

export default function BlogId({ blog, highlightedBody }:{ blog:Blog; highlightedBody:any }) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>投稿日：{format(new Date(blog.publishedAt), 'yyyy-MM-dd')}</p>
      {blog.eyecatch && <Image src={blog.eyecatch?.url} height={blog.eyecatch?.height} width={blog.eyecatch?.width}
      objectFit='contain' alt='アイキャッチ' />}
      <div dangerouslySetInnerHTML={{__html: highlightedBody}} />
      <Link href="/">
        <a>ホームに戻る</a>
      </Link>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const data = await client.get({endpoint: "blogs"});

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as PathParams;
  const blog:Blog = await client.get({ endpoint: "blogs", contentId: id });

  const $ = cheerio.load(blog.content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props: {
      blog,
      highlightedBody:$.html()
    }
  };
}
