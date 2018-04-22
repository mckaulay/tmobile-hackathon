import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../../services'

import { Card, CardTitle, CardText } from 'react-md'

import Visualization from './FreeRoomsByBuilding'

@compose(
  connect(state => ({
    buildings: state.db.buildings,
    screen: state.screen
  })),
  connectRequest(() => api.get('buildings', {
    populate: [{ path: 'rooms', select: 'occupied' }]
  }))
)
class Dashboard extends React.Component {
  static propTypes = {
    buildings: PropTypes.array
  }
  static defaultProps = {
    buildings: []
  }
  render (
    { buildings } = this.props
  ) {
    return (
      <article className='page'>
        <Helmet title='Dashboard' />
        <section>
          <Card className='md-block-centered'>
            <CardTitle title='Room Availability' subtitle='Utilization Per Building' />
            <CardText>
              <Visualization buildings={buildings} />
            </CardText>
          </Card>
        </section>
      </article>
    )
  }
}

export default Dashboard
