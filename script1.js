const $addInput = $('#addInput')
const $todoListDom = $('#todolist')
const $donelistDom= $('#donelist')
const defaultState = {
    todoList: [],
    doneList: [],
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            return { ...state, todoList: [ ...state.todoList, action.todo ] } 
        }
        case 'DEL_TODO': {
            return { ...state, todoList: state.todoList.filter((_item, id) => id !== action.id) }
        }
        case 'ADD_DONE': {
            return { ...state, doneList: [ ...state.doneList, action.todo ] } 
        }
        case 'DEL_DONE': {
            return { ...state, doneList: state.doneList.filter((_item, id) => id !== action.id) }
        }
    }
}
const action = {
    addTodo(todo) {
        return {
            type: 'ADD_TODO',
            todo
        }
    },
    delTodo(id) {
        return {
            type: 'DEL_TODO',
            id
        }
    },
    addDone(todo) {
        return {
            type: 'ADD_DONE',
            todo
        }
    },
    delDone(id) {
        return {
            type: 'DEL_DONE',
            id
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || Redux.compose;
const store = Redux.createStore(reducer, composeEnhancers())
$addInput.bind('keydown', (e) => {
    if (e.keyCode == 13 && $addInput.val()) {
        store.dispatch(action.addTodo($addInput.val()))
        $addInput.val('')
    }
})
$todoListDom.on('click', '.del', function (e) {
    e.stopPropagation()
    const index = $(this).parent().index()
    store.dispatch(action.delTodo(index))
})
$todoListDom.on('click', '.todolist-item', function () {
    const index = $(this).index()
    const text = store.getState().todoList[index]
    store.dispatch(action.addDone(text))
    store.dispatch(action.delTodo(index))
})
$donelistDom.on('click', '.donelist-item', function () {
    const index = $(this).index()
    const text = store.getState().doneList[index]
    store.dispatch(action.addTodo(text))
    store.dispatch(action.delDone(index))
})
const renderTodoList = () => {
    const todoListItemsDom = store.getState().todoList.map(item => `<li class="todolist-item">${item}<i class="del">x</i></li>`).join('')
    $todoListDom.html(todoListItemsDom)
}
const renderDoneList = () => {
    const DoneListItemsDom = store.getState().doneList.map(item => `<li class="donelist-item">${item}</li>`).join('')
    $donelistDom.html(DoneListItemsDom)
}
store.subscribe(renderTodoList)
store.subscribe(renderDoneList)