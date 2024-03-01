import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function ChartComponent({ chartData }) {
  return (
    <Line
      data={chartData}
      style={{ width: '700px', height: '400px', color: 'white' }}
    />
  )
}

export default ChartComponent
