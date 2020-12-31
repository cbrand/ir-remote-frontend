<template>
    <v-container fluid>
        <v-row>
            <v-col md="8">
                <v-text-field
                    v-model="scene.name"
                    :rules="nameRules"
                    label="Name"
                    required
                ></v-text-field>
            </v-col>
            <v-col md="4">
                <v-autocomplete
                    clearable
                    v-model="scene.function"
                    :items="availableFunctions"
                    item-text="text"
                    item-value="value"
                    :prepend-icon="sceneFunctionIcon"
                    label="Function"
                ></v-autocomplete>
            </v-col>
        </v-row>
        <transition-group name="flip-instructions" tag="div">
            <v-row v-bind:key="instruction.id" v-for="instruction in instructions">
                <v-col md="1">
                    <v-row>
                        <v-col md="12">
                            <v-btn :disabled="moveUpDisabled(instruction.id)" @click="moveInstructionUp(instruction.id)">
                                <v-icon>mdi-arrow-up-bold</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <v-btn  :disabled="moveDownDisabled(instruction.id)" @click="moveInstructionDown(instruction.id)">
                                <v-icon>mdi-arrow-down-bold</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col md="11">
                    <instruction :instruction="instruction" v-bind:key="instruction.id" v-on:remove="removeInstruction(instruction.id)"></instruction>
                </v-col>
            </v-row>
        </transition-group>
        <v-row justify="end">
            <v-col md="12" class="text-right">
                <v-btn
                    class="mr-4"
                    @click="addCommand()"
                >
                Add Command
                </v-btn>
                <v-btn
                    class="mr-4"
                    @click="addWait()"
                >
                Add Wait
                </v-btn>
                <v-btn
                    color="red"
                    class="mr-4"
                    @click="removeScene()"
                >Remove</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import { textOfFunction, iconOfFunction, functions } from '@/resources/functions'
    import { DescriptiveScene, Instruction, NECCommand, RemoteCommand, RemoteScene, RemoteWait, Function } from '@/store/interface';
    import { newCommand, newWait } from "@/store/constructors"
    import InstructionComponent from "./Instruction.vue"
    import { v4 as uuid4 } from "uuid"
    import Vue from "vue";

    export default Vue.extend<any, any, any, any>({
        name: "descriptive-scene",
        components: {
            "instruction": InstructionComponent,
        },
        props: {
            scene: {
                type: Object as () => DescriptiveScene,
                required: true
            },
            usedFunctions: {
                type: Array as () => Array<Function>,
                required: false
            }
        },
        data: () => ({
            functions: functions,
            nameRules: [
                (name: string) => !!name || "Name is required"
            ]
        }),
        computed: {
            availableFunctions(): Array<Function> {
                if(!this.usedFunctions) {
                    return this.functions;
                }

                return this.functions.filter((func: any) => this.scene.function === func.value || !this.usedFunctions.some((usedFunction: any) => usedFunction === func.value));
            },
            sceneFunctionIcon(): undefined | string {
                if(!this.scene) {
                    return undefined;
                }
                return iconOfFunction(this.scene.function);
            },
            remoteScene(): RemoteScene {
                return this.scene.scene;
            },
            instructions(): Array<Instruction> {
                return this.remoteScene.instructions;
            }
        },
        methods: {
            removeScene(): void {
                this.$store.commit("removeSceneById", this.scene.id);
            },
            addCommand(): void {
                const command = newCommand();
                if(command.command) {
                    command.command.deviceId = this.$store.state.lastEnteredNecDeviceId || 0;
                }
                this.addInstruction(command);
            },
            addWait(): void {
                this.addInstruction(newWait());
            },
            addInstruction(instruction: Instruction): void {
                this.instructions.push(instruction);
            },
            removeInstruction(instructionId: string): void {
                this.remoteScene.instructions = this.instructions.filter((instruction: Instruction) => instruction.id !== instructionId)
            },
            indexOfInstructionId(instructionId: string): number {
                return this.instructions.findIndex((instruction: Instruction) => instruction.id == instructionId)
            },
            moveUpDisabled(instructionId: string): boolean {
                return this.indexOfInstructionId(instructionId) === 0;
            },
            moveDownDisabled(instructionId: string): boolean {
                return this.indexOfInstructionId(instructionId) === this.instructions.length - 1;
            },
            moveInstructionUp(instructionId: string): void {
                const indexOfElement = this.indexOfInstructionId(instructionId);
                if(indexOfElement > 0) {
                    this.switchInstructions(indexOfElement, indexOfElement - 1);
                }
            },
            moveInstructionDown(instructionId: string): void {
                const indexOfElement = this.indexOfInstructionId(instructionId);
                if(indexOfElement > -1 && indexOfElement < this.instructions.length - 1) {
                    this.switchInstructions(indexOfElement, indexOfElement + 1);
                }
            },
            switchInstructions(indexOfElement: number, toSwitchIndex: number): void {
                const instructions = this.instructions.slice();
                const toSwitchInstruction = instructions[indexOfElement]
                instructions[indexOfElement] = instructions[toSwitchIndex];
                instructions[toSwitchIndex] = toSwitchInstruction;
                Vue.set(this.remoteScene, "instructions", instructions);
            }
        },
        watch: {
            "scene.function": function(newFunction: Function, oldFunction: Function): void {
                const scene: DescriptiveScene = (this as any).scene;
                if(!scene.name || scene.name == textOfFunction(oldFunction)) {
                    Vue.set(scene, "name", textOfFunction(newFunction) || "");
                }
            }
        }
    })
</script>

<style lang="scss">
    .flip-instructions-move {
        transition: transform 0.5s;
    }

    .flip-instructions-enter, .flip-instructions-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .flip-instructions-leave-active {
        position: absolute;
    }
</style>