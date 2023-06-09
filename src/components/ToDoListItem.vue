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
    class="flex w-full items-center justify-between rounded-2xl bg-primary-content px-6 py-4 font-medium text-white transition-all duration-200 data-[checked='true']:opacity-80"
  >
    <p
      :data-checked="props.todo.done"
      class="text-sm text-primary-focus data-[checked='true']:italic data-[checked='true']:line-through"
    >
      {{ props.todo.text }}
    </p>
    <input
      type="checkbox"
      :checked="props.todo.done"
      class="checkbox-primary checkbox"
      @change="TodoStore.toggleDoneTodo(props.todo.id)"
    />
  </li>
</template>
