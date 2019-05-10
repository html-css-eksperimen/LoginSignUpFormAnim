/* eslint-disable no-shadow */
import axios from 'axios';
import loggerShow from '../Logger';

const state = {
  resultRequest: {},
  statusRequest: false,
  siteKeyCaptcha: '6LeikqIUAAAAAOnV68B6Uoqqj34qKp510DKvFBUY',
  secretKeyCaptcha: '6LeikqIUAAAAAI-v2lFg6lgXTvF8LV3UUW_G1uye',
  urlRequest: 'https://www.google.com/recaptcha/api/siteverify',
};


const getters = {
  getResultValidateCaptcha(state) {
    return state.resultRequest;
  },
  getStatusRequestCaptcha(state) {
    return state.statusRequest;
  },
  getSiteKeyCaptcha(state) {
    return state.siteKeyCaptcha;
  },
  getSecretKeyCaptcha(state) {
    return state.secretKeyCaptcha;
  },
  getUrlValidate(state) {
    return state.urlRequest;
  },
};

const actions = {
  async validateKeyCaptchaAsync({ commit, getters }, { stringkey }) {
    // validasi data dari recaptcha
    const urls = getters.getUrlValidate;
    const secret = getters.getSecretKeyCaptcha;
    const keyValidate = stringkey;
    const request = axios({
      method: 'post',
      url: urls,
      data: {
        secret,
        response: keyValidate,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      // timeout dalam 1 menit
      timeout: 60000,
    });

    try {
      const resultData = await request;
      const isSuksesValidasi = resultData.data.success;
      commit('setStateResultRequest', { result: resultData.data });
      commit('setStatusSuksesRequestValidasi', { result: isSuksesValidasi });
    } catch (err) {
      loggerShow(err);
      commit('setStateResultRequest', { result: {} });
      commit('setStatusSuksesRequestValidasi', { result: false });
    }
  },
  getSiteKeys() {

  },
};

const mutations = {
  setStateResultRequest(state, { result }) {
    const states = state;
    states.resultRequest = result;
  },
  setStatusSuksesRequestValidasi(state, { isSukses }) {
    const states = state;
    states.statusRequest = isSukses;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
