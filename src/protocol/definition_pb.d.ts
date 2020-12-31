import * as jspb from 'google-protobuf'



export class Remote extends jspb.Message {
  getId(): string;
  setId(value: string): Remote;

  getMqtttopicprefix(): string;
  setMqtttopicprefix(value: string): Remote;

  getName(): string;
  setName(value: string): Remote;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Remote.AsObject;
  static toObject(includeInstance: boolean, msg: Remote): Remote.AsObject;
  static serializeBinaryToWriter(message: Remote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Remote;
  static deserializeBinaryFromReader(message: Remote, reader: jspb.BinaryReader): Remote;
}

export namespace Remote {
  export type AsObject = {
    id: string,
    mqtttopicprefix: string,
    name: string,
  }
}

export class RemoteStatus extends jspb.Message {
  getRemoteid(): string;
  setRemoteid(value: string): RemoteStatus;

  getOnline(): boolean;
  setOnline(value: boolean): RemoteStatus;

  getLifesign(): string;
  setLifesign(value: string): RemoteStatus;

  getLastcommand(): Command | undefined;
  setLastcommand(value?: Command): RemoteStatus;
  hasLastcommand(): boolean;
  clearLastcommand(): RemoteStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoteStatus.AsObject;
  static toObject(includeInstance: boolean, msg: RemoteStatus): RemoteStatus.AsObject;
  static serializeBinaryToWriter(message: RemoteStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoteStatus;
  static deserializeBinaryFromReader(message: RemoteStatus, reader: jspb.BinaryReader): RemoteStatus;
}

export namespace RemoteStatus {
  export type AsObject = {
    remoteid: string,
    online: boolean,
    lifesign: string,
    lastcommand?: Command.AsObject,
  }
}

export class Command extends jspb.Message {
  getName(): string;
  setName(value: string): Command;

  getCommand(): NECCommand | undefined;
  setCommand(value?: NECCommand): Command;
  hasCommand(): boolean;
  clearCommand(): Command;

  getRc6Command(): RC6Command | undefined;
  setRc6Command(value?: RC6Command): Command;
  hasRc6Command(): boolean;
  clearRc6Command(): Command;

  getIscpCommand(): ISCPCommand | undefined;
  setIscpCommand(value?: ISCPCommand): Command;
  hasIscpCommand(): boolean;
  clearIscpCommand(): Command;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Command.AsObject;
  static toObject(includeInstance: boolean, msg: Command): Command.AsObject;
  static serializeBinaryToWriter(message: Command, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Command;
  static deserializeBinaryFromReader(message: Command, reader: jspb.BinaryReader): Command;
}

export namespace Command {
  export type AsObject = {
    name: string,
    command?: NECCommand.AsObject,
    rc6Command?: RC6Command.AsObject,
    iscpCommand?: ISCPCommand.AsObject,
  }
}

export class NECCommand extends jspb.Message {
  getDeviceid(): number;
  setDeviceid(value: number): NECCommand;

  getCommand(): number;
  setCommand(value: number): NECCommand;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NECCommand.AsObject;
  static toObject(includeInstance: boolean, msg: NECCommand): NECCommand.AsObject;
  static serializeBinaryToWriter(message: NECCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NECCommand;
  static deserializeBinaryFromReader(message: NECCommand, reader: jspb.BinaryReader): NECCommand;
}

export namespace NECCommand {
  export type AsObject = {
    deviceid: number,
    command: number,
  }
}

export class RC6Command extends jspb.Message {
  getMode(): number;
  setMode(value: number): RC6Command;

  getControl(): number;
  setControl(value: number): RC6Command;

  getInformation(): number;
  setInformation(value: number): RC6Command;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RC6Command.AsObject;
  static toObject(includeInstance: boolean, msg: RC6Command): RC6Command.AsObject;
  static serializeBinaryToWriter(message: RC6Command, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RC6Command;
  static deserializeBinaryFromReader(message: RC6Command, reader: jspb.BinaryReader): RC6Command;
}

export namespace RC6Command {
  export type AsObject = {
    mode: number,
    control: number,
    information: number,
  }
}

export class ISCPCommand extends jspb.Message {
  getIdentifier(): string;
  setIdentifier(value: string): ISCPCommand;

  getCommand(): string;
  setCommand(value: string): ISCPCommand;

  getArgument(): string;
  setArgument(value: string): ISCPCommand;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ISCPCommand.AsObject;
  static toObject(includeInstance: boolean, msg: ISCPCommand): ISCPCommand.AsObject;
  static serializeBinaryToWriter(message: ISCPCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ISCPCommand;
  static deserializeBinaryFromReader(message: ISCPCommand, reader: jspb.BinaryReader): ISCPCommand;
}

export namespace ISCPCommand {
  export type AsObject = {
    identifier: string,
    command: string,
    argument: string,
  }
}

export class Scene extends jspb.Message {
  getInstructionsList(): Array<Instruction>;
  setInstructionsList(value: Array<Instruction>): Scene;
  clearInstructionsList(): Scene;
  addInstructions(value?: Instruction, index?: number): Instruction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Scene.AsObject;
  static toObject(includeInstance: boolean, msg: Scene): Scene.AsObject;
  static serializeBinaryToWriter(message: Scene, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Scene;
  static deserializeBinaryFromReader(message: Scene, reader: jspb.BinaryReader): Scene;
}

export namespace Scene {
  export type AsObject = {
    instructionsList: Array<Instruction.AsObject>,
  }
}

export class Repeat extends jspb.Message {
  getTimes(): number;
  setTimes(value: number): Repeat;

  getInstruction(): Instruction | undefined;
  setInstruction(value?: Instruction): Repeat;
  hasInstruction(): boolean;
  clearInstruction(): Repeat;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Repeat.AsObject;
  static toObject(includeInstance: boolean, msg: Repeat): Repeat.AsObject;
  static serializeBinaryToWriter(message: Repeat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Repeat;
  static deserializeBinaryFromReader(message: Repeat, reader: jspb.BinaryReader): Repeat;
}

export namespace Repeat {
  export type AsObject = {
    times: number,
    instruction?: Instruction.AsObject,
  }
}

export class Instruction extends jspb.Message {
  getCommand(): Command | undefined;
  setCommand(value?: Command): Instruction;
  hasCommand(): boolean;
  clearCommand(): Instruction;

  getScene(): Scene | undefined;
  setScene(value?: Scene): Instruction;
  hasScene(): boolean;
  clearScene(): Instruction;

  getRepeat(): Repeat | undefined;
  setRepeat(value?: Repeat): Instruction;
  hasRepeat(): boolean;
  clearRepeat(): Instruction;

  getWait(): Wait | undefined;
  setWait(value?: Wait): Instruction;
  hasWait(): boolean;
  clearWait(): Instruction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Instruction.AsObject;
  static toObject(includeInstance: boolean, msg: Instruction): Instruction.AsObject;
  static serializeBinaryToWriter(message: Instruction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Instruction;
  static deserializeBinaryFromReader(message: Instruction, reader: jspb.BinaryReader): Instruction;
}

export namespace Instruction {
  export type AsObject = {
    command?: Command.AsObject,
    scene?: Scene.AsObject,
    repeat?: Repeat.AsObject,
    wait?: Wait.AsObject,
  }
}

export class Wait extends jspb.Message {
  getSeconds(): number;
  setSeconds(value: number): Wait;

  getMilliseconds(): number;
  setMilliseconds(value: number): Wait;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Wait.AsObject;
  static toObject(includeInstance: boolean, msg: Wait): Wait.AsObject;
  static serializeBinaryToWriter(message: Wait, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Wait;
  static deserializeBinaryFromReader(message: Wait, reader: jspb.BinaryReader): Wait;
}

export namespace Wait {
  export type AsObject = {
    seconds: number,
    milliseconds: number,
  }
}

export class DescriptiveScene extends jspb.Message {
  getId(): string;
  setId(value: string): DescriptiveScene;

  getName(): string;
  setName(value: string): DescriptiveScene;

  getDescription(): string;
  setDescription(value: string): DescriptiveScene;

  getSortkey(): number;
  setSortkey(value: number): DescriptiveScene;

  getScene(): Scene | undefined;
  setScene(value?: Scene): DescriptiveScene;
  hasScene(): boolean;
  clearScene(): DescriptiveScene;

  getFunction(): Function;
  setFunction(value: Function): DescriptiveScene;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DescriptiveScene.AsObject;
  static toObject(includeInstance: boolean, msg: DescriptiveScene): DescriptiveScene.AsObject;
  static serializeBinaryToWriter(message: DescriptiveScene, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DescriptiveScene;
  static deserializeBinaryFromReader(message: DescriptiveScene, reader: jspb.BinaryReader): DescriptiveScene;
}

export namespace DescriptiveScene {
  export type AsObject = {
    id: string,
    name: string,
    description: string,
    sortkey: number,
    scene?: Scene.AsObject,
    pb_function: Function,
  }
}

export class Theater extends jspb.Message {
  getId(): string;
  setId(value: string): Theater;

  getName(): string;
  setName(value: string): Theater;

  getRemoteid(): string;
  setRemoteid(value: string): Theater;

  getSortkey(): number;
  setSortkey(value: number): Theater;

  getScenesList(): Array<DescriptiveScene>;
  setScenesList(value: Array<DescriptiveScene>): Theater;
  clearScenesList(): Theater;
  addScenes(value?: DescriptiveScene, index?: number): DescriptiveScene;

  getIcon(): string;
  setIcon(value: string): Theater;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Theater.AsObject;
  static toObject(includeInstance: boolean, msg: Theater): Theater.AsObject;
  static serializeBinaryToWriter(message: Theater, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Theater;
  static deserializeBinaryFromReader(message: Theater, reader: jspb.BinaryReader): Theater;
}

export namespace Theater {
  export type AsObject = {
    id: string,
    name: string,
    remoteid: string,
    sortkey: number,
    scenesList: Array<DescriptiveScene.AsObject>,
    icon: string,
  }
}

export class TheatersResponse extends jspb.Message {
  getTheatersList(): Array<Theater>;
  setTheatersList(value: Array<Theater>): TheatersResponse;
  clearTheatersList(): TheatersResponse;
  addTheaters(value?: Theater, index?: number): Theater;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TheatersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TheatersResponse): TheatersResponse.AsObject;
  static serializeBinaryToWriter(message: TheatersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TheatersResponse;
  static deserializeBinaryFromReader(message: TheatersResponse, reader: jspb.BinaryReader): TheatersResponse;
}

export namespace TheatersResponse {
  export type AsObject = {
    theatersList: Array<Theater.AsObject>,
  }
}

export class IscpStatus extends jspb.Message {
  getIdentifier(): string;
  setIdentifier(value: string): IscpStatus;

  getModelname(): string;
  setModelname(value: string): IscpStatus;

  getAreacode(): string;
  setAreacode(value: string): IscpStatus;

  getDevicecategory(): string;
  setDevicecategory(value: string): IscpStatus;

  getIscpport(): string;
  setIscpport(value: string): IscpStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IscpStatus.AsObject;
  static toObject(includeInstance: boolean, msg: IscpStatus): IscpStatus.AsObject;
  static serializeBinaryToWriter(message: IscpStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IscpStatus;
  static deserializeBinaryFromReader(message: IscpStatus, reader: jspb.BinaryReader): IscpStatus;
}

export namespace IscpStatus {
  export type AsObject = {
    identifier: string,
    modelname: string,
    areacode: string,
    devicecategory: string,
    iscpport: string,
  }
}

export class IscpStatusResponse extends jspb.Message {
  getDevicesList(): Array<IscpStatus>;
  setDevicesList(value: Array<IscpStatus>): IscpStatusResponse;
  clearDevicesList(): IscpStatusResponse;
  addDevices(value?: IscpStatus, index?: number): IscpStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IscpStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IscpStatusResponse): IscpStatusResponse.AsObject;
  static serializeBinaryToWriter(message: IscpStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IscpStatusResponse;
  static deserializeBinaryFromReader(message: IscpStatusResponse, reader: jspb.BinaryReader): IscpStatusResponse;
}

export namespace IscpStatusResponse {
  export type AsObject = {
    devicesList: Array<IscpStatus.AsObject>,
  }
}

export class remoteQueryParams extends jspb.Message {
  getId(): string;
  setId(value: string): remoteQueryParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): remoteQueryParams.AsObject;
  static toObject(includeInstance: boolean, msg: remoteQueryParams): remoteQueryParams.AsObject;
  static serializeBinaryToWriter(message: remoteQueryParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): remoteQueryParams;
  static deserializeBinaryFromReader(message: remoteQueryParams, reader: jspb.BinaryReader): remoteQueryParams;
}

export namespace remoteQueryParams {
  export type AsObject = {
    id: string,
  }
}

export class playSceneParams extends jspb.Message {
  getRemoteid(): string;
  setRemoteid(value: string): playSceneParams;

  getScene(): Scene | undefined;
  setScene(value?: Scene): playSceneParams;
  hasScene(): boolean;
  clearScene(): playSceneParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): playSceneParams.AsObject;
  static toObject(includeInstance: boolean, msg: playSceneParams): playSceneParams.AsObject;
  static serializeBinaryToWriter(message: playSceneParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): playSceneParams;
  static deserializeBinaryFromReader(message: playSceneParams, reader: jspb.BinaryReader): playSceneParams;
}

export namespace playSceneParams {
  export type AsObject = {
    remoteid: string,
    scene?: Scene.AsObject,
  }
}

export class playCommandParams extends jspb.Message {
  getRemoteid(): string;
  setRemoteid(value: string): playCommandParams;

  getCommand(): Command | undefined;
  setCommand(value?: Command): playCommandParams;
  hasCommand(): boolean;
  clearCommand(): playCommandParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): playCommandParams.AsObject;
  static toObject(includeInstance: boolean, msg: playCommandParams): playCommandParams.AsObject;
  static serializeBinaryToWriter(message: playCommandParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): playCommandParams;
  static deserializeBinaryFromReader(message: playCommandParams, reader: jspb.BinaryReader): playCommandParams;
}

export namespace playCommandParams {
  export type AsObject = {
    remoteid: string,
    command?: Command.AsObject,
  }
}

export class PlayResponse extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): PlayResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PlayResponse): PlayResponse.AsObject;
  static serializeBinaryToWriter(message: PlayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayResponse;
  static deserializeBinaryFromReader(message: PlayResponse, reader: jspb.BinaryReader): PlayResponse;
}

export namespace PlayResponse {
  export type AsObject = {
    ok: boolean,
  }
}

export class setTheaterQueryParams extends jspb.Message {
  getRemoteid(): string;
  setRemoteid(value: string): setTheaterQueryParams;

  getTheater(): Theater | undefined;
  setTheater(value?: Theater): setTheaterQueryParams;
  hasTheater(): boolean;
  clearTheater(): setTheaterQueryParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): setTheaterQueryParams.AsObject;
  static toObject(includeInstance: boolean, msg: setTheaterQueryParams): setTheaterQueryParams.AsObject;
  static serializeBinaryToWriter(message: setTheaterQueryParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): setTheaterQueryParams;
  static deserializeBinaryFromReader(message: setTheaterQueryParams, reader: jspb.BinaryReader): setTheaterQueryParams;
}

export namespace setTheaterQueryParams {
  export type AsObject = {
    remoteid: string,
    theater?: Theater.AsObject,
  }
}

export class removeTheaterQueryParams extends jspb.Message {
  getRemoteid(): string;
  setRemoteid(value: string): removeTheaterQueryParams;

  getTheaterid(): string;
  setTheaterid(value: string): removeTheaterQueryParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): removeTheaterQueryParams.AsObject;
  static toObject(includeInstance: boolean, msg: removeTheaterQueryParams): removeTheaterQueryParams.AsObject;
  static serializeBinaryToWriter(message: removeTheaterQueryParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): removeTheaterQueryParams;
  static deserializeBinaryFromReader(message: removeTheaterQueryParams, reader: jspb.BinaryReader): removeTheaterQueryParams;
}

export namespace removeTheaterQueryParams {
  export type AsObject = {
    remoteid: string,
    theaterid: string,
  }
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
  FAST_REWIND = 36,
}
