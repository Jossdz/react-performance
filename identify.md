# Identify performance issues in your react applications.

## Learning goals:

- Identify performance issues.
- Use chrome dev tools to find expensive tasks.
- Use React dev tools to identify re-renders.
- Understand how React updates the DOM.

## Intro

As you may notice during the Bootcamp, modern front-end development has increased its complexity over the years. We passed from plain CSS, HTML, and JS to view engines like HBS, and we ended up working with a complex structure of tools to bundle our different pieces of code: Webpack, Babel, plugins, css-in-js, and more. .. This complexity isn't something bad, it's useful to deliver better software when we know how everything works; if not... it can be painful.

![perf issue](https://i.postimg.cc/WpGPHW7f/ezgif-2-6e32769452d6.gif)

If we are not careful enough, our applications may be slow or feel slightly cluttered, just as you can see in the animation above. Performance doesn't tend to be an issue in react applications, but when it is, it really is. The first step to deal with these issues is to identify them, every time you notice a janky experience interacting with your application you can be almost sure it's a performance issue.

## Analyzing performances issues with chrome dev tools

To be able to start taking down the performance issues you have to understand and learn to use the performance tab on the chrome dev tools, open the web inspector, and go to the performance tab:

![perf tab](https://i.postimg.cc/MpjXhSMY/Captura-de-Pantalla-2021-02-07-a-la-s-15-57-24.png)

This is a tool that you can use to record the action causing the bad user experience and identify the piece of code responsible for that issue. You will use just a couple of options in this tab:

- Record:

![record option](https://i.postimg.cc/6psB4Gqd/Captura-de-Pantalla-2021-02-07-a-la-s-16-02-30.png)

It helps you to record and analyze the project performance.

- Clear:

![clear option](https://i.postimg.cc/Rh6zNMzs/Captura-de-Pantalla-2021-02-07-a-la-s-16-04-25.png)

As its name says, it will help you to clear the workspace to start over.

- Slowdown:

![slowdown option](https://i.postimg.cc/8k9Sxrhq/Captura-de-Pantalla-2021-02-07-a-la-s-16-05-52.png)

This option will help you to simulate a slower device, remember that your users probably won't be using a computer like yours, they may use their phone or tablet, and you should try to offer them a good experience as well.

Now you know the basics of this tab, let's look at how you can start looking for performance issues.

We are going to use this application to identify its performance issue:
[CodeSandbox App](https://pyd2w.csb.app/)

Try to type into the input that says `Dog name`, it feels slow right?. now open your chrome dev tools and your performance tab, hit record, try to type once again, and stop the recording session, you should see something like this:

![recording](https://i.postimg.cc/026kVKNB/Captura-de-Pantalla-2021-02-07-a-la-s-19-30-49.png)

Once the performance recording session finishes, it shows you a chart and a table with the events happening on the browser representing actions with the time each took and how expensive they were for our pc, if you hover the chart you will also see a snapshot of the browser.

You can hover an event and zoom in and out on it to be able to read more about that action, you can also select a section of the graph to check the actions happening in that area.

![performancegif](https://i.postimg.cc/sDKCVMqY/sdf.gif)

With this tool, we got a couple of insights that confirm our thoughts about the performance issue. We now know that the application doesn't work fine when we type on the `Dog name` input and that each time we type the code generates some function executions that take more time than they should.

Our next tool will give us the piece of information we need to start our strategy to fix the app issue.

## React profiler

Once we test our application with the built-in performance tool of our browser, now we need to use the [React dev tools])(https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) to identify what is causing our performance issue when we type.

We are going to use the [React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) tab on the web inspector as we did with the chrome dev tools, let's hit the record button, type, and analyze the results. You should get something like this:

![react-dev-tools](https://i.postimg.cc/Z0tjrxW9/Captura-de-Pantalla-2021-02-07-a-la-s-20-07-34.png)

Here we have another kind of result, regarding how React updated the dom. We are going to use just 2 of the 3 result sections:

### Flame chart

![flame-chart](https://i.postimg.cc/YqQBTXfs/Captura-de-Pantalla-2021-02-07-a-la-s-20-13-21.png)

The flame chart view represents the state of your application for a particular commit. Each bar in the chart represents a React component (e.g. App, Nav). The size and color of the bar represent how long it took to render the component and its children.

## Ranked chart

The ranked chart view represents a single commit. Each bar in the chart represents a React component (e.g. App, Nav). The chart is ordered so that the components which took the longest to render are at the top.

### Reading performance data

The DevTools profiler groups performance info by commit (We will define what a commit is soon). Commits are displayed in a bar chart near the top of the profiler:

![](https://reactjs.org/static/bd72dec045515d59be51c944e902d263/d8f62/commit-selector.png)

Each bar in the chart represents a single commit with the currently selected commit colored black. You can click on a bar (or the left/right arrow buttons) to select a different commit.

The color and height of each bar corresponds to how long that commit took to render.

Now we have a better understanding of the profiler, let's talk about how React works and updates the dom.

### Render and Commit

Conceptually, React does work in two phases:
The render phase determines what changes need to be made to e.g. the DOM. During this phase, React calls render and then compares the result to the previous render.
The commit phase is when React applies any changes. (In the case of React DOM, this is when React inserts, updates, and removes DOM nodes.) React also calls lifecycles like componentDidMount and componentDidUpdate during this phase.
This is an example of the update process:

```
1  render → reconciliation → commit
2        ↖                 ↙
3           state change
```

Now, take some time to play around with the results looking for helpful details about the performance issue. As you may notice, our `<Somescreen/>` component it's being rendering every time we type on the `Dog name` Input. If you click on the component or hover it, it will tell you why it was rendered:

![](https://i.postimg.cc/cCg0K03x/Captura-de-Pantalla-2021-02-07-a-la-s-20-49-14.png)

The component it's being re-rendered each time we type on the input due to his parent state, on the next lesson we are going to analyze the code to fix our performance issue.

## Summary

Performance issues are not common on React applications, but if we get into a performance issue without knowing how to deal with it, it can be difficult for us to fix those issues. Now you know how to use chrome performance dev tools and the React profiler to identify performance issues and get a better understanding of how to deal with them.

## Questions:

As a way to checking on understanding, ask yourself the next questions, the questions are not submittable but serve as a tool for you in case you need another quick read.

- Which tool helps you to get information about the component-render time?
- What you have to use to initially identify expensive tasks causing performance issues?
- React apply the changes on the DOM on the `render` or `commit` phase?
