<template>
  <div class="contact_form">
    <div class="contact_form_info">
      <h1>Contattaci!</h1>
      <p>
        Siamo a tua disposizione per qualsiasi informazione o richiesta di
        assistenza. Il nostro team di esperti è pronto a rispondere a tutte le
        tue domande riguardo ai nostri servizi e a fornirti supporto per
        qualsiasi esigenza legata alla tua auto. Compila il modulo a destra con
        i tuoi dettagli e la tua richiesta, e ti ricontatteremo al più presto
        per offrirti il miglior servizio possibile. La tua soddisfazione è la
        nostra priorità.
      </p>
    </div>
    <form
      ref="form_obj"
      class="contact_form_fields"
      @submit.prevent="validateForm"
    >
      <div class="contact_form_top">
        <InputField
          name="user_name"
          v-model="form.name"
          placeholder="Nome"
          :error="errors.name"
        />
        <InputField
          name="user_email"
          v-model="form.email"
          placeholder="Email"
          :error="errors.email"
        />
      </div>
      <InputField
        name="user_subject"
        v-model="form.object"
        placeholder="Oggetto"
        :error="errors.object"
      />
      <TextAreaField
        name="user_message"
        v-model="form.message"
        placeholder="Messaggio"
        :error="errors.message"
      />
      <div class="contact_form_button">
        <PrimaryButton class="button_type_3" label="Invia" type="submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import emailjs from "@emailjs/browser";
import { reactive, ref } from "vue";
import PrimaryButton from "./PrimaryButton.vue";
import InputField from "./InputField.vue";
import TextAreaField from "./TextAreaField.vue";

export default {
  components: {
    PrimaryButton,
    InputField,
    TextAreaField,
  },
  setup() {
    const form = reactive({
      name: "",
      email: "",
      object: "",
      message: "",
    });

    const errors = reactive<{
      name: string | null;
      email: string | null;
      object: string | null;
      message: string | null;
    }>({
      name: null,
      email: null,
      object: null,
      message: null,
    });

    const form_obj = ref<HTMLFormElement | string>("");

    const sendEmail = () => {
      console.log(form_obj.value);
      emailjs
        .sendForm("service_i4dkyfl", "template_ez6gwf9", form_obj.value, {
          publicKey: "XOpak0E3EAk6Z90_g",
        })
        .then(
          () => {
            console.log("SUCCESS!");
            // toast success
          },
          (error) => {
            console.log("FAILED...", error.text);
            // toast error
          },
        );
    };

    const validateForm = () => {
      errors.name = form.name ? null : "Nome è richiesto";
      errors.email = form.email ? null : "Email è richiesta";
      errors.object = form.object ? null : "Oggetto è richiesto";
      errors.message = form.message ? null : "Messaggio è richiesto";

      if (!errors.name && !errors.email && !errors.object && !errors.message) {
        // Form is valid, submit the form
        console.log("Form submitted:", form);
        sendEmail();
      } else {
        console.log("Form validation failed", errors);
      }
    };

    return {
      form,
      form_obj,
      errors,
      validateForm,
      sendEmail,
    };
  },
};
</script>

<style scoped lang="scss">
@use "@styles/variables/variables.scss" as variables;

.contact_form {
  width: 80%;
  height: auto;
  padding: 30px;
  display: flex;
  gap: 100px;
  margin: auto;

  .contact_form_info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100%;
    flex: 1;
    gap: 40px;

    h1,
    p {
      color: variables.$quaternary;
      width: 100%;
      margin: 0px;
    }

    h1 {
      @include variables.typo-h1;
    }

    p {
      @include variables.typo-sub1;
    }
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

    .contact_form_top {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      width: 100%;
      height: auto;
    }

    .contact_form_button {
      button {
        @include variables.typo-sub1;
      }
    }

    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }
  }
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
    width: 100%;
  }

  .contact_form_info {
    p {
      text-align: left;
    }

    h1 {
      text-align: center;
    }
  }
}

@media screen and (max-width: 600px) {
  .contact_form_info h1 {
    @include variables.typo-h2;
  }

  .contact_form_info p {
    color: variables.$gray;
    @include variables.typo-sub1;
  }
}
</style>
