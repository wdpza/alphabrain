import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import { FaCircle } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Head>
        <title>AlphaBrain</title>
        <meta name="description" content="Maybe someday someone somewhere, will see..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />

      <div className="z-10 hero-wrapper pb-20">
        <h1 className=''>Hero title to go here</h1>
      </div>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">

        </div>
      </section>
    </>
  )
}