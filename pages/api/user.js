import { useUser, getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function user(req, res) {
  const { user } = await getAccessToken(req, res)

  console.log(user)

  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['read:user']
    })

    const apiPort = process.env.API_PORT || 5000

    const response = await fetch(`http://localhost:${apiPort}/api/v1/users/sub/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const user = await response.json()

    res.status(200).json(user)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message })
  }
})