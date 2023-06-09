<script lang="ts" setup>
import { Todo } from '../composable/types/Todo'
import { TodoStore } from '../composable/TodoStore'

const props = defineProps<{
  todo: Todo
}>()
</script>

<template>
  <li
    :data-done="props.todo.done"
    :data-edit="edit"
    class="flex w-full max-w-xl flex-col items-center justify-between gap-4 rounded-2xl border border-secondary bg-transparent px-4 py-4 font-medium text-white shadow-md shadow-secondary/10 transition-all duration-300 data-[done='true']:opacity-80 sm:px-6 lg:flex-row"
  >
    <label
      class="label"
      :for="'toggle done for todo with id: ' + props.todo.id"
    >
      <input
        type="checkbox"
        :name="'toggle done for todo with id: ' + props.todo.id"
        :checked="props.todo.done"
        :disabled="edit"
        class="checkbox-secondary checkbox"
        @change="TodoStore.toggleDoneTodo(props.todo.id)"
      />
    </label>
    <button
      :name="'toggle done for todo with id: ' + props.todo.id"
      @click="TodoStore.toggleDoneTodo(props.todo.id)"
    >
      <p
        :data-done="props.todo.done"
        :data-edit="edit"
        class="md:text-md cursor-pointer text-sm text-primary-content data-[done='true']:italic data-[done='true']:line-through"
        v-if="!edit"
      >
        {{ props.todo.text }}
      </p>
    </button>
    <form
      :data-done="props.todo.done"
      :data-edit="edit"
      v-if="edit"
      @submit="(e) => submitForm(e, props.todo.id)"
      class="flex flex-col items-center justify-center"
    >
      <div class="join">
        <input
          :id="'edit-todo ' + props.todo.id"
          name="edit-todo"
          type="text"
          v-model="newText"
          class="input-bordered input-secondary input join-item"
          placeholder="Edit your todo"
          required
        />
        <button
          :name="'edit todo with id: ' + props.todo.id"
          :disabled="!newText || newText.length > 50"
          class="join-item btn rounded-r-full disabled:cursor-not-allowed"
          type="submit"
        >
          Edit
        </button>
      </div>
      <label
        :data-invalid="newText.length > 50"
        for="edit-todo"
        class="data-[invalid='true']:label data-[invalid='true']:label-text data-[invalid='false']:hidden data-[invalid='true']:text-red-600"
        >The maximum size of an todo name is 50 chars.</label
      >
    </form>
    <div class="flex gap-3">
      <button
        @click="toggleEdit(props.todo.id)"
        :name="'delete todo with id: ' + props.todo.id"
      >
        <PencilSquareIcon
          class="h-6 w-6 cursor-pointer fill-secondary hover:fill-secondary-focus hover:opacity-80"
        />
      </button>
      <button
        @click="TodoStore.deleteTodo(props.todo.id)"
        :name="'delete todo with id: ' + props.todo.id"
      >
        <TrashIcon
          class="h-6 w-6 cursor-pointer fill-secondary hover:fill-secondary-focus hover:opacity-80"
        />
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'
import { PencilSquareIcon } from '@heroicons/vue/20/solid'
import { nextTick } from 'vue'

type ToDoListData = {
  newText: string
  edit: boolean
}

export default {
  data(): ToDoListData {
    return {
      newText: '',
      edit: false
    }
  },
  components: {
    TrashIcon,
    PencilSquareIcon
  },
  methods: {
    submitForm(event: Event, id: number) {
      event.preventDefault() // Prevent the default form submission

      if (this.newText === '') return
      TodoStore.updateTodo(id, this.newText)

      // Reset the form fields
      this.newText = ''
      this.edit = false
    },
    toggleEdit(id: number) {
      this.edit = !this.edit

      nextTick(() => {
        document.getElementById('edit-todo ' + id)?.focus()
      })
    }
  }
}
</script>
