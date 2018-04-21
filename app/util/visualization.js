/*
COLORS
*/
export const statusColors = {
  Free: '#4caf50',
  Reserved: '#6ec6ff',
  Occupied: '#ff7961'
}
const locationColors = {
  Factoria: '#e20074',  //  '#ff009f',
  Bothell: '#5a5a5a',
  Snoqualmie: '#999B9E'
}
export const DIVERGING_COLOR_SCALE = ['#00939C', '#85C4C8', '#EC9370', '#C22E00']

/*
LEGENDS
*/
export const locationLegend = [
  { title: 'Factoria', color: locationColors.Factoria },
  { title: 'Bothell', color: locationColors.Bothell },
  { title: 'Snoqualmie', color: locationColors.Snoqualmie }
]

/*
Top Level Export
*/
export default {
  statusColors,
  locationColors,
  DIVERGING_COLOR_SCALE,
  locationLegend
}
