import { useState, useEffect } from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Head from 'next/head'
import QRCode from 'react-qr-code'
import SosContacts from '../components/SosContacts'

import { BsFillSquareFill } from 'react-icons/bs'

import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function ProfileImage({user}) {
  return (
    <div className="w-24 rounded-full">
      <Image
        src={user?.picture || ''}
        alt="Picture of the author"
        width={96}
        height={96}
        className='rounded-full'
      />
    </div>
  )
}

const getSOSContacts = async(req, res) => {
  try {
    console.log(req)
  } catch(error) {
    console.log(error)
  }
}

function Profile() {
  const { user } = useUser()
  const [state, setState] = useState({ isLoading: false, response: undefined, error: undefined })

  const getUser = async () => {
    setState({ isLoading: true, response: undefined, error: undefined })
    try {
      const apiPort = process.env.API_PORT || 5000
      const response = await fetch(`https://qr-server-epr.herokuapp.com/api/v1/users/sub/${user.sub}`)
      const data = await response.json()

      setState({ isLoading: false, response: data, error: undefined })
    } catch (error) {
      setState({ isLoading: false, response: undefined, error: error })
    }
  }

  const { isLoading, response, error } = state

  useEffect(() => {
    getUser()
    {response && console.log(response)}

    return () => {
      console.log(user)
    }
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Head>
            <title>Profile</title>
            <meta name="description" content="Profile" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {response && console.log(response)}
          <div className="z-10 hero-wrapper pb-20">
            <div className="container hero-content mx-auto flex-col">

              <ProfileImage user={user} />

              {response && (
              <h1 className='text-base-500 text-lg font-light mt-5 antialiased'>
                <span className='dark:text-dark-secondary-500 mt-10'>{response.data.name} {response.data.surname}</span>
              </h1>
              )}

              <div className="flex flex-row justify-center items-center">
                <div className="text-primary text-1xl p-3"><BsFillSquareFill /></div>
                <div className="text-secondary text-1xl p-3"><BsFillSquareFill /></div>
                <div className="text-accent text-1xl p-3"><BsFillSquareFill /></div>
                <div className="text-neutral text-1xl p-3"><BsFillSquareFill /></div>
              </div>

              { /* todo: move to components/card */ }
              <div className="card w-96 bg-base-300">
                <div className="card-body items-left text-center">
                  { /* edit button */ }
                  <div className="flex flex-row justify-end items-center w-full mb-3">
                    <button className='btn btn-neutral btn-xs rounded-sm'>edit</button>
                  </div>
                  {response && response.success && (
                    <>
                      { /* user.name */ }
                      <div className="flex flex-row justify-center items-center w-full">
                        <span className="flex-grow text-left">Name</span>
                        <span className="flex-grow text-right text-secondary">{response.data.name}</span>
                      </div>

                      { /* user.email */ }
                      <div className="flex flex-row justify-center items-center w-full">
                        <span className="flex-grow text-left">Email</span>
                        <span className="flex-grow text-right text-secondary">{response.data.email}</span>
                      </div>

                      { /* user.phone */ }
                      <div className="flex flex-row justify-center items-center w-full">
                        <span className="flex-grow text-left">Phone</span>
                        <span className="flex-grow text-right text-secondary">{response.data.phone}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              { /* SOS Contacts */ }
              <h2 className="card-title font-light text-lg text-base-500 mt-8">SOS Contacts</h2>
              {response && (
                <SosContacts user={response.data} />
              )}
              <div className="card w-96 bg-base-300">
                <div className="card-body items-left text-center">
                  { /* edit button */ }
                  <div className="flex flex-row justify-end items-center w-full">
                    <button className='btn btn-xs btn-neutral rounded-sm px-3'>+ add</button>
                  </div>
                  {response && response.success && (
                    <>
                    {response.data.sosContacts.map((contact, index) => (
                      <div key={index}>
                        { console.log(`name-${index}`) }
                        <div key={`name-${index}`} className='flex flex-row font-semibold justify-start text-base-500'>
                          { contact.firstName } { contact.lastName }
                        </div>
                        <div key={`details-${index}`} className="flex flex-col justify-start items-start w-full text-secondary">
                          <span className="flex-grow text-left">{contact.email}</span>
                          <span className="flex-grow text-right">{contact.phone}</span>
                        </div>
                      </div>
                    ))}
                    { /* edit button */ }
                    <div className="flex flex-row justify-end items-center w-full mt-8">
                      <button className='btn btn-xs px-1 btn-error rounded-sm'>delete</button>
                    </div>
                    </>
                  )}
                </div>
              </div>

              { /* Medical Details */ }
              <h2 className="card-title font-light text-lg mt-8">Medical Details</h2>
              <div className="card w-96 bg-base-300">
                <div className="card-body items-left text-center">
                  {response && response.success && (
                    <>
                      { /* user.name */ }
                      <div className="flex flex-row justify-center items-center w-full">
                        <span className="flex-grow text-left">Blood Type</span>
                        <span className="flex-grow text-right text-secondary">{response.data.medicalDetails.bloodType}</span>
                      </div>

                      <div className="flex flex-row justify-center items-center w-full">
                        <span className="flex-grow text-left">Allergies</span>
                        <span className="flex-grow text-right text-secondary">{response.data.medicalDetails.allergies}</span>
                      </div>

                      <div className="flex flex-row justify-center items-center w-full">
                        <span className="flex-grow text-left">Medications</span>
                        <span className="flex-grow text-right text-secondary">{response.data.medicalDetails.medications}</span>
                      </div>

                      <div className="flex flex-row justify-center items-center w-full">
                        <span className="flex-grow text-left">Medical Conditions</span>
                        <span className="flex-grow text-right text-secondary">{response.data.medicalDetails.medicalConditions}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              { /* QR Codes - https://github.com/Bunlong/next-qrcode */ }
              <h2 className="card-title font-light text-lg mt-8">QR Codes</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="qr-code">
                  <QRCode
                    value={'https://www.google.com'}
                    size={90}
                    level={'H'}
                  />
                </div>
                <div className="qr-code">
                  <QRCode
                    value={'https://www.google.com'}
                    size={90}
                    level={'H'}
                  />
                </div>
                <div className="qr-code">
                  <QRCode
                    value={'https://www.google.com'}
                    size={90}
                    level={'H'}
                  />
                </div>
                <div className="qr-code">
                  <QRCode
                    value={'https://www.google.com'}
                    size={90}
                    level={'H'}
                  />
                </div>
                <div className="qr-code">
                  <QRCode
                    value={'https://www.google.com'}
                    size={90}
                    level={'H'}
                  />
                </div>
                <div className="qr-code">
                  <QRCode
                    value={'https://www.google.com'}
                    size={90}
                    level={'H'}
                  />
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  )
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
})