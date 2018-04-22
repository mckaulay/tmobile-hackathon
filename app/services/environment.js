/*
ENVIRONMENT CONFIG FOR CLIENT
The client side is walled off from the filesystem,
meaning it cannot parse files with 'config'. As a solution,
this JS file will provide the requisite config data.
This is actually a good thing, thus config can't be hijacked for
API keys and security files.
*/
const ENV = process.env.NODE_ENV
const version = process.env.VERSION || 'v1'
const API = ENV === 'production'
  ? 'https://206.189.175.97/'
  : 'http://localhost:3000'
const identityProvider = ENV === 'production'
  ? '/auth/google'
  : '/auth/google'
const identityType = ENV === 'production'
  ? 'T-Mobile ID'
  : 'Mock ID'
export { ENV, version, API, identityProvider, identityType }
export default { ENV, version, API, identityProvider, identityType }
