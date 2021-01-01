<template>
    <v-btn :class="btnClass" @mousedown="start" @mouseup="end" @mouseleave="end" @touchstart="start" @touchend="end" @touchcancel="end">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">
    import Vue from 'vue';

    interface Data {
        interval: number | undefined;
        startTimeout: number | undefined;
        lastAction: number | undefined;
    }

    export default Vue.extend({
        name: "repeat-click-btn",
        data: () => ({ 
            interval: undefined,
            startTimeout: undefined,
            lastAction: undefined
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
                this.triggerAction();
                if(this.startTimeout === undefined) {
                    this.startTimeout = setTimeout(() => this.startAfterBackoff(), 1000);
                }
            },
            startAfterBackoff(): void {
                this.interval = setInterval(() => this.triggerAction(), 300);
            },
            end(): void {
                if(this.interval !== undefined) {
                    clearInterval(this.interval);
                }
                if(this.startTimeout !== undefined) {
                    clearTimeout(this.startTimeout);
                }
                this.interval = undefined;
                this.startTimeout = undefined;
            },
            triggerAction(): void {
                if(!this.lastAction || this.lastAction + 100 < Date.now()) {
                    this.action();
                    this.lastAction = Date.now();
                }
            }
        }
    })
</script>