<template>
    <v-container fluid>
        <router-view></router-view>

        <v-bottom-navigation
            color="primary"
            fixed
            class="mt-5"
        >
            <v-btn
                v-for="theater in theaters"
                v-bind:key="theater.id"
                :to="{name:'remote/theater/view', params: {theaterId: theater.id}}"
            >
            <span>{{theater.name}}</span>

            <v-icon>{{getIconById(theater.icon)}}</v-icon>
            </v-btn>
            <v-btn v-if="inEditMode" :to="{name:'remote/theater/add'}">
                <span>Add Theater</span>

                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-container>
</template>

<script lang="ts">
import { Remote, Theater } from '@/store/interface'
import { getIconImageById } from '../../resources/icons'

export default {
    data: () => ({
    }),
    mounted () {
        this.updateRemoteId()
    },
    watch: {
        '$route': 'updateRemoteId'
    },
    computed: {
        remote(): Remote {
            const remotes: Array<Remote> = this.$store.state.remotes;
            const remote = remotes.find((remote) => remote.id == this.$route.params.remoteId);
            return remote;
        },
        theaters(): Array<Theater> {
            return this.$store.state.theaters;
        },
        inEditMode(): boolean {
            return this.$store.state.inEditMode;
        }
    },
    methods: {
        getIconById(iconId: string | undefined): string | undefined {
            if(!iconId) {
                return undefined;
            }
            return getIconImageById(iconId);
        },
        updateRemoteId(): void {
            const remoteId = this.$route.params.remoteId;
            this.$store.dispatch("selectRemoteUUID", remoteId);
        }
    }
}
</script>