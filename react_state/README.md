# React state

Local state, lifecycle, controlled forms, React Context (Provider, `contextType` and Consumer),
lifting state up and a first React Hook.

Each `task_N/dashboard` is a standalone app built with Webpack and Babel and tested with Jest and Enzyme:

```
npm install
npm start   # dev server on http://localhost:8080
npm test
```

- `task_0`: `displayDrawer` state in App, show/hide the notifications panel
- `task_1`: controlled login form with a submit button enabled only when both fields are filled
- `task_2`: `AppContext`, logIn/logOut in App, logout section in the Header
- `task_3`: Footer as a context consumer, notifications list lifted into App state
- `task_4`: `useState` checkbox in `CourseListRow`
