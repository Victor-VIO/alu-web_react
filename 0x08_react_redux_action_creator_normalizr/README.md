# React Redux action creator + normalizr

Normalizing nested JSON with normalizr, Redux action types and action creators,
bound action creators, and an async action creator with redux-thunk.

Each `task_N/dashboard` builds on the previous one:

```
npm install
npm test
npm start   # dev server on http://localhost:8080
```

- `task_0`: `getAllNotificationsByUser` reading `notifications.json`
- `task_1`: normalizr schema (users, messages, notifications)
- `task_2`: `getAllNotificationsByUser` using the normalized data with a single loop
- `task_3`: course action types and creators
- `task_4`: UI action types and creators
- `task_5`: notification action types, filters and creators
- `task_6`: action creators bound to `dispatch`
- `task_7`: `loginRequest` async action creator with redux-thunk
