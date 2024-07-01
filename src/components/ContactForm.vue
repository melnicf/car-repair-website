<template>
	<div class="contact_form">
		<div class="contact_form_info">
			<h1>Contattaci!</h1>
			<p>
				Siamo a tua disposizione per qualsiasi informazione o richiesta di assistenza. Il nostro
				team di esperti è pronto a rispondere a tutte le tue domande riguardo ai nostri servizi e a
				fornirti supporto per qualsiasi esigenza legata alla tua auto. Compila il modulo a destra
				con i tuoi dettagli e la tua richiesta, e ti ricontatteremo al più presto per offrirti il
				miglior servizio possibile. La tua soddisfazione è la nostra priorità.
			</p>
		</div>
		<form class="contact_form_fields" @submit.prevent="validateForm">
			<div class="contact_form_top">
				<InputField v-model="form.name" placeholder="Nome" :error="errors.name" />
				<InputField v-model="form.email" placeholder="Email" :error="errors.email" />
			</div>
			<InputField v-model="form.object" placeholder="Oggetto" :error="errors.object" />
			<TextAreaField v-model="form.message" placeholder="Messaggio" :error="errors.message" />
			<div class="contact_form_button">
				<PrimaryButton class="button_type_1" label="INVIA" type="submit" />
			</div>
		</form>
	</div>
</template>

<script lang="ts">
	import { reactive } from 'vue'
	import PrimaryButton from '../components/PrimaryButton.vue'
	import InputField from '../components/InputField.vue'
	import TextAreaField from '../components/TextAreaField.vue'

	export default {
		components: {
			PrimaryButton,
			InputField,
			TextAreaField,
		},
		setup() {
			const form = reactive({
				name: '',
				email: '',
				object: '',
				message: '',
			})

			const errors = reactive<{
				name: string | null
				email: string | null
				object: string | null
				message: string | null
			}>({
				name: null,
				email: null,
				object: null,
				message: null,
			})

			const validateForm = () => {
				errors.name = form.name ? null : 'Nome è richiesto'
				errors.email = form.email ? null : 'Email è richiesta'
				errors.object = form.object ? null : 'Oggetto è richiesto'
				errors.message = form.message ? null : 'Messaggio è richiesto'

				if (!errors.name && !errors.email && !errors.object && !errors.message) {
					// Form is valid, submit the form
					console.log('Form submitted:', form)
					// Add your form submission logic here
				} else {
					console.log('Form validation failed', errors)
				}
			}

			return {
				form,
				errors,
				validateForm,
			}
		},
	}
</script>

<style scoped lang="scss">
	.contact_form {
  width: 70%;
  height: auto;
  padding: var(--padding-large);
  display: flex;
  gap: 100px;
  margin: auto;
}

.contact_form_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  flex: 1;
  gap: 40px;
}

.input_group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.contact_form_info h1,
.contact_form_info p {
  color: var(--color-black);
  width: 100%;
  margin: 0px;
}

.contact_form_info h1 {
  font-size: 40px;
  text-align: center;
}

.contact_form_info p {
  font-size: 20px;
}

.contact_form_fields {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  gap: 50px;
  flex: 1;
}

.contact_form_top {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: auto;
}

.contact_form_button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: var(--padding-medium);
  width: 100%;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

@media screen and (max-width: 1100px) {
  .contact_form_top {
    flex-direction: column;
  }

  .contact_form_top input {
    width: 100%;
  }

  .contact_form_button button {
    width: 100%;
  }
}

@media screen and (max-width: 800px) {
  .contact_form {
    flex-direction: column;
  }

  .contact_form_info h1,
  .contact_form_info p {
    text-align: center;
  }
}

@media screen and (max-width: 600px) {
  .contact_form{
    padding-top: 150vw;
  }
  .contact_form_info h1 {
    font-size: 10vw;
  }

  .contact_form_info p {
    font-size: 5vw;
  }
}
</style>
