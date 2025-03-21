import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    let myChart
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current)
      const dataCount = 200000
      const data = generateOHLC(dataCount)
      const option = {
        dataset: {
          source: data,
        },
        title: {
          text: 'Stock Market Data',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
          },
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        series: [
          {
            type: 'candlestick',
            encode: {
              x: 0,
              y: [1, 4, 3, 2],
            },
          },
        ],
      }
      myChart.setOption(option)

      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }

    return () => {
      if (myChart) {
        myChart.dispose()
      }
    }
  }, [])

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="hidden lg:flex flex-col w-64 bg-gray-800 p-4 text-white">
        <Button className="mb-2 w-full">Add Asset</Button>
        <Button className="mb-2 w-full">Update Asset</Button>
        <Button className="w-full">Delete Asset</Button>
      </div>
      <div className="flex-1 h-full">
        <div ref={chartRef} className="w-full h-full"></div>
      </div>
      <div className="fixed bottom-0 w-full flex lg:hidden bg-gray-800 p-2 justify-around">
        <Button className="text-white">Add</Button>
        <Button className="text-white">Update</Button>
        <Button className="text-white">Delete</Button>
      </div>
    </div>
  )
}

function generateOHLC(count) {
  let data = []
  let xValue = +new Date(2011, 0, 1)
  let minute = 60 * 1000
  let baseValue = Math.random() * 12000
  let boxVals = new Array(4)
  let dayRange = 12
  for (let i = 0; i < count; i++) {
    baseValue = baseValue + Math.random() * 20 - 10
    for (let j = 0; j < 4; j++) {
      boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue
    }
    boxVals.sort()
    let openIdx = Math.round(Math.random() * 3)
    let closeIdx = Math.round(Math.random() * 2)
    if (closeIdx === openIdx) {
      closeIdx++
    }
    let volume = boxVals[3] * (1000 + Math.random() * 500)
    data[i] = [
      echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
      +boxVals[openIdx].toFixed(2),
      +boxVals[3].toFixed(2),
      +boxVals[0].toFixed(2),
      +boxVals[closeIdx].toFixed(2),
      +volume.toFixed(0),
    ]
  }
  return data
}

export default Dashboard
