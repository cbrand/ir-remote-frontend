<template>
    <v-container fluid>
        <v-btn
        color="red"
        elevation="2"
        fab
        absolute
        right
        @click="$emit('remove')"
        ><v-icon>mdi-delete</v-icon></v-btn>
        <ir-command v-if="isRemoteCommand" :command="instruction"></ir-command>
        <ir-wait v-if="isRemoteWait" :wait="instruction"></ir-wait>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Instruction, RemoteCommand, RemoteWait } from '@/store/interface'
    import IRCommand from './IRCommand.vue'
    import IRWait from './IRWait.vue'
    
    export default Vue.extend({
        name: "instruction",
        components: {
            "ir-command": IRCommand,
            "ir-wait": IRWait
        },
        props: {
            instruction: {
                required: true,
                type: Object as () => Instruction
            }
        },
        computed: {
            isRemoteCommand(): boolean {
                return this.instruction.type == "RemoteCommand";
            },
            isRemoteWait(): boolean {
                return this.instruction.type == "RemoteWait";
            }
        }
    });
</script>