<template>
    <v-container 
        fluid
    >
        <v-form
            ref="form"
            v-model="valid"
        >
            <v-card
                class="mx-auto"
            >
                <v-card-title>
                    {{remote.name}}
                </v-card-title>
                <v-card-subtitle>
                    Add Theater
                </v-card-subtitle>

                <v-card-text>
                    <v-row>
                        <v-col md="8">
                            <v-text-field
                                v-model="name"
                                :rules="nameRules"
                                :disabled="disabled"
                                label="Name"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-select
                                v-model="icon"
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
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        :disabled="!valid || disabled"
                        color="success"
                        class="mr-4"
                        @click="success"
                        >Add
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { v4 as uuid4 } from 'uuid';
import { Remote, Theater } from '@/store/interface'
import { icons, getIconImageById } from '../../../resources/icons'

export default Vue.extend({
    data: function() {
        // eslint-disable-next-line
        const component = (this as any);
        return {
            valid: false,
            disabled: false,
            name: "",
            icon: null,
            nameRules: [
                (name: string) => !!name || "Name is required",
                (name: string) => !component.nameAlreadyExists(name) || "The theater already exists with the same name"
            ],
            icons: icons
        }
    },
    computed: {
        remote(): Remote {
            const remotes: Array<Remote> = this.$store.state.remotes;
            const remote = remotes.find((remote) => remote && remote.id == this.$route.params.remoteId);
            if(!remote) {
                throw new Error("Remote with added id not found");
            }
            return remote;
        },
        remoteId(): string {
            return this.remote.id;
        },
        theaters(): Array<Theater> {
            return this.$store.state.theaters;
        },
        inEditMode(): boolean {
            return this.$store.state.inEditMode;
        },
        iconRepresentation(): string | undefined {
            const icon = this.icon;

            if(!icon) {
                return undefined;
            } else {
                return getIconImageById(icon);
            }
        }
    },
    methods: {
        success(): void {
            if(!this.valid) {
                return;
            }
            this.disabled = true;
            const theater = {
                "id": uuid4(),
                "name": this.name,
                "icon": this.icon || undefined,
                "remoteId": this.remoteId,
                "sortKey": 0,
                "scenes": []
            } as Theater;
            this.$store.dispatch("updateTheater", theater);
            this.$router.push({name: "remote/theater/view", params: {"remoteId": this.remoteId, "theaterId": theater.id}});
        },
        nameAlreadyExists(name: string): boolean {
            return this.theaters.findIndex((theater: Theater) => theater.name == name) !== -1;
        }
    }
})
</script>