import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

@connect(state => ({
  user: state.user,
  db: state.db,
  config: state.config
}))
class Dashboard extends React.Component {
  static propTypes = {}
  render ({ user, db, config } = this.props) {
    return (
      <article>
        <Helmet title='Dashboard' />
        <h1>Dashboard</h1>
        <section>
          <h3>Props stringified below</h3>
          <code>{JSON.stringify(this.props)}</code>
        </section>
      </article>
    )
  }
}

export default Dashboard
