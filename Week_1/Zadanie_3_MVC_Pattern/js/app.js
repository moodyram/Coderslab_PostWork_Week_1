function Model() {
    this.url = "https://mvc-app-database.firebaseio.com/.json";
    this.data = null;
    this.items = null;
}

Model.prototype.getAllItems = function(fn){

}

Model.prototype.getItem = function(id) {

}

function View(element) {
  this.element = element;
  this.onClick = null;
};

View.prototype.render = function (item) {

};

function Controller(myView, myModel) {
  this.myView = myView;
  this.myModel = myModel;
  this.index = 0;
};

Controller.prototype.init = function () {

};

Controller.prototype.onClick = function (event) {

};

Controller.prototype.show = function show() {

};

var sliderModel = new Model();
var targetElement = document.getElementById('slider');
var sliderView = new View(targetElement);
var sliderController = new Controller(sliderView, sliderModel);

sliderController.init();



