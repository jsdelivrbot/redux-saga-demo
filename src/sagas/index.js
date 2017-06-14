import { takeEvery } from 'redux-saga/effects';

// 2) Our watcher saga
// Spawn a new task on each action
export function* watchCreate() {
  console.log('redux-saga is running the CREATE action listener..');
}

// 3) Our root saga:
// Single entry point to start all of our sagas
// Add superstar(*) to generator functions
export default function* rootSaga() {
  yield [
    // Combine all watcher sagas here
    watchCreate(),
  ];
}
