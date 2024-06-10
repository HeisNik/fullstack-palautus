import { useState } from 'react'


const Button = ({text, feedback}) => {
  return (
    <button onClick={feedback}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, total, average, positive} = props
  console.log(props)
  if (props.total === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>  
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={total}/>
      <StatisticsLine text="average" value={average}/>
      <StatisticsLine text="positive" value={`${positive} %`}/>
        </tbody> 
      </table> 
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const newGood = good + 1 
    setGood(newGood)
    const newTotal = total + 1
    setTotal(newTotal)
    const newAverage = (average * total + 1) / newTotal
    setAverage(newAverage)
    console.log("total",newTotal)
    console.log("good",newGood)
    const newPositive = newGood / newTotal * 100
    setPositive(newPositive)
}

const handleNeutral = () => { 
    setNeutral(neutral + 1)
    const newTotal = total + 1
    setTotal(newTotal)
    const newAverage = (average * total) / newTotal
    setAverage(newAverage)
    const newPositive = good / newTotal * 100
    setPositive(newPositive)
}

const handleBad = () => {
    setBad(bad + 1)
    const newTotal = total + 1
    setTotal(newTotal)
    const newAverage = (average * total - 1) / newTotal
    setAverage(newAverage)
    const newPositive = good / newTotal * 100
    setPositive(newPositive)
}


  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" feedback={() => handleGood()}/>
      <Button text="neutral" feedback={() => handleNeutral()} />
      <Button text="bad" feedback={() => handleBad()}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App