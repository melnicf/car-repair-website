<template>
    <button :class="class" :type="type" @click="navigate" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span v-else>{{ label }}</span>
    </button>
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
        href: {
            type: String,
            default: "",
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const navigate = () => {
            if (props.loading) return; // Prevent navigation if loading
            if (props.href) {
                if (props.href.startsWith("#")) {
                    document
                        .getElementById(props.href.substring(1))
                        ?.scrollIntoView({
                            behavior: "smooth",
                        });
                } else {
                    window.location.href = props.href;
                }
            }
        };

        return {
            navigate,
        };
    },
});
</script>

<style lang="scss">
@use "@styles/variables/variables.scss" as variables;

.spinner {
    border: 2px solid transparent;
    border-top: 2px solid variables.$primary;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

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

    @media screen and (max-width: variables.$mobile) {
        height: 56px;
        border-radius: 60px;
    }

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

    @media screen and (max-width: variables.$mobile) {
        height: 56px;
        border-radius: 60px;
    }

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

    @media screen and (max-width: variables.$mobile) {
        height: 56px;
        border-radius: 60px;
    }

    &:hover {
        background-color: lighten(variables.$quaternary, 10%);
    }
}
</style>
