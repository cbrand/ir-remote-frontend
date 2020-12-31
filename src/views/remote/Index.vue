<template>
    <v-card
        class="mx-auto"
        v-if="remote"
    >
        <v-card-title v-text="remote.name">
        </v-card-title>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Remote } from '@/store/interface';
export default Vue.extend({
    props: ["remote"],
    
})
</script>