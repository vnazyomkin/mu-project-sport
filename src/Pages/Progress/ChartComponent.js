import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function ChartComponent({ chartData, userDataLine, chartGraph }) {
  return (
    <div>
      {chartGraph === 'line' ? (
        <Bar
          data={chartData}
          style={{ width: '700px', height: '400px', color: 'white' }}
        />
      ) : (
        <Line
          data={userDataLine}
          style={{ width: '700px', height: '400px', color: 'white' }}
        />
      )}
    </div>
  )
}

export default ChartComponent
