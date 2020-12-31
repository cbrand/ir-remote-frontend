<template>
    <v-col md="9">
        <v-row>
            <v-col md="6" class="ml-md-auto">
                <v-input
                    :message="['Control']"
                    prepend-icon="mdi-television"
                >
                    <v-text-field
                        v-model="rc6Command.control"
                        :rules="rc6InputRules"
                        hide-details="auto"
                        type="number"
                        label="Control"
                        min="0"
                        max="512"
                    ></v-text-field>
                </v-input>
            </v-col>
            <v-col md="6" class="ml-md-auto">
                <v-input
                    :message="['Information']"
                    prepend-icon="mdi-apple-keyboard-command"
                >
                    <v-text-field
                        v-model="rc6Command.information"
                        :rules="rc6InputRules"
                        hide-details="auto"
                        type="number"
                        label="Information"
                        min="0"
                        max="512"
                    ></v-text-field>
                </v-input>
            </v-col>
        </v-row>
    </v-col>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { RC6Command } from '@/store/interface';

    export default Vue.extend({
        name: "rc6-command",
        props: {
            rc6Command: {
                type: Object as () => RC6Command,
                required: true
            }
        },
        data: () => ({
            rc6InputRules: [
                (value: number) => value >= 0 && value <= 255 || "RC6 element needs to be between 255 and 0"
            ]
        }),
        watch: {
            "rc6Command.control": function(newValue: string): void {
                this.$store.commit("updateLastEnteredRC6Control", newValue);
            }
        }
    });
</script>