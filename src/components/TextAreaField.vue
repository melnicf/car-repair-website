<template>
	<div class="input_group">
		<textarea v-model="internalValue" :placeholder="placeholder"></textarea>
		<span v-if="error" class="error">{{ error }}</span>
	</div>
</template>

<script lang="ts">
	import { defineComponent, computed } from 'vue'
	import type { PropType } from 'vue'

	export default defineComponent({
		name: 'TextAreaField',
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
		emits: ['update:modelValue'],
		setup(props, { emit }) {
			const internalValue = computed({
				get: () => props.modelValue,
				set: (value: string) => emit('update:modelValue', value),
			})

			return {
				internalValue,
			}
		},
	})
</script>

<style scoped lang="scss">
	@import '../styles/variables/variables';

.input_group {
  display: flex;
  flex-direction: column;
  width: 100%;

  textarea {
    border-radius: $border-radius;
    height: 300px;
    width: 100%;
    resize: vertical;
    padding: 10px;
    box-shadow: $box-shadow-large;
    border: none;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
