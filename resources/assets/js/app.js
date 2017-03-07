
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#vue-wrapper',

    data: {
        items : [],
        hasError : true,
        hasDeleted : true,
        newItem : {'name' : ''}
    },
    mounted : function(){
        this.getVueItems();
    },
    methods : {
        getVueItems: function () {
            axios.get('/vueitems').then(response => {
                this.items = response.data;
            });
        },
        createItem: function () {
            var input = this.newItem;
            if(input['name'] == ''){
                this.hasError = false;
                this.hasDeleted = true;
            }
            else {
                this.hasError = true;
                axios.post('/vueitems', input)
                    .then(response => {
                        this.newItem = {'name': ''};
                        this.getVueItems();
                    });
                this.hasDeleted = true;
            }
        },
        deleteItem: function (item) {
            axios.post('/vueitems/'+item.id).then((response) => {
                this.getVueItems();
                this.hasError = true,
                this.hasDeleted = false
            });
        },
    }
});
