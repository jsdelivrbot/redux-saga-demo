import { takeEvery, call, put } from 'redux-saga/effects'; // helper functions
import axios from 'axios';

let postId = 0;

// 1) Our worker saga
// Do async stuff in here
// Dispatched action is provided to the worker saga
export function* testWorkerAsync(action) {
  try {
    console.log('Action passed to worker saga', action);
    console.log('Attempting to call the api...');

    // try to call api
    // call(): redux-saga helper method provided to execute a Promise-returning async function
    // first parameter: async method (axios.get)
    // additional parameters: args provided to async method (axios.get('http://asdf'))
    postId++;
    const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/posts/${postId}`);

    // When promise resolves:
    // Generator function is called again -> picks up where it left off until next yield statement (or error out)
    // put(): redux-saga helper method provided to dispatch an action with our async response data
    // implement this as a standard redux reducer to update our store   
    console.log(response);
    yield put({ type: 'FETCH_POST_SUCCESS', payload: response.data });

  } catch (e) {
    // act on the error
    console.log('Request failed!');
    console.log(e);
    yield put({ type: 'FETCH_POST_ERROR', response: response.data });
  }
}

// 2) Our watcher saga
// Spawn a new task on each action
export function* watchTest() {
  console.log('redux-saga is running the TEST_WATCHER action listener..');

  // Use 'yield' keyword in generator functions before redux-saga helper calls
  // takeEvery(): action-listener helper function - responds to every dispatched action
  // takeEvery('action-type', worker saga to run)
  yield takeEvery('TEST_WATCHER', testWorkerAsync);
}

// 3) Our root saga:
// Single entry point to start all of our sagas
// Add superstar(*) to generator functions
export default function* rootSaga() {
  yield [
    // Combine all watcher sagas here
    watchTest(),
  ];
}
