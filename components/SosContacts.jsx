import { useEffect, useState, useCallback } from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'

const SosContact = ({contact, index, removeContact}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-5">
      <div className="col-span-3 md:col-span-1">
        <p className="text-sm text-gray-500"><span className={`text-white`}>Name</span> {contact.name}</p>
      </div>

      <div className="col-span-3 md:col-span-1">
        <p className="text-sm text-gray-500"><span className={`text-white`}>Surname</span> {contact.surname}</p>
      </div>

      <div className="col-span-3 md:col-span-1">
        <p className="text-sm text-gray-500"><span className={`text-white`}>Mobile</span> {contact.number}</p>
      </div>

      <div className="col-span-3 md:col-span-1">
        <p className="text-sm text-gray-500"><span className={`text-white`}>Email</span> {contact.email}</p>
      </div>

      <div className="col-span-3 md:col-span-1">
        <button onClick={() => removeContact(index, contact)} className={`bg-red-500 text-sm px-3 py-1 rounded mb-5 mr-3 text-sky-100 float-right`}>Delete</button>
      </div>
    </div>
  )
}

const CreateSosContact = ({addContact}) => {
  const { user } = useUser()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')

  const handleAddContact = async (event) => {
    event.preventDefault()
    addContact({name, surname, number, email})
    setName('')
    setSurname('')
    setNumber('')
    setEmail('')

    try {
      // Get data from the form.
      const data = {
        sub: user.sub,
        name: event.target.name.value,
        surname: event.target.surname.value,
        email: event.target.email.value,
        number: event.target.number.value
      }

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint
      const endpoint = 'http://localhost:5000/api/v1/sos/create'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSONdata,
      }

      const response = await fetch(endpoint, options)

      const result = await response.json()
      console.log(result.data)
    } catch(error) {
      console.log(error)
    }

  }

  return (
    <form onSubmit={handleAddContact}>
      <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-5">
        <div className="col-span-3 md:col-span-1">
          <input
            type={'text'}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="First Name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="col-span-3 md:col-span-1">
          <input
            type={'text'}
            value={surname}
            onChange={e => setSurname(e.target.value)}
            placeholder="Last Name"
            name="surname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="col-span-3 md:col-span-1">
          <input
            type={'text'}
            value={number}
            onChange={e => setNumber(e.target.value)}
            placeholder="Phone"
            name="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="col-span-3 md:col-span-1">
          <input
            type={'text'}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="col-span-3 md:col-span-1">
          <input
            type="submit"
            value="Add Contact"
            className="bg-blue-500 text-sm px-3 py-1 rounded mb-5 mr-3 text-sky-100"
          />
        </div>
      </div>
    </form>
  )
}

const SosContacts = () => {
  const { user } = useUser()
  const { getAccessTokenSilently } = useUser()
  const [contacts, setContacts] = useState()
  const [toggleForm, setToggleForm] = useState(false)

  const addContact = (contact) => {
    setContacts([...contacts, contact])
  }

  const removeContact = async(index, contact) => {
    const newContacts = [...contacts]
    newContacts.splice(index, 1)

    const endpoint = `http://localhost:5000/api/v1/sos/${contact._id}`

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()

    console.log(result)

    setContacts(newContacts)
  }

  const getSOSContacts = async() => {
    // API endpoint
    const endpoint = 'http://localhost:5000/api/v1/sos/'

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()

    console.log(result)

    setContacts(result.data)
  }

  handleUpdateMedical = async(event) => {
    event.preventDefault()


  }

  useEffect(() => {
    !contacts && getSOSContacts()
  }, [contacts])

  return (
    <div className='container'>
      <h2 className='text-slate-300 mb-3 text-lg'>SOS Contacts</h2>
      {contacts && contacts.map(
        function (contact, index) {
          return <SosContact key={index} contact={contact} index={index} removeContact={removeContact} />
        }
      )}
      <div className='mt-5'>
        {toggleForm &&
          <CreateSosContact addContact={addContact} />
        }
      </div>
      <div className='mt-5'>
        <button onClick={() => setToggleForm(!toggleForm)} className={`bg-blue-500 text-sm px-3 py-1 rounded mb-5 mr-3 text-sky-100 float-right`}>{toggleForm ? 'cancel' : 'edit'}</button>
      </div>
    </div>
  )
}

export default SosContacts