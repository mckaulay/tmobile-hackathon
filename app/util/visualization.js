/*
COLORS
*/
export const statusColors = {
  'Withdrawn': '#d3d3d3',
  'Draft': '#BBDEFB',
  'Submitted': '#8eacbb',
  'In Review': '#6ec6ff',
  'Awaiting Decision': '#2196f3',
  'Partially Funded': '#80e27e',
  'Funded': '#4caf50',
  'Denied': '#ff7961'
}
export const quarterColors = {
  'Autumn': '#bf360c',
  'Winter': '#01579b',
  'Spring': '#1b5e20',
  'Blocks / Special Projects': '#4b2e83',
  'Remaining Funding': '#d3d3d3'
}
export const brandColors = {
  'Purple': '#4b2e83',
  'Gold': '#b7a57a',
  'Metallic Gold': '#85754d',
  'Light Gray': '#d9d9d9',
  'Dark Gray': '#444444'
}
export const DIVERGING_COLOR_SCALE = ['#00939C', '#85C4C8', '#EC9370', '#C22E00']

/*
LEGENDS
*/
export const statusLegend = [
  { title: 'Withdrawn', color: statusColors['Withdrawn'] },
  { title: 'Draft', color: statusColors['Draft'] },
  { title: 'Submitted', color: statusColors['Submitted'] },
  { title: 'In Review', color: statusColors['In Review'] },
  { title: 'Awaiting Decision', color: statusColors['Awaiting Decision'] },
  { title: 'Partially Funded', color: statusColors['Partially Funded'] },
  { title: 'Funded', color: statusColors['Funded'] },
  { title: 'Denied', color: statusColors['Denied'] }
]
export const quarterlyFundingLegend = [
  { title: 'Autumn', color: quarterColors['Autumn'] },
  { title: 'Winter', color: quarterColors['Winter'] },
  { title: 'Spring', color: quarterColors['Spring'] },
  { title: 'Blocks / Special Projects', color: brandColors['Purple'] },
  { title: 'Remaining Funding', color: brandColors['Light Gray'] }
]

/*
Top Level Export
*/
export default {
  statusColors,
  quarterColors,
  brandColors,
  DIVERGING_COLOR_SCALE,
  statusLegend,
  quarterlyFundingLegend
}
