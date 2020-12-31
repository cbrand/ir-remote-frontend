<template>
    <v-row>
        <v-col md="12" class="ml-md-auto">
            <v-input
                :message="['Wait time']"
                prepend-icon="mdi-alarm"
            >
                <v-slider
                    v-model="wait.milliseconds"
                    :rules="timeInMillisecondsRule"
                    :max="10000"
                    :min="0"
                    :step="100"
                    label="Wait for milliseconds"
                    thumb-label
                >
                    <template v-slot:append>
                        <v-text-field
                            v-model="wait.milliseconds"
                            class="mt-0 pt-0"
                            type="number"
                            min="0"
                            max="10000"
                            step="100"
                            suffix="ms"
                            style="width: 100px"
                            :rules="timeInMillisecondsRule"
                        ></v-text-field>
                    </template>
                </v-slider>
            </v-input>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { RemoteWait } from '@/store/interface'

    export default {
        name: "ir-wait",
        props: {
            wait: {
                type: Object as RemoteWait,
                required: true
            }
        },
        data: () => ({
            timeInMillisecondsRule: [
                (value) => value >= 0 || "Wait time must not be negative",
                (value) => value <= 10000 || "Wait time must be less than 10000 milliseconds"
            ]
        })
    }
</script>