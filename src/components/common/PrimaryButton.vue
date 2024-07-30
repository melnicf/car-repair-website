<template>
  <button :class="class" :type="type">{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "PrimaryButton",
  props: {
    class: {
      type: String as PropType<
        "button_type_1" | "button_type_2" | "button_type_3"
      >,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      default: "button",
    },
  },
});
</script>

<style lang="scss">
@use "@styles/variables/variables.scss" as variables;

.button_type_1 {
  padding: variables.$padding-small;
  border-radius: variables.$border-radius;
  background-color: variables.$primary;
  transition: variables.$transition-ease;
  outline: none;
  border: none;
  color: variables.$black;
  width: 200px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lighten(variables.$primary, 10%);
  }
}

.button_type_2 {
  padding: variables.$padding-small;
  border-radius: variables.$border-radius;
  background-color: variables.$tertiary;
  transition: variables.$transition-ease;
  outline: none;
  border: 1px variables.$white solid;
  color: variables.$black;
  width: 200px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lighten(variables.$tertiary, 10%);
  }
}

.button_type_3 {
  padding: variables.$padding-small;
  border-radius: variables.$border-radius;
  background-color: variables.$secondary;
  transition: variables.$transition-ease;
  outline: none;
  border: 1px variables.$white solid;
  color: variables.$primary;
  width: 200px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lighten(variables.$quaternary, 10%);
  }
}
</style>
