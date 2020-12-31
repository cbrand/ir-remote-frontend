<template>
    <v-btn :class="btnClass" @mousedown="start" @mouseup="end" @mouseleave="end" @touchstart="start" @touchend="end" @touchcancel="end">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">
    import Vue from 'vue';

    interface Data {
        interval: number | undefined;
        intervalStart: number | undefined;
    }

    export default Vue.extend({
        name: "repeat-click-btn",
        data: () => ({ 
            interval: undefined,
            intervalStart: undefined
        } as Data),
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
                this.intervalStart = setInterval(() => this.startAfterBackoff(), 1000);
                this.action();
            },
            startAfterBackoff(): void {
                this.interval = setInterval(() => this.action(), 300);
            },
            end(): void {
                if(this.interval) {
                    clearInterval(this.interval);
                }
                if(this.intervalStart) {
                    clearInterval(this.intervalStart);
                }
                this.interval = undefined;
                this.intervalStart = undefined;
            }
        }
    })
</script>