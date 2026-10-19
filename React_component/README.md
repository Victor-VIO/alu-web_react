# React component

Class components, lifecycle methods, event handling, containment and specialization,
higher-order components, and render optimisation with `PureComponent` and `shouldComponentUpdate`.

Each `task_N/dashboard` is a standalone app built with Webpack and Babel and tested with Jest and Enzyme:

```
npm install
npm start   # dev server on http://localhost:8080
npm test
```

- `task_0`: App converted into a class component
- `task_1`: `logOut` prop and the Ctrl+H keyboard shortcut
- `task_2`: Notifications as a class with `markAsRead`
- `task_3`: `BodySection` and `BodySectionWithMarginBottom`
- `task_4`: `WithLogging` higher-order component
- `task_5`: pure `NotificationItem` and `shouldComponentUpdate` in Notifications
