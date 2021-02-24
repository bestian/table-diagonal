import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

var app = createApp(App)

app.component('v-style', {
    template: '<style><slot></slot></style>'
})

app.mount('#app')
