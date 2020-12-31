<template>
    <v-col md="9" class="ml-md-auto">
        <v-row>
            <v-col md="4" class="ml-md-auto">
                <v-input
                    :message="['Identifier']"
                    prepend-icon="mdi-television"
                >
                    <v-combobox
                        v-model="iscpCommand.identifier"
                        :items="identifiers"
                        :rules="identifierRules"
                        label="Identifier"
                    ></v-combobox>
                </v-input>
            </v-col>
            <v-col md="4" class="ml-md-auto">
                <v-input
                    :message="['command']"
                    prepend-icon="mdi-apple-keyboard-command"
                >
                    <v-text-field
                        v-model="iscpCommand.command"
                        :rules="commandRules"
                        hide-details="auto"
                        label="Command Code"
                    ></v-text-field>
                </v-input>
            </v-col>
            <v-col md="4" class="ml-md-auto">
                <v-input
                    :message="['Argument']"
                    prepend-icon="mdi-data-matrix"
                >
                    <v-text-field
                        v-model="iscpCommand.argument"
                        :rules="argumentRules"
                        hide-details="auto"
                        label="Argument"
                    ></v-text-field>
                </v-input>
            </v-col>
        </v-row>
    </v-col>
</template>

<script lang="ts">
    import { ISCPCommand } from '@/store/interface';

    export default {
        name: "iscp-command",
        props: {
            iscpCommand: {
                type: Object as ISCPCommand,
                required: true
            }
        },
        data: () => ({
            identifierRules: [
                value => value.length != 0 || "ISCP identifier must be set",
                value => value.length <= 13 || "ISCP identifier cannot be larger than 12"
            ],
            commandRules: [
                value => value.length == 3 || "ISCP Commands always have three characters"
            ],
            argumentRules: []
        }),
        computed: {
            identifiers: function() {
                return this.$store.state.iscpStatus.map((iscpStatus) => iscpStatus.identifier);
            }
        },
        watch: {
            "iscpCommand.identifier": function(newValue: string): void {
                this.$store.commit("updateLastEnteredISCPIdentifier", newValue);
            },
            "iscpCommand.command": function(newValue: string): void {
                this.$store.commit("updateLastEnteredISCPCommand", newValue);
            }
        },
        created: function() {
            const iscpStatus = this.$store.state.iscpStatus;
            if(iscpStatus && iscpStatus.length == 0) {
                this.$store.dispatch("queryISCPStatus");
            }
        }
    }
</script>