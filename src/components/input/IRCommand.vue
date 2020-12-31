<template>
    <v-container>
        <v-row>
            <v-col md="3" class="ml-md-auto">
                <v-input
                    :message="['Command Type']"
                    prepend-icon="mdi-remote"
                >
                    <v-select
                    v-model="command.name"
                    :items="commandTypes"
                    label="Command Type"
                    hide-details="auto"
                    ></v-select>
                </v-input>
            </v-col>

            <nec-command v-if="isNEC" :necCommand="necCommand" />
            <rc6-command v-else-if="isRC6" :rc6Command="rc6Command" />
            <iscp-command v-else-if="isISCP" :iscpCommand="iscpCommand" />
            <template v-else>
                <v-col md="6" class="ml-md-auto">
                    
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import { NECCommand, RC6Command, RemoteCommand, ISCPCommand } from '@/store/interface';
    import Vue from 'vue'
    import NECCommandComponent from './NECCommand.vue'
    import RC6CommandComponent from './RC6Command.vue'
    import ISCPCommandComponent from './ISCPCommand.vue'

    export default Vue.extend({
        name: "ir-command",
        components: {
            "nec-command": NECCommandComponent,
            "rc6-command": RC6CommandComponent,
            "iscp-command": ISCPCommandComponent
        },
        props: {
            command: {
                type: Object as () => RemoteCommand,
                required: true
            }
        },
        data: () => ({
            commandTypes: [
                "NEC",
                "RC6",
                "ISCP"
            ]
        }),
        computed: {
            commandType(): string | undefined {
                return this.command.name;
            },
            isNEC(): boolean {
                return this.commandType == "NEC" && !!this.necCommand;
            },
            isRC6(): boolean {
                return this.commandType == "RC6" && !!this.rc6Command;
            },
            isISCP(): boolean {
                return this.commandType == "ISCP" && !!this.iscpCommand;
            },
            necCommand(): NECCommand | null {
                return this.command.command;
            },
            rc6Command(): RC6Command | null {
                return this.command.rc6Command;
            },
            iscpCommand(): ISCPCommand | null {
                return this.command.iscpCommand;
            }
        },
        methods: {
            populateCommandType(): void {
                if(this.commandType != "NEC") {
                    this.command.command = null;
                }
                if(this.commandType != "RC6") {
                    this.command.rc6Command = null;
                }
                if(this.commandType != "ISCP") {
                    this.command.iscpCommand = null;
                }

                if(this.commandType == "NEC" && !this.command.command) {
                    this.setEmptyNecCommand();
                } else if(this.commandType == "RC6" && !this.command.rc6Command) {
                    this.setEmptyRc6Command();
                } else if(this.commandType == "ISCP" && !this.command.iscpCommand) {
                    this.setEmptyISCPCommand();
                }
            },
            setEmptyNecCommand(): void {
                Vue.set(this.command, "necCommand", {
                    deviceId: this.$store.state.lastEnteredNecDeviceId || 0,
                    command: 0
                } as NECCommand);
            },
            setEmptyRc6Command(): void {
                Vue.set(this.command, "rc6Command", {
                    mode: 0,
                    control: this.$store.state.lastEnteredRC6Control || 0,
                    information: 0
                } as RC6Command);
            },
            setEmptyISCPCommand(): void {
                Vue.set(this.command, "iscpCommand", {
                    identifier: this.$store.getters.defaultIscpIdentifier,
                    command: "",
                    argument: ""
                } as ISCPCommand);
            }
        },
        watch: {
            "commandType": "populateCommandType"
        }
    });
</script>