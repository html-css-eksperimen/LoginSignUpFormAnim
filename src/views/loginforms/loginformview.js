import VueRecaptcha from 'vue-recaptcha';
import { mapGetters } from 'vuex';
import loggerShow from '../../Logger';

export default {
  name: 'loginform',
  data() {
    return {
      isRightPanelActive: false,
      loginDataObject: {
        email: '',
        password: '',
      },
      signUpDataObject: {
        nama: '',
        email: '',
        password: '',
      },
      siteKeyCaptcha: '',
      siteVerifyCaptcha: '',
      resultVerified: {},
      isSuksesVerified: false,
    };
  },
  components: {
    'vue-recaptcha': VueRecaptcha,
  },
  methods: {
    startSignUpOpen() {
      this.isRightPanelActive = true;
    },
    startLoginOpen() {
      this.isRightPanelActive = false;
    },
    sendProsesLogin() {
      loggerShow(this.loginDataObject);
    },
    sendProsesSignUp() {
      loggerShow(this.signUpDataObject);
    },
    callbackCaptcha(token) {
      loggerShow(token);
    },
    onVerifyCaptcha(response) {
      loggerShow(`verify response : ${response}`);
      this.siteVerifyCaptcha = response;
      this.checkValidRecaptcha();
    },
    checkValidRecaptcha() {
      // akan terjadi error CORS , validasi captcha perlu backend,
      // jangan request langsung dari front end
      this.$store.dispatch('httpstore/validateKeyCaptchaAsync', { stringkey: this.siteVerifyCaptcha });
    },
    checkResultRecaptcha() {
      loggerShow(this.resultVerified);
    },
    onExpiredCaptcha() {
      loggerShow('expired data');
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset();
    },
  },
  computed: {
    ...mapGetters('httpstore', {
      resultValidateCaptcha: 'getResultValidateCaptcha',
      isSuksesRequest: 'getStatusRequestCaptcha',
      getterSiteKeyCaptcha: 'getSiteKeyCaptcha',
    }),
    panelActiveClassObject() {
      return {
        'right-panel-active': this.isRightPanelActive,
      };
    },
  },
  mounted() {

  },
  watch: {
    resultValidateCaptcha(newValue) {
      if (newValue) {
        this.resultVerified = newValue;
        this.checkResultRecaptcha();
      }
    },
    isSuksesRequest(newValue) {
      if (newValue) {
        this.isSuksesVerified = newValue;
      }
    },
    getterSiteKeyCaptcha(newValue) {
      loggerShow(`site key : ${newValue}`);
      this.siteKeyCaptcha = newValue;
    },
  },
};
