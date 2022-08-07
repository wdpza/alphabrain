import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import { FaCircle } from 'react-icons/fa'

export default function Home({posts, quote}) {
  console.log(posts, quote)
  return (
    <>
      <Head>
        <title>AlphaBrain</title>
        <meta name="description" content="Maybe someday someone somewhere, will see..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero quote={quote} />

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
        {
          posts.map(post => (
            <article key={post.id} className="prose">
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </article>
          ))
        }
        </div>
      </section>
    </>
  )
}

export const getStaticProps = async () => {
  const [postsRes, quoteRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`),
    fetch(`https://api.quotable.io/random?author=mark-twain`)
  ])

  const [posts, quote] = await Promise.all([
    postsRes.json(),
    quoteRes.json()
  ])

  return {
    props: {
      posts,
      quote
    },
    revalidate: 1
  }
}
