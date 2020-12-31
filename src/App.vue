<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-icon>mdi-remote</v-icon>&nbsp;Remote
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
        v-model="group"
      >
        <v-list-item
          v-for="remote in remotes"
          :key="remote.id"
          :to="`/remote/${remote.id}`"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-remote</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ remote.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/remote/add" v-if="inEditMode">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              Add Remote
            </v-list-item-content>
        </v-list-item>

      </v-list>
    
      <template v-slot:append>
        <div class="pb-6">
          <v-row justify="end">
            <v-spacer></v-spacer>
            <v-col cols="8" class="text-right">
              <v-switch
                v-model="editModeToggle"
                inset
                label="Edit Mode"
              ></v-switch>
            </v-col>
          </v-row>
        </div>
      </template>

    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <h1 class="font-weight-light"><v-icon>mdi-remote</v-icon>&nbsp;Remotes</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <transition>
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Remote } from './store/interface';

export default Vue.extend({
  name: 'App',

  components: {},

  mounted() {
    this.$store.dispatch("initializeFromLocalStore");
  },

  data: () => ({
    drawer: false,
    group: null,
    editModeToggle: false
  }),

  computed: {
    remotes(): Array<Remote> {
      return this.$store.state.remotes;
    },
    inEditMode(): boolean {
        return this.$store.state.inEditMode;
    }
  },

  watch: {
    group(): void {
      this.drawer = false;
    },
    editModeToggle(): void {
      if(this.editModeToggle) {
        this.$store.commit("enableEditMode");
      } else {
        this.$store.commit("disableEditMode");
      }
    }
  }
});
</script>
