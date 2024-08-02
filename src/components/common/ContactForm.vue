<template>
    <div class="contact_form">
        <div class="contact_form_info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
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
                <PrimaryButton
                    class="button_type_3"
                    label="Invia"
                    type="submit"
                    :loading="state.loading"
                />
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import emailjs from "@emailjs/browser";
import { reactive, ref, defineComponent } from "vue";
import PrimaryButton from "./PrimaryButton.vue";
import InputField from "./InputField.vue";
import TextAreaField from "./TextAreaField.vue";
import { toast, updateGlobalOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineComponent({
    components: {
        PrimaryButton,
        InputField,
        TextAreaField,
    },
    props: {
        title: {
            type: String,
            default: "Contattaci!",
        },
        description: {
            type: String,
            default:
                "Siamo a tua disposizione per qualsiasi informazione o richiesta di assistenza. Il nostro team di esperti è pronto a rispondere a tutte le tue domande riguardo ai nostri servizi e a fornirti supporto per qualsiasi esigenza legata alla tua auto. Compila il modulo a destra con i tuoi dettagli e la tua richiesta, e ti ricontatteremo al più presto per offrirti il miglior servizio possibile. La tua soddisfazione è la nostra priorità.",
        },
    },
    setup() {
        const form = reactive({
            name: "",
            email: "",
            object: "",
            message: "",
        });

        const errors = reactive({
            name: null as string | null,
            email: null as string | null,
            object: null as string | null,
            message: null as string | null,
        });

        const form_obj = ref<HTMLFormElement | string>("");
        const state = reactive({ loading: false });

        const resetForm = () => {
            form.name = "";
            form.email = "";
            form.object = "";
            form.message = "";
        };
        const sendEmail = () => {
            state.loading = true;
            console.log(form_obj.value);
            emailjs
                .sendForm(
                    "service_i4dkyfl",
                    "template_ez6gwf9",
                    form_obj.value,
                    {
                        publicKey: "XOpak0E3EAk6Z90_g",
                    },
                )
                .then(
                    () => {
                        resetForm();
                        updateGlobalOptions({ rtl: true });
                        toast.success("Messaggio inviato!");
                        state.loading = false;
                    },
                    (error) => {
                        console.log("FAILED...", error.text);
                        state.loading = false;
                        // toast error
                    },
                );
        };

        const validateForm = () => {
            errors.name = form.name ? null : "Nome è richiesto";
            errors.email = form.email ? null : "Email è richiesta";
            errors.object = form.object ? null : "Oggetto è richiesto";
            errors.message = form.message ? null : "Messaggio è richiesto";

            if (
                !errors.name &&
                !errors.email &&
                !errors.object &&
                !errors.message
            ) {
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
            state,
        };
    },
});
</script>

<style scoped lang="scss">
@use "@styles/variables/variables.scss" as variables;

.contact_form {
    width: 80%;
    height: auto;
    padding: 50px;
    display: flex;
    gap: 100px;
    margin: auto;

    @media screen and (max-width: variables.$mobile) {
        flex-direction: column;
        padding: 20px;
        width: 100%;
        height: 100%;
        gap: 48px;
    }

    .contact_form_info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        height: 100%;
        max-width: 45%;
        gap: 48px;

        @media screen and (max-width: variables.$mobile) {
            max-width: 100%;
            height: auto;
            gap: 16px;
        }

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

        @media screen and (max-width: variables.$mobile) {
            h1 {
                @include variables.typo-h1;
                text-align: center;
            }

            p {
                color: variables.$black;
                @include variables.typo-sub1;
                text-align: center;
            }
        }
    }

    .contact_form_fields {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        height: auto;
        gap: 50px;

        @media screen and (max-width: variables.$mobile) {
            gap: 20px;
        }

        .contact_form_top {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            width: 100%;
            height: auto;

            @media screen and (max-width: 1100px) {
                flex-direction: column;
            }

            input {
                width: 100%;
            }
        }

        .contact_form_button {
            button {
                @include variables.typo-sub1;

                @media screen and (max-width: 1100px) {
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>
