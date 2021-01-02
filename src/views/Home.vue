<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { Remote } from '@/store/interface';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    remote: function(): Remote | undefined {
      const remotes = this.$store.getters.remotes;
      if(remotes && remotes.length) {
        return remotes[0];
      }
      return undefined;
    }
  },
  mounted: function() {
    const remote: Remote | undefined = (this as any).remote;
    if(this.$store.getters.selectedRemoteId) {
      this.$router.push({name: "remote/view", params: {"remoteId": this.$store.getters.selectedRemoteId}});
    } else if(remote) {
      this.$router.push({name: "remote/view", params: {"remoteId": remote.id}})
    }
  }
})
export default class Home extends Vue {}
</script>
