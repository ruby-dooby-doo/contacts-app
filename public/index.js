/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      contacts: [],
      selectedContact: {first_name: "", last_name: "", email: "", phone_number: ""}
    };
  },
  created: function() {
    axios.get('/api/contacts').then(function(response) {
      this.contacts = response.data
    }.bind(this))
  },
  methods: {
    changeContact: function(inputContact) {
      this.selectedContact = inputContact;
    }
  },
  computed: {}
};


var ContactNewPage = {
  template: "#contact-new-page",
  data: function() {
    return {
      contact: {first_name: "", last_name: "", email: "", phone_number: ""},
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.contact.first_name,
        last_name: this.contact.last_name,
        email: this.contact.email,
        phone_number: this.contact.phone_number
      };
      axios
        .post("/api/contacts", params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};


var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/contacts/new", component: ContactNewPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});

