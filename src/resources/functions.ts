import { Function as FunctionEnum } from "@/store/interface"

interface Function {
    text: string;
    value: FunctionEnum;
    icon: string | undefined;
}


export const functions: Array<Function> = [
    {
        text: "Power",
        value: FunctionEnum.POWER_TOGGLE,
        icon: "mdi-power"
    },
    {
        text: "Power On",
        value: FunctionEnum.POWER_ON,
        icon: "mdi-power-cycle"
    },
    {
        text: "Power Off",
        value: FunctionEnum.POWER_OFF,
        icon: "mdi-power-off"
    },
    {
        text: "Up",
        value: FunctionEnum.UP,
        icon: "mdi-arrow-up"
    },
    {
        text: "Right",
        value: FunctionEnum.RIGHT,
        icon: "mdi-arrow-right"
    },
    {
        text: "Left",
        value: FunctionEnum.LEFT,
        icon: "mdi-arrow-left"
    },
    {
        text: "Down",
        value: FunctionEnum.DOWN,
        icon: "mdi-arrow-down"
    },
    {
        text: "Ok",
        value: FunctionEnum.OK,
        icon: "mdi-image-filter-center-focus-strong"
    },
    {
        text: "Back",
        value: FunctionEnum.BACK,
        icon: "mdi-backspace"
    },
    {
        text: "Exit",
        value: FunctionEnum.EXIT,
        icon: "mdi-exit-to-app"
    },
    {
        text: "Volume Up",
        value: FunctionEnum.VOLUME_UP,
        icon: "mdi-volume-high"
    },
    {
        text: "Volume Down",
        value: FunctionEnum.VOLUME_DOWN,
        icon: "mdi-volume-low"
    },
    {
        text: "Mute",
        value: FunctionEnum.VOLUME_MUTE,
        icon: "mdi-volume-off"
    },
    {
        text: "Next Program",
        value: FunctionEnum.PROGRAM_UP,
        icon: "mdi-skip-next"
    },
    {
        text: "Previous Program",
        value: FunctionEnum.PROGRAM_DOWN,
        icon: "mdi-skip-previous"
    },
    {
        text: "Number 0",
        value: FunctionEnum.ZERO,
        icon: "mdi-numeric-0-box"
    },
    {
        text: "Number 1",
        value: FunctionEnum.ONE,
        icon: "mdi-numeric-1-box"
    },
    {
        text: "Number 2",
        value: FunctionEnum.TWO,
        icon: "mdi-numeric-2-box"
    },
    {
        text: "Number 3",
        value: FunctionEnum.THREE,
        icon: "mdi-numeric-3-box"
    },
    {
        text: "Number 4",
        value: FunctionEnum.FOUR,
        icon: "mdi-numeric-4-box"
    },
    {
        text: "Number 5",
        value: FunctionEnum.FIVE,
        icon: "mdi-numeric-5-box"
    },
    {
        text: "Number 6",
        value: FunctionEnum.SIX,
        icon: "mdi-numeric-6-box"
    },
    {
        text: "Number 7",
        value: FunctionEnum.SEVEN,
        icon: "mdi-numeric-7-box"
    },
    {
        text: "Number 8",
        value: FunctionEnum.EIGHT,
        icon: "mdi-numeric-8-box"
    },
    {
        text: "Number 9",
        value: FunctionEnum.NINE,
        icon: "mdi-numeric-9-box"
    },
    {
        text: "Play",
        value: FunctionEnum.PLAY,
        icon: "mdi-play"
    },
    {
        text: "Pause",
        value: FunctionEnum.PAUSE,
        icon: "mdi-pause"
    },
    {
        text: "Play / Pause",
        value: FunctionEnum.PLAY_PAUSE,
        icon: "mdi-play-pause"
    },
    {
        text: "Stop",
        value: FunctionEnum.STOP,
        icon: "mdi-stop"
    },
    {
        text: "Fast Forward",
        value: FunctionEnum.FAST_FORWARD,
        icon: "mdi-fast-forward"
    },
    {
        text: "Rewind",
        value: FunctionEnum.FAST_REWIND,
        icon: "mdi-rewind"
    },
    {
        text: "Subtitle",
        value: FunctionEnum.SUBTITLE,
        icon: "mdi-subtitles-outline"
    },
    {
        text: "Language",
        value: FunctionEnum.LANGUAGE,
        icon: "mdi-translate"
    },
    {
        text: "Menu",
        value: FunctionEnum.MENU,
        icon: "mdi-menu"
    }
];


export const functionMap = new Map<FunctionEnum, Function>();

functions.forEach((functionMapping) => functionMap.set(functionMapping.value, functionMapping));

export function textOfFunction(functionEnum: FunctionEnum): string | undefined {
    const func = functionMap.get(functionEnum);
    return func?.text;
}

export function iconOfFunction(functionEnum: FunctionEnum): string | undefined {
    const func = functionMap.get(functionEnum);
    return func?.icon;
}
