import Vue from 'vue'
import Vuex from 'vuex'
import { remoteServiceClient } from '../protocol/DefinitionServiceClientPb';
import * as definition from '../protocol/definition_pb';
import { convertIscpStatus, convertTheater } from './conversion';
import { State, RemoteStatus, Theater, DescriptiveScene, Remote, Function, RemoteCommand, ISCPStatus } from "./interface";
import { toAPICommand, toAPIScene, toAPITheater } from './toAPIConversion';

Vue.use(Vuex);


const prefix = "remote-backend"
const remoteUUIDLocalStorageKey = `${prefix}:selected-remote-uuid`;
const remotesLocalStorageKey = `${prefix}:remotes`;


function setRemotes(state: State, remotes: Array<Remote>): void {
  state.remotes = remotes;
  localStorage.setItem(remotesLocalStorageKey, JSON.stringify(remotes));
}

function addScene(state: State, scene: DescriptiveScene): void {
  state.descriptiveScenes.push(scene);
}

function addSceneIfNecessary(state: State, scene: DescriptiveScene): void {
  const index = state.descriptiveScenes.findIndex(checkScene => scene.id == checkScene.id);
  if(index === -1) {
    addScene(state, scene);
  }
}

function removeScene(state: State, scene: DescriptiveScene): void {
  const descriptiveScenes = state.descriptiveScenes.filter((checkScene) => checkScene.id != scene.id);
  state.descriptiveScenes = descriptiveScenes;
}

function addTheater(state: State, theater: Theater): void {
  state.theaters.push(theater)
  theater.scenes.forEach((scene) => addSceneIfNecessary(state, scene));
}

function updateTheater(state: State, theater: Theater): void {
  const existingTheater = state.theaters.find((checkTheater) => checkTheater.id == theater.id);
  if(existingTheater == null) {
    throw new Error("Theater not found");
  }
  Vue.set(existingTheater, "name", theater.name);
  Vue.set(existingTheater, "sortKey", theater.sortKey);
  existingTheater.scenes.forEach((scene) => {
    const sceneInOther = theater.scenes.find((s) => s.id == scene.id)
    if(!sceneInOther) {
      removeScene(state, scene);
    }
  })
  Vue.set(existingTheater, "scenes", theater.scenes);
}

export default new Vuex.Store({
  state: {
    remotes: [],
    serviceURL: "https://apps.scolterius.net/ir-remote",
    selectedRemoteId: null,
    descriptiveScenes: [],
    iscpStatus: [],
    remoteStatus: null,
    theaters: [],
    selectedTheaterId: null,
    inEditMode: false,
    lastEnteredRC6Control: null,
    lastEnteredNecDeviceId: null,
    lastEnteredISCPCommand: null,
    lastEnteredISCPIdentifier: null,
    lastPlayedScene: null
  } as State,
  getters: {
    remoteService(state): remoteServiceClient {
      if(state.serviceURL === null) {
        throw new Error("Service URL must be set.");
      }
      return new remoteServiceClient(state.serviceURL);
    },
    selectedRemote(state): Remote | null {
      if(!state.selectedRemoteId) {
        return null;
      }

      return state.remotes.find((remote) => remote.id === state.selectedRemoteId) || null;
    },
    selectedTheater(state): Theater | null {
      if(!state.selectedTheaterId) {
        return null;
      }

      return state.theaters.find((theater) => theater.id === state.selectedTheaterId) || null;
    },
    defaultIscpIdentifier(state: State): string {
      let iscpIdentifier = "";
      const lastEnteredIscpStatus = state.lastEnteredISCPIdentifier;
      const iscpStatus = state.iscpStatus;
      const foundIscpStatus = iscpStatus.filter((status) => status.identifier == lastEnteredIscpStatus);
      if(lastEnteredIscpStatus && lastEnteredIscpStatus.length > 0 && (iscpStatus.length == 0 || foundIscpStatus.length > 0)) {
          iscpIdentifier = lastEnteredIscpStatus;
      } else if(iscpStatus.length > 0) {
          iscpIdentifier = iscpStatus[0].identifier;
      }
      iscpIdentifier = lastEnteredIscpStatus || iscpIdentifier;
      return iscpIdentifier
    }
  },
  mutations: {
    addRemote(state: State, remote: Remote): void {
      const foundRemote = state.remotes.find((storedRemote) => remote.id == storedRemote.id);
      const remotes = state.remotes;
      if(foundRemote) {
        Vue.set(foundRemote, "name", remote.name);
      } else {
        remotes.push(remote);
      }
      setRemotes(state, remotes);
    },
    setRemotes(state: State, remotes: Array<Remote>): void {
      setRemotes(state, remotes);
    },
    updateRemoteStatus(state: State, remoteStatus: RemoteStatus): void {
      state.remoteStatus = remoteStatus;
    },
    selectRemote(state: State, selectedRemoteId: string): void {
      state.selectedRemoteId = selectedRemoteId;
      state.iscpStatus = new Array<ISCPStatus>();
    },
    addTheater(state: State, theater: Theater): void {
      addTheater(state, theater);
    },
    updateOrAddTheater(state: State, theater: Theater): void {
      const existingTheater = state.theaters.find((checkTheater) => checkTheater.id == theater.id);
      if(existingTheater) {
        updateTheater(state, existingTheater);
      } else {
        addTheater(state, theater);
      }
    },
    updateTheater(state: State, theater: Theater): void {
      updateTheater(state, theater);
    },
    selectTheaterUUID(state: State, theaterID: string): void {
      state.selectedTheaterId = theaterID;
    },
    addScene(state: State, scene: DescriptiveScene): void {
      addScene(state, scene);
    },
    addSceneIfNecessary(state: State, scene: DescriptiveScene): void {
      addSceneIfNecessary(state, scene);
    },
    setDescriptiveScenes(state: State, scenes: Array<DescriptiveScene>): void {
      state.descriptiveScenes = scenes;
    },
    removeScene(state: State, scene: DescriptiveScene): void {
      removeScene(state, scene);
    },
    removeSceneById(state: State, sceneId: string): void {
      const toRemoveScene = state.descriptiveScenes.find((scene) => scene.id == sceneId);
      if(toRemoveScene !== undefined) {
        removeScene(state, toRemoveScene);
      }
    },
    clearTheaters(state: State): void {
      state.theaters = [];
    },
    enableEditMode(state: State): void {
      state.inEditMode = true;
    },
    disableEditMode(state: State): void {
      state.inEditMode = false;
    },
    updateLastEnteredNecDeviceId(state: State, deviceId: number): void {
      state.lastEnteredNecDeviceId = deviceId;
    },
    updateLastEnteredRC6Control(state: State, control: number): void {
      state.lastEnteredRC6Control = control;
    },
    updateLastEnteredISCPIdentifier(state: State, identifier: string): void {
      state.lastEnteredISCPIdentifier = identifier;
    },
    updateLastEnteredISCPCommand(state: State, command: string): void {
      state.lastEnteredISCPCommand = command;
    },
    scenePlayed(state: State, scene: DescriptiveScene): void {
      state.lastPlayedScene = scene;
    },
    resetIscpStatus(state: State): void {
      state.iscpStatus = new Array<ISCPStatus>();
    },
    addIscpStatus(state: State, iscpStatus: ISCPStatus): void {
      state.iscpStatus.push(iscpStatus);
    }
  },
  actions: {
    initializeFromLocalStore({dispatch, commit}) {
      const selectedRemoteUUID = localStorage.getItem(remoteUUIDLocalStorageKey);
      const storedRemotes = localStorage.getItem(remotesLocalStorageKey);
      if(storedRemotes !== null) {
        const remotes = JSON.parse(storedRemotes) as Array<Remote>;
        commit("setRemotes", remotes);
      }
      if(selectedRemoteUUID !== null) {
        dispatch("selectRemoteUUID", selectedRemoteUUID);
      }
    },
    resetScenes({getters, commit}): void {
      commit("setDescriptiveScenes", getters.selectedTheater?.scenes || []);
    },
    selectRemoteUUID({commit, getters, dispatch}, remoteID: string): void {
      if(this.state.selectedRemoteId === remoteID) {
        return;
      }

      const remoteService: remoteServiceClient = getters.remoteService;
      const remoteGet = new definition.remoteQueryParams();
      remoteGet.setId(remoteID);
      remoteService.getRemote(remoteGet, null)
                    .then((remoteResponse) => {
                      commit("selectRemote", remoteResponse.getId());
                      dispatch("fetchTheaters");
                    });
    },
    fetchTheaters({commit, state, getters}): void {
      if(state.selectedRemoteId === null) {
        return;
      }
      const remoteService: remoteServiceClient = getters.remoteService;
      const remoteGet = new definition.remoteQueryParams();
      remoteGet.setId(state.selectedRemoteId);
      remoteService.getTheatersOf(remoteGet, null).then((theaters) => {
        const theaterList = theaters.getTheatersList().map(convertTheater);
        commit("clearTheaters");
        theaterList.forEach((theater) => commit("addTheater", theater));
      });
    },
    updateTheater({commit, getters, state}, theater: Theater): void {
      if(!state.selectedRemoteId) {
        throw new Error("Remote must be selected");
      }
      const theaterQueryParams = new definition.setTheaterQueryParams();
      theaterQueryParams.setRemoteid(state.selectedRemoteId);
      theaterQueryParams.setTheater(toAPITheater(theater));
      const remoteService: remoteServiceClient = getters.remoteService;
      remoteService.setTheater(theaterQueryParams, null).then(function(theatersResponse) {
        const theaterList = theatersResponse.getTheatersList().map(convertTheater);
        theaterList.forEach((theater) => commit("updateOrAddTheater", theater));
      });
    },
    sendFunction({state, getters, commit}, func: Function): void {
      if(!state.selectedRemoteId) {
        throw new Error("Remote must be selected");
      }
      const scenes: Array<DescriptiveScene> = getters.selectedTheater.scenes;
      const scene = scenes.find((scene) => scene.function == func);
      const remoteScene = scene?.scene;
      if(!remoteScene) {
        throw new Error("Remote scene must be set");
      }
      const remoteService: remoteServiceClient = getters.remoteService;
      const playSceneParams = new definition.playSceneParams();
      playSceneParams.setRemoteid(state.selectedRemoteId);
      playSceneParams.setScene(toAPIScene(remoteScene));
      remoteService.playScene(playSceneParams, null).then(function() {
        commit("scenePlayed", scene);
      });
    },
    sendCommand({state, getters}, command: RemoteCommand): void {
      if(!state.selectedRemoteId) {
        throw new Error("Remote must be selected");
      }

      const remoteService: remoteServiceClient = getters.remoteService;
      const playCommandParams = new definition.playCommandParams();
      playCommandParams.setRemoteid(state.selectedRemoteId);
      playCommandParams.setCommand(toAPICommand(command));
      remoteService.playCommand(playCommandParams, null);
    },
    queryISCPStatus({state, getters, commit}): void {
      if(!state.selectedRemoteId) {
        throw new Error("Remote must be selected");
      }

      const remoteService: remoteServiceClient = getters.remoteService;
      const params = new definition.remoteQueryParams();
      params.setId(state.selectedRemoteId);
      remoteService.getIscpStatusOf(params, null).then(function(iscpStatusResponse: definition.IscpStatusResponse) {
        const iscpStatusList = iscpStatusResponse.getDevicesList();
        const convertedIscpStatusList = iscpStatusList.map(convertIscpStatus);
        commit("resetIscpStatus");
        convertedIscpStatusList.forEach((iscpStatus) => commit("addIscpStatus", iscpStatus));
      });
    }
  },
  modules: {
  }
})
