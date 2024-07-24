<template>
	<button :class="class" :type="type">{{ label }}</button>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import type { PropType } from 'vue'

	export default defineComponent({
		name: 'PrimaryButton',
		props: {
			class: {
				type: String as PropType<'button_type_1' | 'button_type_2'>,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
			type: {
				type: String as PropType<'button' | 'submit' | 'reset'>,
				default: 'button',
			},
		},
	})
</script>

<style lang="scss">
	@use '../styles/variables/variables.scss' as variables;

.button_type_1 {
  padding: variables.$padding-small;
  border-radius: variables.$border-radius;
  text-decoration: none;
  background-color: rgb(157, 157, 44);
  transition: variables.$transition-ease;
  outline: none;
  border: none;
  color: variables.$color-white;
  width: 200px;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgb(185, 185, 60);
  }
}

.button_type_2 {
  padding: variables.$padding-small;
  border-radius: variables.$border-radius;
  text-decoration: none;
  background-color: transparent;
  transition: variables.$transition-ease;
  outline: none;
  border: 1px variables.$color-white solid;
  color: variables.$color-white;
  width: 200px;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: variables.$color-gray;
    text-decoration: underline;
  }
}
</style>
