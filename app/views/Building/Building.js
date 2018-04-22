import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../../services'

import { Link } from 'react-router'

import { Card, CardTitle, Avatar, List, ListItem, Subheader } from 'react-md'

import moment from 'moment'

@compose(
  connect(state => ({
    screen: state.screen,
    ...state.db.building
  })),
  connectRequest((props) => api.get('building', {
    query: { slug: props.params.slug },
    populate: [
      { path: 'rooms', populate: [{ path: 'reservations', limit: 1 }] }
    ],
    force: true
  }))
)
class Building extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    }),
    name: PropTypes.string,
    location: PropTypes.string,
    rooms: PropTypes.array,
    forceRequest: PropTypes.func
  }
  static defaultProps = {
    name: 'Loading...',
    location: 'Fetching Office Data',
    rooms: []
  }
  componentDidMount () {
    setInterval(() => this.props.forceRequest(), 2000)
  }
  render ({ name, location, rooms } = this.props) {
    return (
      <article>
        <Helmet title='Building' />
        <Card className='md-block-centered'>
          <CardTitle title={name} subtitle={`${location} Office`} />
          <Subheader primaryText='Conference Rooms' />
          <List>
            {rooms && rooms.map((room, i) => (
              <Link key={i} to={`/room/${room._id}`}>
                <ListItem
                  leftAvatar={<Avatar
                    icon={<h2 className='icon-text--raw'>{room.floor || 'G'}</h2>}
                    suffix={room.occupied ? 'amber' : 'light-green'}
                  />}
                  primaryText={room.name}
                  secondaryText={`Available until ${moment(room.reservations[0]).fromNow()}`}
                />
              </Link>
            ))}
          </List>
        </Card>
      </article>
    )
  }
}

export default Building
