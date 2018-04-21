import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import { Sunburst, LabelSeries, Hint, DiscreteColorLegend } from 'react-vis'
import { statusColors, statusLegend, DIVERGING_COLOR_SCALE } from '../../util/visualization'

import api from '../../services'

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
  render ({ buildings } = this.props) {
    let data = []
    for (let building of buildings) {
      const { name, rooms } = building
      const used = rooms.filter(r => r.occupied === true).length
      const unused = rooms.length - used
      data.push({
        title: name,
        children: [
          { title: 'Used', size: used, color: DIVERGING_COLOR_SCALE[0] },
          { title: 'Unused', size: unused, color: DIVERGING_COLOR_SCALE[1] }
        ]
      })
    }
    console.log(data)
    return (
      <article>
        <Helmet title='Dashboard' />
        <h1>Dashboard</h1>
        <section>
          <h3>Props stringified below</h3>
          <code>{JSON.stringify(this.props)}</code>
        </section>
        <section>
          <Sunburst
            animation={{damping: 20, stiffness: 300}}
            // data={data}
            data={{ title: 'Title', children: data }}
            // colorType='category'
            hideRootNode
            colorType='literal'
            // colorRange={DIVERGING_COLOR_SCALE}
            style={{ stroke: '#fff' }}
            height={300}
            width={350}
          />
        </section>
      </article>
    )
  }
}

export default Dashboard
