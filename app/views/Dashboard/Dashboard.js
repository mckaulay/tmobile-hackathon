import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import { Sunburst, LabelSeries, Hint, DiscreteColorLegend } from 'react-vis'
import { statusColors, statusLegend, DIVERGING_COLOR_SCALE } from '../../util/visualization'

import api from '../../services'

const testData = {
 "title": "analytics",
 "color": "#12939A",
 "children": [
  {
   "title": "cluster",
   "children": [
    {"title": "AgglomerativeCluster", "color": "#12939A", "size": 3938},
    {"title": "CommunityStructure", "color": "#12939A", "size": 3812},
    {"title": "HierarchicalCluster", "color": "#12939A", "size": 6714},
    {"title": "MergeEdge", "color": "#12939A", "size": 743}
   ]
  },
  {
   "title": "graph",
   "children": [
    {"title": "BetweennessCentrality", "color": "#12939A", "size": 3534},
    {"title": "LinkDistance", "color": "#12939A", "size": 5731},
    {"title": "MaxFlowMinCut", "color": "#12939A", "size": 7840},
    {"title": "ShortestPaths", "color": "#12939A", "size": 5914},
    {"title": "SpanningTree", "color": "#12939A", "size": 3416}
   ]
  },
  {
   "title": "optimization",
   "children": [
    {"title": "AspectRatioBanker", "color": "#12939A", "size": 7074}
   ]
  }
 ]
}

@compose(
  connect(state => ({
    buildings: state.db.buildings,
    screen: state.screen
  })),
  connectRequest(() => api.get('buildings', {
    populate: ['rooms']
  }))
)
class Dashboard extends React.Component {
  static propTypes = {
    buildings: PropTypes.array
  }
  static defaultProps = {
    buildings: []
  }
  render ({ user, db, config } = this.props) {
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
            // animation={{damping: 20, stiffness: 300}}
            data={testData}
            colorType='category'
            colorRange={DIVERGING_COLOR_SCALE}
            style={{stroke: '#fff'}}
            height={300}
            width={350}
          />
        </section>
      </article>
    )
  }
}

export default Dashboard
