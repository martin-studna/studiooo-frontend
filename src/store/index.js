import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import server from '../common/server';

export default createStore({
  plugins: [createPersistedState()],
  state: {
    workshops: [],
    user: null,
    redirectToWorkshop: false,
    currentWorkshop: null,
    currentChapter: null,
    currentCertificate: null,
    currentChapterIndex: 0,
    chapterResults: [],
    workshopsStats: [],
    workshopResult: null,
    showSuccessHome: false,
    certificates: [],
    fullname: "",
    title: "",
    authenticated: false,
    email: "",
    password: "",
    visibleDeleteProfileModal: false,
    visibleSkipChaptersModal: false,
    visibleChangePasswordModal: false,
    visibleStatusModal: false,
    visibleErrorModal: false,
    successTitle: "",
    successMessage: "",
    errorTitle: "",
    errorMessage: ""
  },
  mutations: {
    SET_SHOW_SUCCESS_HOME_MODAL(state,payload) {
      state.showSuccessHome = payload
    },
    SET_REDIRECT(state,payload) {
      state.redirectToWorkshop = payload
    },
    SET_WORKSHOPS(state, payload) {
      state.workshops = payload
    },
    SET_AUTHENTICATED(state, payload) {
      state.authenticated = payload
    },
    SET_CERTIFICATES(state, payload) {
      state.certificates = payload
    },
    UPDATE_USER(state, payload) {
      state.user = { ...state.user, ...payload }
    },
    SET_VISIBLE_DELETE_PROFILE_MODAL(state, payload) {
      state.visibleDeleteProfileModal = payload
    },
    SET_VISIBLE_SUCCESS(state, payload) {
      state.visibleSuccess = payload
    },
    SET_VISIBLE_STATUS_MODAL(state, payload) {
      state.visibleStatusModal = payload
    },
    SET_VISIBLE_ERROR_MODAL(state, payload) {
      state.visibleErrorModal = payload
    },
    SET_SUCCESS_MESSAGE(state, payload) {
      state.successMessage = payload
    },
    SET_ERROR_MESSAGE(state, payload) {
      state.errorMessage = payload
    },
    SET_SUCCESS_TITLE(state, payload) {
      state.successTitle = payload
    },
    SET_ERROR_TITLE(state, payload) {
      state.errorTitle = payload
    },
    SET_VISIBLE_CHANGE_PASSWORD_MODAL(state, payload) {
      state.visibleChangePasswordModal = payload
    },
    SET_VISIBLE_SUCCESS_MESSAGE_MODAL(state, payload) {
      state.visibleSuccessModal = payload
    },
    SET_VISIBLE_ERROR_MESSAGE_MODAL(state, payload) {
      state.visibleErrorModal = payload
    },
    SET_VISIBLE_SKIP_CHAPTERS_MODAL(state, payload) {
      state.visibleSkipChaptersModal = payload
    },
    SET_CHAPTER_RESULTS(state, payload) {
      state.chapterResults = payload
    },
    SET_WORKSHOP_RESULT(state, payload) {
      state.workshopResult = payload
    },
    UPDATE_CHAPTER_RESULT(state, payload) {
      state.chapterResults[payload.index] = payload.data
    },
    ADD_CHAPTER_RESULT(state, payload) {
      state.chapterResults.push(payload)
    },
    SET_CURRENT_WORKSHOP(state, payload) {
      state.currentWorkshop = payload;
    },
    SET_CURRENT_CHAPTER(state, payload) {
      state.currentChapter = payload;
    },
    SET_WORKSHOPS_STATS(state, payload) {
      state.workshopsStats = payload
    },
    SET_CURRENT_CERTIFICATE(state, payload) {
      state.currentCertificate = payload;
    },
    UPDATE_CURRENT_CHAPTER(state,payload) {
      state.currentChapter = { ...state.currentChapter, ...payload }
    },
    SET_CURRENT_CHAPTER_INDEX(state, payload) {
      state.currentChapterIndex = payload;
    },
    SET_EMAIL(state,payload) {
      state.email = payload
    },
    SET_TITLE(state,payload) {
      state.title = payload
    },
    SET_FULLNAME(state,payload) {
      state.fullname = payload
    },
    SET_PASSWORD(state,payload) {
      state.password = payload
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async setWorkshops(context, { skip, limit }) {
      try {
        const response = await server.get(`/workshops?skip=${skip}&limit=${limit}`);
        const workshops = response.data;
        context.commit('SET_WORKSHOPS', workshops);
      } catch (error) {
        console.error(error);
      }
    },
    async getCertificates(context, { userId }) {
      try {
        const response = await server.get(`/users/${userId}/certificates`)
        context.commit('SET_CERTIFICATES', response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getWorkshop(context, { id }) {
      try {
        const response = await server.get(`/workshops/${id}`);
        const workshop = response.data;
        context.commit('SET_CURRENT_WORKSHOP', workshop);
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser(context, { id, updates }) {
      try {
        const response = await server.put(`/users/${id}`, updates);
        context.commit('UPDATE_USER', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getWorkshopResult(context, { userId, workshopId }) {
      try {
        const response = await server.get(`/workshop-results?userid=${userId}&workshopid=${workshopId}`)
        context.commit('SET_WORKSHOP_RESULT', response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getWorkshopsStats(context, { userId }) {
      try {
        const response = await server.get(`workshop-results/stats/${userId}`)
        context.commit('SET_WORKSHOPS_STATS', response.data)
      } catch (error) {
        console.error(error);
      }
    },
    async setUser(context, { id }) {
      try {
        const response = await server.get(`/users/${id}`);
        const user = response.data;
        context.commit('SET_USER', user);
      } catch (error) {
        console.error(error);
      }
    },
    async setChapterResults(context, { userId, workshopId }) {
      try {
        const response = await server.get(`/chapter-results`, { params: {
          userId,
          workshopId
        }
        })
        const results = response.data
        context.commit('SET_CHAPTER_RESULTS', results)
      } catch (error) {
        console.error(error);
      }
    },
    async getChapterResults(context, { userId, workshopId } ) {
      try {
          const response = await server.get(`/chapter-results?userid=${userId}&workshopid=${workshopId}`)
          const results = response.data
          context.commit('SET_CHAPTER_RESULTS', results)
      } catch (error) {
        console.error(error);
      }
    }
  },
  getters: {
    user: (state) => state.user,
    email: (state) => state.email,
    redirectToWorkshop: (state) => state.redirectToWorkshop,
    password: (state) => state.password,
    fullname: (state) => state.fullname,
    title: (state) => state.title,
    authenticated: (state) => state.authenticated,
    workshops: (state) => state.workshops,
    certificates: (state) => state.certificates,
    workshopResult: (state) => state.workshopResult,
    workshopsStats: (state) => state.workshopsStats,
    currentWorkshop: (state) => state.currentWorkshop,
    currentChapter: (state) => state.currentChapter,
    currentCertificate: (state) => state.currentCertificate,
    currentChapterIndex: (state) => state.currentChapterIndex,
    chapterResults: (state) => state.chapterResults,
    visibleChangePasswordModal: (state) => state.visibleChangePasswordModal,
    visibleDeleteProfileModal: (state) => state.visibleDeleteProfileModal,
    visibleSkipChaptersModal: (state) => state.visibleSkipChaptersModal,
    visibleSuccess: (state) => state.visibleSuccess,
    visibleStatusModal: (state) => state.visibleStatusModal,
    visibleErrorModal: (state) => state.visibleErrorModal,
    successTitle: (state) => state.successTitle,
    errorTitle: (state) => state.errorTitle,
    successMessage: (state) => state.successMessage,
    errorMessage: (state) => state.errorMessage,
    showSuccessHome: (state) => state.showSuccessHome
  }
});
