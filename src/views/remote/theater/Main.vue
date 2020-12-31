<template>
    <v-container fluid>
        <v-card
            class="mx-auto"
            v-if="remote"
        >
            <v-card-title v-text="remote.name">
            </v-card-title>

            <v-card-subtitle v-text="theater.name" v-if="theater">
            </v-card-subtitle>
        </v-card>
        
        <router-view></router-view>
    </v-container>
</template>


<script lang="ts">
import Vue from 'vue';
import { Remote, Theater, DescriptiveScene } from '@/store/interface'

export default Vue.extend({
    data: () => ({
    }),
    watch: {
        '$route': 'updateTheaterId'
    },
    created: function() {
        this.updateTheaterId();
    },
    computed: {
        remote(): Remote | null {
            return this.$store.getters.selectedRemote;
        },
        theater(): Theater | null {
            return this.$store.getters.selectedTheater;
        },
        descriptiveScenes(): Array<DescriptiveScene> {
            return this.theater?.scenes || [];
        },
        inEditMode(): boolean {
            return this.$store.state.inEditMode;
        }
    },
    methods: {
        updateTheaterId(): void {
            const theaterId = this.$route.params.theaterId;
            this.$store.commit("selectTheaterUUID", theaterId);
        }
    }
});
</script>
