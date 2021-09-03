import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';

import request from './utils/request';
import storage from './utils/storage';
const app = createApp(App);

app.use(router).mount('#app');

app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
