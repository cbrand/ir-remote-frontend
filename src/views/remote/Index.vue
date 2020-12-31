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
import { Remote } from '@/store/interface';
export default {
    props: ["remote"],
    
}
</script>