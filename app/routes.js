import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { environment } from './services'
const { ENV } = environment

import Template from './views/Template/Template'
/*
CODE SPLITTING:
This weird hackery is the most clean way to split components into different JS
files that are loaded async. Router does not officially support this.
Please note, migration to v4 is a BREAKING change.
https://github.com/reactGo/reactGo/pull/841/files
*/
const SplitFrontPage = (l, c) => require.ensure([], () => c(null, require('./views/FrontPage/FrontPage').default))
const SplitNotFound = (l, c) => require.ensure([], () => c(null, require('./views/NotFound/NotFound').default))

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const loginRoute = ENV === 'production' ? '/login' : '/auth/google'
  const requireAuth = (nextState, replace, callback) => {
    const { user } = store.getState()
    const authenticated = user.authenticated || false
    if (typeof window === 'object' && !authenticated) {
      try {
        window.location = loginRoute
      } catch (err) {
        console.error(err)
      }
      replace({ state: { nextPathname: nextState.location.pathname } })
    }
    callback()
  }
  /*
  BUG: UWShib is redirecting many users to /login/undefined after successful auth.
  This is a client (thus server because SSR) sided redirect to address the issue as I find the root cause.
  */
  const LoginCallbackRoute = () => <div>Redirecting...</div>
  const loginCallbackPatch = (nextState, replace, callback) => {
    if (typeof window === 'object') {
      try {
        window.location = '/'
      } catch (err) {
        console.error(err)
      }
      replace({ state: { nextPathname: nextState.location.pathname } })
    }
    callback()
  }

  return (
    <Route path='/' component={Template} >
      <IndexRoute getComponent={SplitFrontPage} />

      {/* <Route path='/faq' getComponent={SplitFAQ} />
      <Route path='/members' getComponent={SplitMembers} />
      <Route path='/about' getComponent={SplitMembers} />
      <Route path='/contact' getComponent={SplitContactUs} />

      <Route path='/proposals' getComponent={SplitProposals} />
      <Route path='/proposals/:year/:number' getComponent={SplitProposal} />
      <Route path='/blocks' getComponent={SplitBlocks} />
      <Route path='/blocks/:number' getComponent={SplitBlock} />

      <Route path='/create' onEnter={requireAuth} getComponent={SplitCreate} />
      <Route path='/edit/:id' onEnter={requireAuth} getComponent={SplitEdit} />
      <Route path='/dashboard' onEnter={requireSTF} getComponent={SplitDashboard} />
      <Route path='/voting' onEnter={requireSTF} getComponent={SplitVoting} />
      <Route path='/docket' onEnter={requireAdmin} getComponent={SplitDocket} />
      <Route path='/config' onEnter={requireAdmin} getComponent={SplitConfig} />

      <Route path='/login/:redirect' onEnter={loginCallbackPatch} component={LoginCallbackRoute} /> */}

      <Route path='*' getComponent={SplitNotFound} />
    </Route>
  )
}
