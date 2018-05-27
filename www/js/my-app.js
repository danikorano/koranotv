//Variable global para el control con Framework7 (Puede ser cualquier nombre, en este caso utilizamos "myApp")
//Los valores que se pueden agregar al objeto Framework7 son varios, puedes verlos en http://framework7.io/docs/init-app.html
// Codigo para la detección de plataforma
var isMaterial = Framework7.prototype.device.ios === false;
var isIos = Framework7.prototype.device.ios === true;

// Añade lo sigueinte como variables globales para los templates
Template7.global = {
  material: isMaterial,
  ios: isIos,
};

var mainView;

var $$ = Dom7; //$$ para manipulación del DOM no es necesario jQuery pero si se utiliza no tendremos conflictos

if (!isIos) {
  // Change class
  $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
  // And move Navbar into Page
  $$('.view .navbar').prependTo('.view .page');
}

// Inicializar app
var myApp = new Framework7({
  material: isIos? false : true, //Activamos Material o iOS
  swipePanel: 'left', //Activamos la acción slide para el menú
  template7Pages: true,
  precompileTemplates: true,
  swipeBackPage: true,
  animateNavBackIcon: true,
  pushState: !!Framework7.prototype.device.os,
});

mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true //Activamos el DOM cache, para pages inline
});
var cred = localStorage.getItem('user');
if(cred == null){
  mainView.router.loadPage('login.html');
}

var app = {
    /*
    Esta función initialize la llamamos desde index.html al final del documento,
    cuando esto se ejecute lanzará deviceready y su correspondiente función "init".
    */
    initialize: function() {
        document.addEventListener("deviceready", this.init, false);
    },
    init: function() {
        //Aquí el dispositivo está preparado
        
    }
};

if(localStorage.getItem('theme')){
  themeWhite();
}

//Eventos Framework
myApp.onPageInit("login", function(){
  myApp.params.swipePanel = false;
});

//Eventos DOM

$$(document).on('page:init', function (e) {
       console.log("Una página está abierta"); 
})

$$('.action1').on('click', function () {
  myApp.alert('Action 1');
  console.log("Action 1"); 
});
$$('.action2').on('click', function () {
  myApp.alert('Action 2');
}); 

$$('#coches').on('click', function () {   
          console.log('click coches');
          
          var coches = {
            '1': {'name': '1'},
            '2': {'name': '2'},
          };
          count = Object.keys(coches).length;

          cars = {
            'cars': coches,
            'count': count,
          };
          //cars = JSON.stringify(cars);
          console.log(cars);
          mainView.router.load({
              template: myApp.templates.contacts,
              animatePages: true,
              context: {
                cars: cars,
              },
            });
          
          /*
            mainView.router.load({
              template: myApp.templates.favorites,
              animatePages: false,
              context: {
              },
              reload: true,
            });
            */
            /*
            mainView.router.load({
              template: myApp.templates.details,
              animatePages: false,
              context: {
              },
              reload: true,
            });
            */
        });

$$('.logout-button').on('click', function () {
  localStorage.removeItem('user');
  mainView.router.loadPage('login.html');
}); 

$$('.settings-link').on('click', function (){
  if(mainView.activePage.name != "settings"){
    var checked="";
    if(localStorage.getItem('theme')){
      checked="checked";
    }
    mainView.router.load({
      template: myApp.templates.settings,
      animatePages: true,
      context: {
        checked: checked,
      },
    });
  }
});

$$('.home-link').on('click', function (){
  if(mainView.activePage.name != "index"){
    mainView.router.back({pageName:'index',ignoreCache: true, force: true});
  }
});

//Functions
function signIn(){
  var user = $$('.login-screen-content [name="username"]').val();
  var pass = $$('.login-screen-content [name="password"]').val();
  if(user == "dani" && pass == "pass"){
    var cred = {
      'user': user,
      'pass': pass,
    };
    localStorage.setItem('user', JSON.stringify(cred));
    mainView.router.back();
    myApp.params.swipePanel = 'left';
  }else{
    myApp.alert("Credenciales incorrectos");
  }
}

function cerrarLogin(){
  mainView.router.back();
  myApp.params.swipePanel = 'left';
}

function themeWhite(){
  $$('.layout-dark').addClass('layout-white');
  $$('.layout-dark').removeClass('layout-dark');
}

function whiteThemeClick(){
  setTimeout(function(){ 

    if($$('[name="white-theme"]').prop('checked')) {
      localStorage.setItem('theme', 'white');
      themeWhite();
    }else{
      localStorage.removeItem('theme');
      $$('.layout-white').addClass('layout-dark');
      $$('.layout-white').removeClass('layout-white');
    }
}, 100);
  
  
}