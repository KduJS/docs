import { ref } from 'kdu'

export default {
  setup() {
    let id = 0

    const newTodo = ref('')
    const hideCompleted = ref(false)
    const todos = ref([
      { id: id++, text: 'Learn HTML', done: true },
      { id: id++, text: 'Learn JavaScript', done: true },
      { id: id++, text: 'Learn Kdu', done: false }
    ])

    function addTodo() {
      todos.value.push({ id: id++, text: newTodo.value, done: false })
      newTodo.value = ''
    }

    function removeTodo(todo) {
      todos.value = todos.value.filter((t) => t !== todo)
    }

    return {
      newTodo,
      hideCompleted,
      todos,
      addTodo,
      removeTodo
    }
  }
}
