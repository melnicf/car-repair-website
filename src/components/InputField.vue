<template>
    <div class="input_group">
      <input :type="type" v-model="internalValue" :placeholder="placeholder" />
      <span v-if="error" class="error">{{ error }}</span>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import type { PropType } from 'vue';
  
  export default defineComponent({
    name: 'InputField',
    props: {
      modelValue: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      placeholder: {
        type: String,
        required: true,
      },
      error: {
        type: String as PropType<string | null>,
        default: null,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const internalValue = computed({
        get: () => props.modelValue,
        set: (value: string) => emit('update:modelValue', value),
      });

      return {
        internalValue,
      };
    },
  });
  </script>
  
  <style scoped>
  .input_group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  
input {
    border-radius: var(--border-radius);
    color: var(--color-black);
    font-size: 15px;
    height: 15px;
    outline: none;
    padding: var(--padding-medium);
    width: 100%;
    border: none;
    box-shadow: var(--box-shadow-large);
}
  
  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  </style>