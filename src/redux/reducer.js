import { combineReducers } from 'redux'
import { todosReducer } from "../components/TodoList/todosSlice";

const rootReducer = combineReducers({
  todos: todosReducer,
})

export default rootReducer