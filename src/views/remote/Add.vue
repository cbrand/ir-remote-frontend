<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-spacer></v-spacer>
        <v-card outlined class="mx-auto" width="800px">
            <v-card-title>
                <v-icon>mdi-remote</v-icon>&nbsp;Add New Remote
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        :disabled="disabled"
                        label="Name"
                        required
                    ></v-text-field>
                    </v-col>

                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="remoteId"
                        :rules="idRules"
                        :disabled="disabled"
                        label="Remote ID"
                        required
                    ></v-text-field>
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
        <v-spacer></v-spacer>
    </v-form>
</template>

<script lang="ts">
import { parse as uuidParse } from 'uuid';
import { Remote } from '@/store/interface';

function checkForUUID(uuidString: string): boolean {
    try {
        uuidParse(uuidString);
        return true;
    } catch(error) {
        return false;
    }
}

export default {
    data: () => ({
        valid: false,
        disabled: false,
        name: "",
        remoteId: "",
        nameRules: [
            (name: string) => !!name || "Name is required"
        ],
        idRules: [
            (id: string) => !!id || "Remote ID is required",
            (id: string) => checkForUUID(id) || "The ID must be a valid UUID"
        ]
    }),
    methods: {
        success(): void {
            if(!this.valid || !this.$refs.form.validate()) {
                return;
            }
            this.disabled = true;
            this.$store.commit("addRemote", {
                "name": this.name,
                "id": this.remoteId
            } as Remote);
            this.$router.push({name: "remote/view", params: {"remoteId": this.remoteId}});
        }
    }
}
</script>