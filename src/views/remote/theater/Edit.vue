<template>
    <v-container class="mb-5 py-5 px-0">
        <v-form
            ref="form"
            v-model="valid"
        >
            <v-row>
                <v-col md="12">
                    <v-card
                        class="mx-auto"
                        v-if="remote"
                    >
                        <v-card-title>
                            Edit
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <v-col md="8">
                                    <v-text-field
                                        v-model="theater.name"
                                        :rules="nameRules"
                                        label="Name"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col md="4">
                                    <v-select
                                        v-model="theater.icon"
                                        :items="icons"
                                        menu-props="auto"
                                        label="Icon"
                                        item-text="name"
                                        item-value="id"
                                        hide-details
                                        :prepend-icon="iconRepresentation"
                                        single-line
                                    >
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="12">
                                    <v-slider
                                    label="Sort Key"
                                    max="50"
                                    min="-50"
                                    thumb-label="always"
                                    v-model="theater.sortKey"
                                    ></v-slider>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        
                        <v-card-actions>
                            <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mr-4"
                                @click="edit"
                                >Edit
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col md="12">
                    <v-card
                        class="mx-auto"
                        v-if="remote"
                    >
                        <v-card-title>
                            Send Test Command
                        </v-card-title>

                        <v-card-text>
                            <ir-command :command="emptyCommand"></ir-command>
                        </v-card-text>
                        
                        <v-card-actions>
                            <v-btn
                                color="success"
                                class="mr-4"
                                @click="sendTestCommand"
                                >Test Send
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col md="12">
                    <v-card class="mx-auto">
                        <v-expansion-panels
                            multiple
                        >
                            <v-expansion-panel v-for="scene in descriptiveScenes" :key="scene.id">
                                <v-expansion-panel-header>
                                    {{formatText(scene.name)}}
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <descriptive-scene :scene="scene" :usedFunctions="usedFunctions"></descriptive-scene>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="12" class="mx-auto">
                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="edit"
                        >Edit
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-col>
            </v-row>
        </v-form>

        <v-btn
            elevation="12"
            style="z-index: 100"
            fab
            bottom
            right
            fixed
            large
            color="success"
            @click="addScene"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>


<script lang="ts">
import Vue from 'vue';
import { v4 } from 'uuid'
import { Remote, Theater, DescriptiveScene as DescriptiveSceneObject, Function, RemoteCommand } from '@/store/interface'
import { icons, getIconImageById } from '@/resources/icons'
import { newCommand, newDescriptiveScene } from '@/store/constructors'
import DescriptiveScene from '@/components/input/DescriptiveScene.vue'
import IRCommand from '@/components/input/IRCommand.vue'

export default Vue.extend({
    components: {
        DescriptiveScene,
        "ir-command": IRCommand,
    },
    data: function() {
        // eslint-disable-next-line
        const component = (this as any);
        return {
            name: null,
            icon: null,
            icons: icons,
            valid: false,
            nameRules: [
                (name: string) => !!name || "Name is required",
                (name: string) => !component.nameAlreadyExists(name) || "The theater already exists with the same name"
            ],
            emptyCommand: newCommand()
        }
    },
    computed: {
        remote(): Remote | null {
            return this.$store.getters.selectedRemote;
        },
        theater(): Theater {
            return this.$store.getters.selectedTheater || {};
        },
        otherTheaters(): Array<Theater> {
            return this.$store.state.theaters.filter((theater: Theater) => this.theater?.id != theater.id);
        },
        descriptiveScenes(): Array<DescriptiveSceneObject> {
            return this.$store.state.descriptiveScenes || [];
        },
        inEditMode(): boolean {
            return this.$store.state.inEditMode;
        },
        iconRepresentation(): string | undefined {
            if(!this.theater?.icon) {
                return undefined;
            }

            return getIconImageById(this.theater.icon);
        },
        usedFunctions(): Array<Function> {
            return this.descriptiveScenes.filter((scene) => scene.function != null).map((scene) => scene.function) as Array<Function>;
        }
    },
    methods: {
        nameAlreadyExists(name: string): boolean {
            const theaterIndex = this.otherTheaters.findIndex((theater: Theater) => theater.name == name && theater.id != this.theater?.id);
            return theaterIndex !== -1;
        },
        edit(): void {
            if(this.theater) {
                this.theater.scenes = this.descriptiveScenes;
                this.$store.dispatch("updateTheater", this.theater);
            }
        },
        addScene(): void {
            this.$store.commit("addScene", newDescriptiveScene());
        },
        formatText(text: string): string {
            if((text?.length || 0) == 0) {
                return "Unnamed Scene";
            }
            return text;
        },
        switchEditMode(): void {
            const editMode = this.inEditMode;
            if(!editMode) {
                this.$router.push({
                    "name": "remote/theater/view"
                });
            }
            this.$store.dispatch("resetScenes");
        },
        sendTestCommand(): void {
            this.$store.dispatch("sendCommand", this.emptyCommand);
        }
    },
    watch: {
        '$route': 'switchEditMode',
        inEditMode: 'switchEditMode',
    },
    mounted: function() {
        this.switchEditMode();
    }
});
</script>
