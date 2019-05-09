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
    };
  },
  methods: {
    startSignUpOpen() {
      this.isRightPanelActive = true;
    },
    startLoginOpen() {
      this.isRightPanelActive = false;
    },
    sendProsesLogin() {
      console.log(this.loginDataObject);
    },
    sendProsesSignUp() {
      console.log(this.signUpDataObject);
    },
  },
  computed: {
    panelActiveClassObject() {
      return {
        'right-panel-active': this.isRightPanelActive,
      };
    },
  },
};
