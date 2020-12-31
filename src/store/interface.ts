export interface RemoteCommand {
    type: "RemoteCommand";
    id: string | undefined;
    name: string;
    command: NECCommand | null;
    rc6Command: RC6Command | null;
    iscpCommand: ISCPCommand | null;
}

export interface NECCommand {
    deviceId: number;
    command: number;
}

export interface RC6Command {
    mode: number;
    control: number;
    information: number;
}

// eslint-disable-next-line
export interface ISCPCommand {
    identifier: string;
    command: string;
    argument: string;
}

export interface RemoteWait {
    type: "RemoteWait";
    id: string | undefined;
    seconds: number;
    milliseconds: number;
}

export interface RemoteRepeat {
    type: "RemoteRepeat";
    times: number;
    instruction: Instruction;
}

export interface RemoteScene {
    type: "RemoteScene";
    instructions: Array<Instruction>;
}

export type Instruction = RemoteCommand | RemoteScene | RemoteRepeat | RemoteWait;

export interface DescriptiveScene {
    id: string;
    name: string;
    description: string;
    sortKey: number;
    scene: RemoteScene;
    function: Function | null;
}

export interface Theater {
    id: string;
    name: string;
    sortKey: number;
    scenes: Array<DescriptiveScene>;
    icon: string | undefined;
}

export enum Function {
    POWER_TOGGLE = 0,
    UP = 1,
    RIGHT = 2,
    DOWN = 3,
    LEFT = 4,
    OK = 5,
    BACK = 6,
    EXIT = 7,
    POWER_ON = 8,
    POWER_OFF = 9,
    VOLUME_UP = 10,
    VOLUME_DOWN = 11,
    PROGRAM_UP = 12,
    PROGRAM_DOWN = 13,
    ZERO = 20,
    ONE = 21,
    TWO = 22,
    THREE = 23,
    FOUR = 24,
    FIVE = 25,
    SIX = 26,
    SEVEN = 27,
    EIGHT = 28,
    NINE = 29,
    VOLUME_MUTE = 30,
    PLAY = 31,
    PAUSE = 32,
    PLAY_PAUSE = 33,
    STOP = 34,
    FAST_FORWARD = 35,
    FAST_REWIND = 36
}

// eslint-disable-next-line
export interface ISCPStatus {
    identifier: string;
    modelName: string;
    areaCode: string;
    deviceCategory: string;
    iscpPort: string;
}

export interface RemoteStatus {
    remoteId: string;
    online: boolean;
    lifesign: Date | null;
    lastCommand: RemoteCommand;
}

export interface Remote {
    id: string;
    name: string;
}

export interface State {
    remotes: Array<Remote>;
    serviceURL: null | string;
    selectedRemoteId: null | string;
    descriptiveScenes: Array<DescriptiveScene>;
    iscpStatus: Array<ISCPStatus>;
    remoteStatus: null | RemoteStatus;
    theaters: Array<Theater>;
    selectedTheaterId: null | string;
    inEditMode: boolean;
    lastEnteredNecDeviceId: null | number;
    lastEnteredRC6Control: null | number;
    lastEnteredISCPIdentifier: null | string;
    lastEnteredISCPCommand: null | string;
    lastPlayedScene: null | DescriptiveScene;
}
