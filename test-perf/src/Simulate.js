import React from 'react'

function CommonComponent() {
  return <h2>Common Component</h2>
}

function ExpensiveComponent() {
  console.log(`rendered`)
  return <h2>Expensive Component</h2>
}

CommonComponent = React.memo(CommonComponent)
ExpensiveComponent = React.memo(ExpensiveComponent)

const App = () => {
  const [showCommon, setShowCommon] = React.useState(true)

  return (
    <div>
      <button onClick={() => setShowCommon(!showCommon)}>
        toggle Component
      </button>
      {showCommon && <CommonComponent />}
      <ExpensiveComponent />
    </div>
  )
}

export default App
