import Document, { Html, Head, Main, NextScript } from "next/document"
import Image from "next/image"
import { FaCircle } from "react-icons/fa"

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en' className='dark' data-theme="dracula">
        <Head />
        <body className='bg-base-500 dark:bg-dark-base-600 overflow-x-hidden relative'>
          <div className="flex justify-center" style={{
            width: '100%',
          }}>
            <FaCircle
              className="h-screen absolute text-base-300 top-0"
              style={{
                marginTop: '-100rem',
                width: '150%',
                height: '150%'
              }} />
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument