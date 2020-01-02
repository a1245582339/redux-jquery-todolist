const $addInput = $('#addInput')
const $todoListDom = $('#todolist')
const $donelistDom= $('#donelist')
const todoList = []
const doneList = []
$addInput.bind('keydown', (e) => {
    if (e.keyCode == 13 && $addInput.val()) {
        addTodoList($addInput.val())
        $addInput.val('')
    }
})
$todoListDom.on('click', '.del', function (e) {
    e.stopPropagation()
    const index = $(this).parent().index()
    todoList.splice(index, 1)
    $(this).parent().remove()
})
$todoListDom.on('click', '.todolist-item', function () {
    const index = $(this).index()
    moveToDoneList(index)
})
$donelistDom.on('click', '.donelist-item', function () {
    const index = $(this).index()
    moveToTodoList(index)
})
const addTodoList = (val) => {
    todoList.push(val)
    $todoListDom.html($todoListDom.html() + `<li class="todolist-item">${val}<i class="del">x</i></li>`)
}
const moveToDoneList = (id) => {
    doneList.push(todoList[id])
    $donelistDom.html($donelistDom.html() + `<li class="donelist-item">${todoList[id]}</li>`)
    todoList.splice(id, 1)
    $('.todolist-item').eq(id).remove()
}
const moveToTodoList = (id) => {
    todoList.push(doneList[id])
    $todoListDom.html($todoListDom.html() + `<li class="todolist-item">${doneList[id]}<i class="del">x</i></li>`)
    doneList.splice(id, 1)
    $('.donelist-item').eq(id).remove()
}