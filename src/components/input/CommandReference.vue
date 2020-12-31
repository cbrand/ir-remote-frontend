<template>
    <v-container>
        <v-spacer></v-spacer>
        <v-card class="e12">
            <v-container>
                <v-row>
                    <v-col md="12" class="ml-md-auto">
                        <v-input
                            :message="['Command']"
                            prepend-icon="mdi-apple-keyboard-command"
                        >
                            <v-autocomplete
                            auto-select-first
                            v-model="selectedCommand"
                            :hint="`${command.name}`"
                            :items="commands"
                            item-text="name"
                            item-value="command"
                            label="Command"
                            ></v-autocomplete>
                        </v-input>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-spacer></v-spacer>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        props: ["commands", "selectedCommand"],
        data: () => ({
            
        }),
        computed: {

        }
    })
</script>