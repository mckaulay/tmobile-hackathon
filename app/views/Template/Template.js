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
      to: '/dashboard'
    },
    { divider: true },
    { primaryText: 'Factoria', subheader: true },
    {
      primaryText: 'Newport Tower',
      secondaryText: ' 3650 131st Ave SE',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP'
    }, {
      primaryText: 'Newport 2',
      secondaryText: ' 3625 132nd Avenue SE',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP2'
    }, {
      primaryText: 'Newport Terrace',
      secondaryText: '3617 131st Ave SE',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NPT'
    }, {
      primaryText: 'Newport 4',
      secondaryText: ' 3655 131st Ave SE',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP4'
    }, {
      primaryText: 'Newport 5',
      secondaryText: '12920 SE 38th St',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/NP5'
    },
    { divider: true },
    { primaryText: 'Bothell', subheader: true },
    {
      primaryText: 'Canyon Pointe North',
      secondaryText: '22213 30th Dr SE',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/CPN'
    }, {
      primaryText: 'Canyon Pointe South',
      secondaryText: '22309 30th Dr SE',
      leftIcon: <FontIcon>location_city</FontIcon>,
      component: Link,
      to: '/building/CPS'
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
          titleTemplate='%s - T-Mobile CC'
          meta={meta} link={link}
        />
        <NavigationDrawer
          drawerTitle='Navigation'
          toolbarTitle={'Conference Check'}
          contentClassName='main-content'
          navItems={navItems}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
          toolbarActions={!user.authenticated
            ? <Button flat secondary iconChildren='input'
              href={ENV === 'production' ? '/auth/google' : '/auth/google'}
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
