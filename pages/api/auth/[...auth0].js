import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

const getLoginState = (req, loginOptions) => {
  return {
      returnTo: req.headers.referer
  }
}

export default handleAuth({
  async login(req, res) {
    console.log('login')
    try {
      await handleLogin(req, res, { getLoginState })
    }
    catch (error) {
      res.status(error.status || 400).end(error.message)
    }
  }
})