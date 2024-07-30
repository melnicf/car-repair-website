<template>
  <div class="input_group">
    <textarea v-model="internalValue" :placeholder="placeholder"></textarea>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "TextAreaField",
  props: {
    modelValue: {
      type: String,
      required: true,
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
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const internalValue = computed({
      get: () => props.modelValue,
      set: (value: string) => emit("update:modelValue", value),
    });

    return {
      internalValue,
    };
  },
});
</script>

<style scoped lang="scss">
@use "@styles/variables/variables.scss" as variables;

.input_group {
  display: flex;
  flex-direction: column;
  width: 100%;

  textarea {
    border-radius: variables.$border-radius;
    color: variables.$quaternary;
    height: 200px;
    outline: none;
    padding: variables.$padding-medium;
    width: 100%;
    border: none;

    @include variables.shadow4;
    @include variables.typo-fields1;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
