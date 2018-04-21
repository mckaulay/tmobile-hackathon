import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

@connect(state => ({
  user: state.user,
  db: state.db,
  config: state.config
}))
class Building extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired
  }
  render ({ user, db, config } = this.props) {
    return (
      <article>
        <Helmet title='Building' />
        <h1>Building Page</h1>
        <section>
          <h3>Props stringified below</h3>
          <code>{JSON.stringify(this.props)}</code>
        </section>
      </article>
    )
  }
}

export default Building
