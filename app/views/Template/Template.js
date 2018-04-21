import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router'

import Helmet from 'react-helmet'
import favicon from '../../images/favicon.ico'
const meta = [
  { charset: 'utf-8' },
  // Meta descriptions are commonly used on search engine result pages to
  // display preview snippets for a given page.
  { name: 'T-Mobile Boilerplate', content: 'A T-Mobile webapp' },
  // Setting IE=edge tells Internet Explorer to use the latest engine to
  //  render the page and execute Javascript
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  // Using the viewport tag allows you to control the width and scaling of
  // the browser's viewport:
  // - include width=device-width to match the screen's width in
  // device-independent pixels
  // - include initial-scale=1 to establish 1:1 relationship between css pixels
  // and device-independent pixels
  // - ensure your page is accessible by not disabling user scaling.
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  // Disable tap highlight on IE
  { name: 'msapplication-tap-highlight', content: 'no' },
  // Add to homescreen for Chrome on Android
  { name: 'mobile-web-app-capable', content: 'yes' },
  // Add to homescreen for Safari on IOS
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
  { name: 'apple-mobile-web-app-title', content: 'T-Mobile Boilerplate' }
]
// Add to homescreen for Chrome on Android
const link = [{ rel: 'icon', href: favicon }]

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import FontIcon from 'react-md/lib/FontIcons'

import { endSession } from '../../services/authentication'
import { environment } from '../../services/'
const { ENV } = environment

import { Button } from 'react-md'

// import mobileLogo from '../../images/mobileLogo.png'
// import desktopLogo from '../../images/desktopLogo.png'

@connect(
  state => ({
    screen: state.screen,
    user: state.user
  }),
  dispatch => ({ signOut: bindActionCreators(endSession, dispatch) })
)
class Template extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object,
    screen: PropTypes.object,
    user: PropTypes.object,
    signOut: PropTypes.func
  }
  render (
    { children, router, screen, user, signOut } = this.props
  ) {
    // React-router is separated from redux store - too heavy to persist.
    const navItems = [{
      primaryText: 'Dashboard',
      leftIcon: <FontIcon>home</FontIcon>,
      component: Link,
      to: '/'
    },
    { divider: true },
    { primaryText: 'Factoria', subheader: true },
    {
      primaryText: 'Newport Tower',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP-Tower'
    }, {
      primaryText: 'Newport 2',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP-2'
    }, {
      primaryText: 'Newport Terrace',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP-Terrace'
    }, {
      primaryText: 'Newport 4',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP-4'
    }, {
      primaryText: 'Newport 5',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP-5'
    },
    { divider: true },
    { primaryText: 'Bothell', subheader: true },
    {
      primaryText: 'Canyon Pointe North',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/CP-N'
    }, {
      primaryText: 'Canyon Pointe South',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/CP-S'
    },
    { divider: true },
    { primaryText: 'Snoqualmie', subheader: true },
    {
      primaryText: 'Snoqualmie',
      secondaryText: '34931 SE Douglas St',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/SNO'
    }]
    return (
      <div>
        <Helmet
          titleTemplate='%s - T-Mobile'
          meta={meta} link={link}
        />
        <NavigationDrawer
          drawerTitle={user.authenticated
            ? <span>{user.tmobileid}</span>
            : <a href={ENV === 'production' ? '/auth/tmoid' : '/auth/google'}>Log In</a>
          }
          toolbarTitle={'Conference Dashboard'}
          contentClassName='main-content'
          navItems={navItems}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
          toolbarActions={!user.authenticated
            ? <Button flat secondary iconChildren='input'
              href={ENV === 'production' ? '/auth/tmoid' : '/auth/google'}
            >
              Log In
            </Button>
            : <Button flat secondary iconChildren='verified_user'
              onClick={signOut}
            >
              {user.tmobileid}
            </Button>
          }
          // toolbarActions={<ToolbarActions config={config} />}
        >
          <div className='main-container'>
            {children}
          </div>
        </NavigationDrawer>
      </div>
    )
  }
}

export default Template
