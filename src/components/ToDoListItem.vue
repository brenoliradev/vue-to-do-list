<script lang="ts" setup>
import { Todo } from '../composable/types/Todo'
import { TodoStore } from '../composable/TodoStore'

const props = defineProps<{
  todo: Todo
}>()

</script>

<template>
  <li
    :data-checked="props.todo.done"
    class="flex w-full items-center justify-between rounded-2xl bg-primary-content px-6 py-4 font-medium text-white transition-all duration-300 data-[checked='true']:opacity-80"
  >
    <p
      :data-checked="props.todo.done"
      class="text-sm text-primary-focus data-[checked='true']:italic data-[checked='true']:line-through"
    >
      {{ props.todo.text }}
    </p>
    <div class="flex gap-3"><input
      type="checkbox"
      :name="'toggle done for todo with id: ' + props.todo.id"
      :checked="props.todo.done"
      class="checkbox-secondary checkbox"
      @change="TodoStore.toggleDoneTodo(props.todo.id)"
    />
    <button       :name="'delete todo with id: ' + props.todo.id"
>
      <TrashIcon @click="TodoStore.deleteTodo(props.todo.id)" class="h-6 w-6 fill-secondary hover:fill-secondary-focus hover:opacity-80 cursor-pointer"/>
    </button>
  </div>
  </li>
</template>

<script lang="ts">
import { TrashIcon } from "@heroicons/vue/20/solid"

export default {
  components: {
    TrashIcon
  }
}
</script>