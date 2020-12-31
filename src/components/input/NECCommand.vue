<template>
    <v-col md="9" class="ml-md-auto">
        <v-row>
            <v-col md="6" class="ml-md-auto">
                <v-input
                    :message="['Device ID']"
                    prepend-icon="mdi-television"
                >
                    <v-text-field
                        v-model="necCommand.deviceId"
                        :rules="deviceIDRules"
                        hide-details="auto"
                        type="number"
                        label="Device ID"
                        min="0"
                        max="512"
                    ></v-text-field>
                </v-input>
            </v-col>

            <v-col md="6" class="ml-md-auto">
                <v-input
                    :message="['Command']"
                    prepend-icon="mdi-apple-keyboard-command"
                >
                    <v-text-field
                        v-model="necCommand.command"
                        :rules="commandCodeRules"
                        hide-details="auto"
                        type="number"
                        label="Command Code"
                        min="0"
                        max="255"
                    ></v-text-field>
                </v-input>
            </v-col>
        </v-row>
    </v-col>
</template>

<script lang="ts">
    import { NECCommand } from '@/store/interface';
    import Vue from 'vue'

    export default {
        name: "nec-command",
        props: {
            necCommand: {
                type: Object as NECCommand,
                required: true
            }
        },
        data: () => ({
            deviceIDRules: [
                value => value >= 0 && value <= 512 || "Device ID needs to be between 512 and 0"
            ],
            commandCodeRules: [
                value => value >= 0 && value <= 255 || "Command ID needs to be between 255 and 0"
            ]
        }),
        watch: {
            "necCommand.deviceId": function(newValue: string): void {
                this.$store.commit("updateLastEnteredNecDeviceId", newValue)
            }
        }
    }
</script>