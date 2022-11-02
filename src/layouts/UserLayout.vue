<template>
  <div>
    <AdditionalInfoModal v-if="!user.formShown && !user.firstLogin && !disappearAdditionalInfo" @disappear-additional-info-modal="disappearInfo" />
    <DeleteProfileModal v-if="visibleDeleteProfileModal" />
    <SkipChaptersModal v-if="visibleSkipChaptersModal"/>
    <ChangePasswordModal :class="{hidden: !visibleChangePasswordModal}"  />
     <status-modal style="z-index: 10000" v-if="visibleStatusModal"/>
    <div :class="{ 'user-dashboard': true, overlay: ((!user.formShown && !user.firstLogin && !disappearAdditionalInfo) || visibleDeleteProfileModal || visibleSkipChaptersModal || visibleChangePasswordModal || visibleErrorModal ) }">
      <LeftPanel />
      <MobilePanel />

      <router-view v-slot="{ Component }" class="user-dashboard__content">
          <transition name="slide-fade" mode="out-in" >
            <component :is="Component"/>
          </transition>
        </router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AdditionalInfoModal from '../components/AdditionalInfoModal.vue';
import DeleteProfileModal from '../components/DeleteProfileModal.vue';
import ChangePasswordModal from '../components/ChangePasswordModal.vue';
import LeftPanel from '../components/LeftPanel.vue';
import MobilePanel from '../components/MobilePanel.vue';
import SkipChaptersModal from '../components/SkipChaptersModal.vue';
import StatusModal from '../components/StatusModal.vue';

export default {
  components: { LeftPanel, AdditionalInfoModal, DeleteProfileModal, SkipChaptersModal, MobilePanel, ChangePasswordModal, StatusModal },
  name: 'UserDashboard',
  computed: {
    ...mapGetters(['user', 'visibleDeleteProfileModal','visibleSkipChaptersModal', 'visibleChangePasswordModal', 'visibleErrorModal', 'visibleStatusModal']),
  },
  data() {
    return {
      fullname: '',
      disappearAdditionalInfo: false
    };
  },
  methods: {
    disappearInfo() {
      this.disappearAdditionalInfo = true
    }
  }
};
</script>

<style lang="scss" scoped>


.list-enter,
.list-leave-to {
  visibility: hidden;
  opacity: 0;
}

.list-enter-from {
  visibility: hidden;
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}


.overlay {
  opacity: 0.5;

  filter: opacity(0.5);
  filter: blur(6px);
}

.user-dashboard {
  display: flex;
  flex-direction: row;
  min-height: 100vh !important;
  width: 100%;
  flex: 1;

  &__content {
    margin: 0 2.5rem;
    width: 100% !important;
  }
}

.heading {
  width: 100%;
  display: flex;
  align-items: center;
  height: 140px;
}

.content {
  background: $color4;
  padding: 40px 60px;
  border-radius: 40px;
  margin-top: 40px;
  position: relative;

  &__title {
    margin-block-start: 0 !important;
  }

  &__image {
    position: absolute;
    top: -210px;
    right: 30px;
    max-width: 700px;
    max-height: 700px;
    z-index: 1;
  }

  &__description {
    color: $color2;
    margin-bottom: 70px;
  }
}

#app {
  padding: 0 !important;
}
@media (max-width: 1024px) {
  .user-dashboard {


  &__content {
    margin: 0 1rem;
  }
}
}
</style>
