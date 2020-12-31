<template>
    <v-btn :class="btnClass" @mousedown="start" @mouseup="end" @mouseleave="end" @touchstart="start" @touchend="end" @touchcancel="end">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">
    import Vue from 'vue';

    interface Data {
        interval: number | undefined;
    }

    export default Vue.extend({
        name: "repeat-click-btn",
        data: () => ({ interval: undefined } as Data),
        computed: {
            btnClass: function(): string {
                return (this as any).class;
            }
        },
        methods: {
            action(): void {
                this.$emit("action");
            },
            start(): void {
                this.interval = setInterval(() => this.action(), 400);
                this.action();
            },
            end(): void {
                if(this.interval) {
                    clearInterval(this.interval);
                }
                this.interval = undefined;
            }
        }
    })
</script>