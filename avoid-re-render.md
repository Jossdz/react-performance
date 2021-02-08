# Reduce Re-renders

## Learning goals:

- Understand the React DOM updates.
- Reduce expensive components re-rendering.
- Use React. memo to avoid re-renders.

## Intro

As we saw in the previous lesson, some components take a long time to render; If we render this type of expensive component often, we will have a performance issue. If you open this [project](https://codesandbox.io/s/react-codesandbox-forked-pyd2w?file=/src/index.js), you will see an example of an expensive component being rendered each time we type on the `Dog name` input.

To Simulate the same behavior of the application let's create a new couple of components called `CommonComponent` and `ExpensiveComponent` and just conditionally render the `CommonComponent` component inside our `App` component.

```js
import React from 'react'

function CommonComponent() {
  return <h2>Common Component</h2>
}

function ExpensiveComponent() {
  return <h2>Expensive Component</h2>
}

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
```

If you use the profiler to record the interactions, you will see that our expensive component is rendering as parent element state changes. Those changes are the ones that may result in performance issues. Now let's see a trick to fix it, we are going to create a new wrapper component that will receive our two components as props:

```js
import React from 'react'

function CommonComponent() {
  return <h2>Common Component</h2>
}

function ExpensiveComponent() {
  console.log(`rendered`)
  return <h2>Expensive Cponent</h2>
}

function AppWrapper({ CommonComponent, ExpensiveComponent }) {
  const [showCommon, setShowCommon] = React.useState(true)
  return (
    <div>
      <button onClick={() => setShowCommon(!showCommon)}>
        toggle Component
      </button>
      {showCommon && CommonComponent}
      {ExpensiveComponent}
    </div>
  )
}

const App = () => {
  return (
    <div>
      <AppWrapper
        CommonComponent={<CommonComponent />}
        ExpensiveComponent={<ExpensiveComponent />}
      />
    </div>
  )
}

export default App
```

Once you changed the implementation, try Profiling the app again. You should see something similar to this:

![](https://i.postimg.cc/X7K9HCX0/ezgif-2-78cc920ba5eb.gif)

Is this magic?

What happened here is that our component was rendering every time the parent component updated his state, and react updates happens for two reasons: state changes or props changes.

We used this knowledge in our favor:
Instead of rendering our components directly, we set a third component wrapping our two main components.
We managed the state into this wrapper component.
We create the JSX element once and re-use that same one passing the component invocation as props.

## React Memo

As cool as this trick might be, it's adding a 3rd component and complexity to our project. To get the same result we can use a React built-in solution to reuse the generated jsx called React.memo.

If your component renders the same result given the same props, you can wrap it in a call to `React.memo` for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.

Before implementing React.memo, here are a couple of concepts for you:

1. Memoization: Is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

2. Cache: Stores data so that future requests for that data can be served faster.

### Implementing React.memo

Let's undo the changes to our project:

```jsx
import React from 'react'

function CommonComponent() {
  return <h2>Common Component</h2>
}

function ExpensiveComponent() {
  console.log(`rendered`)
  return <h2>Expensive Component</h2>
}

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
```

And add React memo to the `ExpensiveComponent` Component, you can wrap the entire function or re-assign it to itself around React.memo as follows:

```jsx
ExpensiveComponent = React.memo(ExpensiveComponent)
```

After this piece of code try profiling the application one more time and enjoy the result. 🎉

## Summary

if you're experiencing performance issues, try this:
"Lift" the expensive component to a parent where it will be rendered less often. Then pass the expensive component down as a prop.
Use React.memo to memoize the expensive component.

## Questions:

As a way to checking on understanding, ask yourself the next questions, the questions are not submittable but serve as a tool for you in case you need another quick read.

- hat triggers a react component update?
- What memoization means?
- What is the benefit of implement cache?
