# React Redux connectors and providers

Connecting the dashboard to a Redux store: `connect`, `mapStateToProps`, `mapDispatchToProps`,
the `Provider`, redux-thunk for async action creators, the Redux DevTools, a combined root reducer,
selectors with Immutable.js and memoized selectors with Reselect, and the container/component pattern.

Each `task_N/dashboard` builds on the previous one:

```
npm install
npm start   # dev server on http://localhost:8080 (serves courses.json, notifications.json, login-success.json)
npm test
```

- `task_0`: `mapStateToProps` for `isLoggedIn`, store and `Provider` in `index.js`
- `task_1`: drawer state and actions come from Redux
- `task_2`: thunk middleware, `loginRequest`, Header and Footer connected to the user, uiReducer handles LOGIN/LOGOUT
- `task_3`: Redux DevTools support
- `task_4`: `rootReducer` combining courses, notifications and ui
- `task_5`: notifications fetched from the API with a loading state
- `task_6`: unread notifications selector and `markAsAread`
- `task_7`: courses fetched from the API, selection stored in Redux
- `task_8`: memoized `getUnreadNotificationsByType` selector and filter buttons
- `task_9`: `NotificationsContainer` and a functional `Notifications` component
