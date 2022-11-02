import { createRouter, createWebHistory } from 'vue-router';
import UserLayout from '../layouts/UserLayout.vue';
import HomeLayout from '../layouts/HomeLayout.vue';
import ChapterLayout from '../layouts/ChapterLayout.vue'
import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';
import UserOverview from '../views/UserOverview.vue';
import UserWorkshops from '../views/UserWorkshops.vue';
import AboutII from '../views/AboutII.vue';
import About from '../views/About.vue';
import Workshops from '../views/Workshops.vue';
import Faq from '../views/Faq.vue';
import LoginEmail from '../views/LoginEmail.vue';
import SendEmail from '../views/SendEmail.vue';
import LoginPassword from '../views/LoginPassword.vue';
import Contact from '../views/Contact.vue';
import RegisterEmail from '../views/RegisterEmail.vue';
import RegisterPassword from '../views/RegisterPassword.vue';
import RegisterDetails from '../views/RegisterDetails.vue';
import ResetPassword from '../views/ResetPassword.vue';
import RegisterConfirmation from '../views/RegisterConfirmation.vue';
import ChapterDone from '../views/ChapterDone.vue'
import ChaptersCompleted from '../views/ChaptersCompleted.vue'
import ChapterFailed from '../views/ChapterFailed.vue'
import UserWorkshop from '../views/UserWorkshop.vue';
import ChapterOverview from '../views/ChapterOverview.vue';
import ChapterTest from '../views/ChapterTest.vue';
import WorkshopTest from '../views/WorkshopTest.vue';
import Workshop from '../views/Workshop.vue'
import Contract from '../views/Contract.vue'
import UserCertificate from '../views/UserCertificate.vue'
import ResetPasswordCompleted from '../views/ResetPasswordCompleted.vue'
import EmailSent from '../views/EmailSent.vue'
import ErrorSent from '../views/ErrorSent.vue'
import UserCertificates from '../views/UserCertificates.vue'
import ForgottenPassword from '../views/ForgottenPassword.vue'
import VerifyEmail from '../views/VerifyEmail.vue'
import AuthenticationLayout from '../layouts/AuthenticationLayout.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    component: HomeLayout,
    meta: {
      guest: true,
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        component: About,
      },
      {
        path: '/workshops',
        name: 'Workshops',
        component: Workshops,
      },
      {
        path: '/workshops/:workshopid',
        name: 'Workshop',
        component: Workshop,
      },
      {
        path: '/faq',
        name: 'FAQ',
        component: Faq,
      },
      {
        path: '/contract',
        name: 'Contract',
        component: Contract,
      },
      {
        path: '/auth',
        name: 'Authentication',
        component: AuthenticationLayout,
        children: [
          {
            path: 'send-email',
            component: SendEmail
          },
          {
            path: 'login/email',
            component: LoginEmail,
          },
          {
            path: 'login/password',
            component: LoginPassword,

          },
          {
            path: 'forgotten-password',
            component: ForgottenPassword,
          },
          {
            path: 'forgotten-password/confirmation',
            component: EmailSent,
          },
          {
            path: 'forgotten-password/error',
            component: ErrorSent,
          },
          {
            path: 'register/email',
            component: RegisterEmail,
          },
          {
            path: 'reset-password',
            component: ResetPassword,
          },
          {
            path: 'reset-password/completed',
            component: ResetPasswordCompleted,
          },
          {
            path: 'register/password',
            component: RegisterPassword,
          },
          {
            path: 'register/details',
            component: RegisterDetails,
          },
          {
            path: 'register/confirmation',
            component: RegisterConfirmation,
          },
          {
            path: 'verify-email',
            component: VerifyEmail,
          }
        ]
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact,
      },
      {
        path: '/aboutii',
        component: AboutII,
      },
      { path: '/404', name: 'NotFound', component: () => import('../views/NotFound.vue') },
    ],
  },
  {
    path: '/user',
    component: UserLayout,
    meta: {
      requiresAuth: true,
      user: true
    },
    children: [
      {
        path: '',
        component: UserOverview,
      },
      {
        path: 'profile',
        component: UserProfile,
      },
      {
        path: 'workshops',
        component: UserWorkshops,
      },
      {
        path: 'certificates',
        component: UserCertificates,
      },
      {
        path: 'certificates/:certificateid',
        component: UserCertificate,
      },
      {
        path: 'workshops/:workshopid',
        component: UserWorkshop,
      },
      {
        path: 'workshops/:workshopid/chapters',
        component: ChapterLayout,
        children: [
          {
            path: ':chapterid/intro',
            component: ChapterOverview,
            name: "ChapterIntro"
          },
          {
            path: ':chapterid/knowledge',
            component: ChapterTest,
            name: "ChapterKnowledge"
          },
          {
            path: ':chapterid/done',
            component: ChapterDone,
            name: "ChapterDone"
          },
          {
            path: ':chapterid/completed',
            component: ChaptersCompleted,
            name: "ChapterCompleted"
          },
          {
            path: ':chapterid/failed',
            component: ChapterFailed,
            name: "ChapterFailed"
          },

        ]
      },
      {
        path: 'workshops/:workshopid/test',
        component: WorkshopTest,
      },
    ],
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/workshop-test',
    name: 'Workshoptest',
    component: () => import('../views/WorkshopTest.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  { path: '/:pathMatch(.*)*', redirect: '/404' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {left: 0, top: 0}
  }
});

router.beforeEach(async (to, from, next) => {
  try {
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      (to.matched.some((record) => record.meta.user) ||
        to.matched.some((record) => record.meta.admin))
    ) {

      if (store.state.authenticated) next();
      else {
        next({
          path: '/auth/login/email',
          params: { nextUrl: to.fullPath },
        });
      }
    } else if (to.matched.some((record) => record.meta.guest)) {
      next();
    } else {
      next();
    }
  } catch (error) {
    next({
      path: '/auth/login/email',
      params: { nextUrl: to.fullPath },
    });
  }
});

export default router;
