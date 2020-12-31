<template>
    <v-container fluid>
    <v-card
        class="mx-auto"
        v-if="remote"
    >
        <v-card-title v-text="remote.name">
        </v-card-title>
    </v-card>

    <v-row v-if="hasOnAndOff">
        <v-col xs="6">
            <v-btn color="red" @click="playFunction(Function.POWER_OFF)" width="100%">
                <v-icon>mdi-power-off</v-icon> Off
            </v-btn>
        </v-col>
        <v-col xs="6" align="right">
            <v-btn color="success" @click="playFunction(Function.POWER_ON)" width="100%">
                <v-icon>mdi-power-cycle</v-icon> On
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-else-if="hasPowerToggle">
        <v-col xs="12" align="center">
            <v-btn color="red" @click="playFunction(Function.POWER_TOGGLE)" width="100%">
                <v-icon>mdi-power</v-icon> Power
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="showWheel">
        <v-col xs="4" align="right">

        </v-col>
        <v-col xs="4" align="center">
            <v-btn min-width="100%" class="remote-btn remote-wheel-btn" @click="playFunction(Function.UP)">
                <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
        </v-col>
        <v-col xs="4" align="left">
            
        </v-col>
    </v-row>
    <v-row v-if="showWheel">
        <v-col xs="4" align="right">
            <v-btn min-width="100%" class="remote-btn remote-wheel-btn" @click="playFunction(Function.LEFT)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </v-col>
        <v-col xs="4">
            <v-btn min-width="100%" class="remote-btn remote-wheel-btn" @click="playFunction(Function.OK)">
                <v-icon>mdi-image-filter-center-focus-strong</v-icon> Ok
            </v-btn>
        </v-col>
        <v-col xs="4">
            <v-btn min-width="100%" class="remote-btn remote-wheel-btn" @click="playFunction(Function.RIGHT)">
                <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="showWheel">
        <v-col xs="4" align="right">
            <v-btn class="remote-btn remote-wheel-btn" @click="playFunction(Function.BACK)">
                <v-icon>mdi-backspace</v-icon> Back
            </v-btn>
        </v-col>
        <v-col xs="4" align="center">
            <v-btn min-width="100%" class="remote-btn remote-wheel-btn" @click="playFunction(Function.DOWN)">
                <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
        </v-col>
        <v-col xs="4" align="left">
            <v-btn class="remote-btn remote-wheel-btn" @click="playFunction(Function.EXIT)">
                <v-icon>mdi-exit-to-app</v-icon> Exit
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="showAllVolume">
        <v-col xs="4"  align="right">
            <repeat-click-btn class="remote-btn remote-volume-control" @action="playFunction(Function.VOLUME_DOWN)">
                <v-icon>mdi-volume-low</v-icon>
            </repeat-click-btn>
        </v-col>
        <v-col xs="4"  align="center">
            <v-btn class="remote-btn remote-volume-control" @click="playFunction(Function.VOLUME_MUTE)">
                <v-icon>mdi-volume-off</v-icon> Mute
            </v-btn>
        </v-col>
        <v-col xs="4" align="left">
            <repeat-click-btn class="remote-btn remote-volume-control" @action="playFunction(Function.VOLUME_UP)">
                <v-icon>mdi-volume-high</v-icon>
            </repeat-click-btn>
        </v-col>
    </v-row>
    <v-row v-if="showVolume" class="volume-control-row">
        <v-col xs="6"  align="right">
            <repeat-click-btn class="remote-btn remote-volume-control" @action="playFunction(Function.VOLUME_DOWN)">
                <v-icon>mdi-volume-low</v-icon>
            </repeat-click-btn>
        </v-col>
        <v-col xs="6" align="left">
            <repeat-click-btn class="remote-btn remote-volume-control" @action="playFunction(Function.VOLUME_UP)">
                <v-icon>mdi-volume-high</v-icon>
            </repeat-click-btn>
        </v-col>
    </v-row>
    <v-row v-if="showChannels">
        <v-col xs="6" align="right">
            <repeat-click-btn class="remote-btn remote-program-control" @action="playFunction(Function.PROGRAM_DOWN)">
                <v-icon>mdi-skip-previous</v-icon> Channel-
            </repeat-click-btn>
        </v-col>
        <v-col xs="6" align="left">
            <repeat-click-btn class="remote-btn remote-program-control" @action="playFunction(Function.PROGRAM_UP)">
                <v-icon>mdi-skip-next</v-icon> Channel+
            </repeat-click-btn>
        </v-col>
    </v-row>
    <v-row v-if="showExclusiveStartStop">
        <v-col xs="4" align="right">
            <v-btn class="remote-btn remote-playback-control" @click="playFunction(Function.STOP)">
                <v-icon>mdi-stop</v-icon> Stop
            </v-btn>
        </v-col>
        <v-col xs="4" align="center">
            <v-btn class="remote-btn remote-playback-control" @click="playFunction(Function.PLAY)">
                <v-icon>mdi-play</v-icon> Play
            </v-btn>
        </v-col>
        <v-col xs="4" align="left">
            <v-btn class="remote-btn remote-playback-control" @click="playFunction(Function.PAUSE)">
                <v-icon>mdi-pause</v-icon> Pause
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="showStartStopToggle">
        <v-col xs="6" align="right">
            <v-btn class="remote-btn remote-playback-control" @click="playFunction(Function.STOP)">
                <v-icon>mdi-stop</v-icon> Stop
            </v-btn>
        </v-col>
        <v-col xs="6" align="left">
            <v-btn class="remote-btn remote-playback-control" @click="playFunction(Function.PLAY_PAUSE)">
                <v-icon>mdi-play-pause</v-icon> Play / Pause
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="showFastForwardAndRewind">
        <v-col xs="6" align="right">
            <v-btn class="remote-btn remote-playback-control" v-if="showRewind" @click="playFunction(Function.FAST_REWIND)">
                <v-icon>mdi-rewind</v-icon> Rewind
            </v-btn>
        </v-col>
        <v-col xs="6" align="left">
            <v-btn class="remote-btn remote-playback-control" v-if="showFastForward" @click="playFunction(Function.FAST_FORWARD)">
                <v-icon>mdi-fast-forward</v-icon> Forward
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="showSubtitleOrLanguage">
        <v-col xs="6" align="right">
            <v-btn class="remote-btn remote-playback-control" v-if="showLanguage" @click="playFunction(Function.LANGUAGE)">
                <v-icon>mdi-translate</v-icon> Language
            </v-btn>
        </v-col>
        <v-col xs="6" align="right">
            <v-btn class="remote-btn remote-playback-control" v-if="showSubtitle" @click="playFunction(Function.SUBTITLE)">
                <v-icon>mdi-subtitles-outline</v-icon> Subtitle
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-if="showMenu">
        <v-col xs="12">
            <v-btn class="remote-btn remote-playback-control" v-if="showMenu" @click="playFunction(Function.MENU)">
                <v-icon>mdi-menu</v-icon> Menu
            </v-btn>
        </v-col>
    </v-row>

    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Remote, Theater, Function } from '@/store/interface';
import RepeatClickBtn from '@/components/RepeatClickBtn.vue';

export default Vue.extend<any, any, any, any>({
    components: {
        "repeat-click-btn": RepeatClickBtn
    },
    props: {
        remote: {
            type: Object as () => Remote,
            required: false
        }
    },
    data: () => ({
        Function: Function
    }),
    computed: {
        inEditMode(): boolean {
            return this.$store.state.inEditMode;
        },
        hasOnAndOff(): boolean {
            return this.hasFunctions(Function.POWER_ON, Function.POWER_OFF);
        },
        hasPowerToggle(): boolean {
            return this.hasFunctions(Function.POWER_TOGGLE);
        },
        showWheel(): boolean {
            return this.hasFunctions(Function.UP, Function.DOWN, Function.LEFT, Function.RIGHT, Function.OK);
        },
        showVolume(): boolean {
            return this.hasOneFunction(Function.VOLUME_UP, Function.VOLUME_DOWN) && !this.showAllVolume;
        },
        showAllVolume(): boolean {
            return this.hasFunctions(Function.VOLUME_UP, Function.VOLUME_DOWN, Function.VOLUME_MUTE);
        },
        showChannels(): boolean {
            return this.hasFunctions(Function.PROGRAM_UP, Function.PROGRAM_DOWN);
        },
        showExclusiveStartStop(): boolean {
            return this.hasFunctions(Function.PLAY, Function.PAUSE);
        },
        showStartStopToggle(): boolean {
            return this.hasFunctions(Function.PLAY_PAUSE);
        },
        showFastForwardAndRewind(): boolean {
            return this.hasOneFunction(Function.FAST_FORWARD, Function.FAST_REWIND);
        },
        showFastForward(): boolean {
            return this.hasOneFunction(Function.FAST_FORWARD);
        },
        showRewind(): boolean {
            return this.hasOneFunction(Function.FAST_REWIND);
        },
        showSubtitleOrLanguage(): boolean {
            return this.hasOneFunction(Function.SUBTITLE, Function.LANGUAGE);
        },
        showSubtitle(): boolean {
            return this.hasOneFunction(Function.SUBTITLE);
        },
        showLanguage(): boolean {
            return this.hasOneFunction(Function.LANGUAGE);
        },
        showMenu(): boolean {
            return this.hasOneFunction(Function.MENU);
        }
    },
    methods: {
        hasFunctions(...features: Function[]): boolean {
            const theater: Theater = this.$store.getters.selectedTheater;
            if(!theater) {
                return false;
            }

            return features.every((feature) => theater.scenes.some((scene) => scene.function === feature));
        },
        hasOneFunction(...features: Function[]): boolean {
            const theater: Theater = this.$store.getters.selectedTheater;
            if(!theater) {
                return false;
            }

            return features.some((feature) => theater.scenes.some((scene) => scene.function === feature));
        },
        switchEditMode(): void {
            const editMode = this.inEditMode;
            if(editMode) {
                this.$router.push({
                    "name": "remote/theater/edit"
                });
            }
        },
        playFunction(feature: Function): void {
            this.$store.dispatch("sendFunction", feature);
        }
    },
    mounted() {
        (this as any).switchEditMode();
    },
    watch: {
        '$route': 'switchEditMode',
        inEditMode: 'switchEditMode',
    }
})
</script>

<style lang="scss">
.remote-wheel-btn {
    min-height: 70px;
}

.remote-btn {
    min-height: 50px;
}

.remote-volume-control, .remote-program-control, .remote-playback-control {
    width: 100%;
}
</style>