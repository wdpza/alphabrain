export default function Confirm() {
  return (
    <>
      <form action="/api/confirm" method="post">
        <fieldset className='rounded-md bg-base-300 p-3 mb-5'>
          <legend className='text-secondary'>Personal Details</legend>

          <div className="mb-4">
            <input
              type={'text'}
              name={'name'}
              id={'name'}
              className="bg-neutral border-base-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='First Name'
            />
          </div>

          <div className="mb-4">
            <input
              type={'text'}
              name={'name'}
              id={'name'}
              className="bg-neutral border-base-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Last Name'
            />
          </div>

          <div className="mb-4">
            <input
              type={'email'}
              name={'email'}
              id={'email'}
              className="bg-neutral border-base-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <input
              type={'number'}
              name={'phone'}
              id={'phone'}
              className="bg-neutral border-base-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Phone"
            />
          </div>
        </fieldset>

        <fieldset className='rounded-md bg-base-300 p-3'>
          <legend className='text-secondary'>SOS Contacts</legend>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type={'text'}
              name={'title'}
              id={'title'}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </fieldset>

        <fieldset className='rounded-md bg-base-300 p-3 mb-5'>
          <legend className='text-secondary'>Medical Details</legend>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type={'text'}
              name={'title'}
              id={'title'}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </fieldset>

        <div className="flex items-center justify-center mb-8">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  )
}

