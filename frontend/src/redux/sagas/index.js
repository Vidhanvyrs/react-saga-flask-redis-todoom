import { all } from 'redux-saga/effects';
import todoSaga from './todoSaga';

//this is the root saga that combines all sagas it is used to run all sagas in parallel basically our 
// CRUD operations saga are combined here also dont forget to mention that this is a general middleware and also a generator function
export default function* rootSaga() {
  yield all([
    todoSaga()
  ]);
}