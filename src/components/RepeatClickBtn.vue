<template>
    <v-btn :class="btnClass" @mousedown="start" @mouseup="end" @mouseleave="end" @touchstart="start" @touchend="end" @touchcancel="end">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">
    interface Data {
        interval: null | number;
    }

    export default {
        name: "repeat-click-btn",
        data: () => ({ interval: null } as Data),
        computed: {
            btnClass: function(): string {
                return this.class;
            }
        },
        methods: {
            action() {
                this.$emit("action");
            },
            start() {
                this.interval = setInterval(() => this.action(), 500);
                this.action();
            },
            end() {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }
</script>