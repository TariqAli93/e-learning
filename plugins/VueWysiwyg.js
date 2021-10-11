import Vue from 'vue';
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {
    hideModules: { "table": true, 'link': true, 'image': true, 'separator': true, 'code': true},
    locale: 'ar'
}); // config is optional. more below