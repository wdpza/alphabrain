import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import QRCode from 'react-qr-code'

import SignUp from '../../components/SignUp'
import Confirm from '../../components/Confirm'

const Signup = ({uid}) => {
  return <SignUp />
}

const SOSform = ({qr, uid}) => {
  return <p>SOSform: {uid}</p>
}

const QR = ({uid, qr}) => {
  const { user, isAuthenticated } = useUser()
  const [href, setHref] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  function getStatus ({data}) {
    if(data.isConfirmed === true) {
      setConfirmed(true)
    }
  }

  useEffect(() => {
    setHref(window.location.href)
    getStatus(qr)

    return () => {
    }
  }, [])

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {href && <QRCode value={href} size={180} />}
          {confirmed && (
            <>confirmed</>
          )}
          {!confirmed && (
            <>
              {!user && (
                <>
                  <div className="mt-8">
                    <div className='alert alert-info mb-5'>
                      Please signup to activate this QR Code
                    </div>
                    <div className='flex justify-center'>
                        <Signup />
                    </div>
                  </div>
                </>
              )}

              {user && (
                <>
                  <div className="mt-8 container">
                    <div className='alert alert-info mb-5'>
                      Please confirm your QR code details
                    </div>
                    <div className=''>
                      <Confirm />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default QR

export async function getServerSideProps(context) {
  const { uid } = context.query

  const [qrRes] = await Promise.all([
    fetch(`${process.env.API_BASE_URL}/api/v1/qr/uid/${uid}`),
  ])

  const [qr] = await Promise.all([
    qrRes.json(),
  ])

  return {
    props: {
      uid,
      qr
    }
  }
}