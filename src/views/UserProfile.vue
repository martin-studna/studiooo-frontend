<template>
  <div class="user-dashboard__content">
    <div class="heading">
      <h1 style="">Můj profil</h1>
    </div>
    <div class="profile__body">
      <div class="body__content">
        <div style="margin-bottom: 40px">
          <h2>Osobní</h2>
          <div style="margin-bottom: 20px;  color: #808b9d">
            Toto jméno bude uvedeno na oficiálním certifikátu Digitální garáže.
          </div>
          <div class="personal-inputs">
            <Input placeholder="Jméno" v-model:value="firstname" class="firstname-input" />
            <Input placeholder="Příjmení" v-model:value="lastname" class="lastname-input" />
            <!-- <Input /> -->
          </div>
          <div style=" color: #808b9d; font-size: 12px">
            Jméno je možné po dokončení kurzu změnit. Taková změna se zaznamená,
            aby bylo možné zajistit platnost certifikace.
          </div>
          <Select
            class="gender-select"
            style="margin-top: .7rem"
            placeholder="Pohlaví"
            :values="[
              '--',
              'Muž',
              'Žena',
              'Jiné'
            ]"
            v-model:value="gender"/>
        </div>
        <hr />
        <div style="margin-bottom: 40px">
          <h2>Profesní</h2>
            <Input placeholder="Studuji na" v-model:value="school" class="profession-input" />
            <Input placeholder="Obor" v-model:value="field" class="profession-input" />
            <Input placeholder="Pracuji jako" v-model:value="employment" class="profession-input" />
            <Input placeholder="Instituce" v-model:value="institution" class="profession-input" />
            <Input placeholder="Titul" v-model:value="title" class="profession-input" />
        </div>

        <hr />
        <div style="margin-bottom: 40px">
          <h2>Přihlašovací údaje</h2>
          <button style="background: transparent; color: black; margin-right: 1rem" @click="changePassword" class="change-button">
            Změnit heslo
          </button>
          <button style="background: transparent; color: black" @click="deleteProfile" class="delete-button">
            Smazat účet
          </button>
        </div>
        <hr />
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 80px;
          ">
          <button @click="send">Uložit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
import server from '../common/server';

export default {
  components: { Input, Select },
  name: 'UserProfile',
  async created() {
    try {
      const response = await server.get('auth/me');
      this.fullname = response.data.fullname;
      this.title = response.data.title
      this.employment = response.data.employment
      this.school = response.data.school
      this.field = response.data.field
      this.gender = response.data.gender

      if (this.gender === "MALE") this.gender = "Muž"
      else if (this.gender === "FEMALE") this.gender = "Žena"

      this.institution = response.data.institution
      const tokens = this.fullname.split(' ');
      if (tokens.length >= 1) this.firstname = tokens[0];
      if (tokens.length >= 2) this.lastname = tokens[1];
    } catch (error) {
      console.log("not logged in");
    }
  },
  data() {
    return {
      fullname: '',
      firstname: '',
      lastname: '',
      gender: '--',
      title: '',
      employment: '',
      school: '',
      field: '',
      institution: ''
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapMutations(['SET_VISIBLE_CHANGE_PASSWORD_MODAL','SET_VISIBLE_DELETE_PROFILE_MODAL']),
    ...mapActions(['updateUser']),
    changePassword() {
      this.SET_VISIBLE_CHANGE_PASSWORD_MODAL(true)
    },
    deleteProfile() {
      this.SET_VISIBLE_DELETE_PROFILE_MODAL(true)
    },
    send() {
      const updates = {
        fullname: `${this.firstname} ${this.lastname}`,
        title: this.title,
        employment: this.employment,
        school: this.school,
        field: this.field,
        institution: this.institution,
      }
      this.updateUser({id: this.user.id, updates})
      this.$router.push({ path: '/user' })
    }
  }
};
</script>

<style lang="scss" scoped>

.profession-input {
  margin-bottom: .7rem;
}

.user-dashboard {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}

.heading {
  width: 100%;
  display: flex;
  align-items: center;
  height: 140px;
}

.profile__body {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    max-width: 800px;
  }
}

.personal-inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

#app {
  padding: 0 !important;
}


@media (max-width: 768px) {
  h1 {
    margin-top: 9rem !important;
  }


  .profile__body {
    padding-right: 0;
  }

  .firstname-input {
    margin-bottom: 1rem;
    width: 100% !important;
  }

  .gender-select {
    width: 100% !important;
  }

  .lastname-input {
    width: 100% !important;
  }

  .profession-input {
    width: 100% !important;
  }

  .personal-inputs {
    flex-direction: column;
  }

}

@media (max-width: 320px) {
  .change-button {
    margin-bottom: 1rem;
    width: 100%;
  }
  .delete-button {
    width: 100% !important;
  }
}
</style>
