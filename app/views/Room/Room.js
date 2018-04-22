import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../../services'

import { Link } from 'react-router'

import { Card, CardTitle, CardText,
  DatePicker,
  Avatar,
  Divider,
  FontIcon,
  List,
  ListItem,
  Subheader
} from 'react-md'

// import get from 'lodash/get'
import moment from 'moment'

const sortDates = (dates) => dates.sort((a, b) =>
  moment(b).format('X') - moment(a).format('X')
)

@compose(
  connect(state => ({
    ...state.db.room
  })),
  connectRequest((props) => api.get('room', {
    id: props.params.id,
    populate: [
      { path: 'building', select: 'name' },
      { path: 'reservations' }
    ]
  }))
)
class Room extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }),
    name: PropTypes.string,
    ['building.name']: PropTypes.string,
    occupied: PropTypes.bool,
    reservations: PropTypes.array
  }
  static defaultProps = {
    name: 'Loading Room...',
    building: { name: '' },
    occupied: false,
    reservations: []
  }
  render ({ name, building, occupied, reservations } = this.props) {

    const sortedReservations = reservations.sort((a, b) =>
      moment(b.time).format('X') - moment(a.time).format('X')
    )

    return (
      <article>
        <Helmet title='Room' />
        <Card className='md-block-centered'>
          <CardTitle title={`Room: ${name}`} subtitle={`In ${building.name}`} />
          <div className='md-grid'>
            <DatePicker
              defaultValue={new Date()}
              label='Select a Date'
              className='md-cell'
            />
          </div>
          <Subheader primaryText='Availability' />
          <List>
            {sortedReservations && sortedReservations.map((reservation, i) => (
              <ListItem key={i}
                leftAvatar={<Avatar
                  icon={<h2 className='icon-text--raw'>
                    {moment(reservation.time).format('LT').split(':')[0]}
                  </h2>}
                  suffix={reservation.occupied ? 'amber' : 'light-green'}
                />}
                primaryText={`
                  ${moment(reservation.time).format('LT')}
                  ${' - '}
                  ${moment(reservation.time).add(reservation.duration, 'hours').format('LT')}
                `}
                secondaryText={`${reservation.duration * 60} Minutes`}
              />
            ))}
          </List>
        </Card>
      </article>
    )
  }
}

export default Room
