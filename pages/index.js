import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import { FaCircle } from 'react-icons/fa'

export default function Home({posts}) {
  return (
    <>
      <Head>
        <title>AlphaBrain</title>
        <meta name="description" content="Maybe someday someone somewhere, will see..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
        {posts.map(post => (
          <article key={post.id} className="prose">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </article>
        ))}
        </div>
      </section>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)

  const posts = await res.json()

  return {
    props: {
      posts
    }
  }
}
