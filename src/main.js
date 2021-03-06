// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store/store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'

import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false

new Vue({
    i18n,
	icons: {
		iconfont: 'fa',
	},
    router,
    store,
    vuetify,
    components: { App },
    render: h => h(App),
}).$mount('#app')
