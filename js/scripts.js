function Pizza(size, sauce, toppings, specialty) {
  this.toppings = toppings;
  this.specialty = specialty;
  this.pizzaSize = size;
  this.sauce = sauce;
  this.price;
};

function Order() {
  this.pies = [];
  this.total = 0;
};

Pizza.prototype.evaluatePrice = function() {
  if (this.pizzaSize === "Large") {
    this.price = 20;
  } else if (this.pizzaSize === "Medium") {
    this.price = 15;
  } else {
    this.price = 10;
  };
  if (this.sauce === "Red Marinara") {
    this.price = this.price + 1;
  } else if (this.sauce === "White Garlic Ricotta") {
    this.price = this.price + 2;
  } else {
    this.price = this.price + 3;
  };
  this.price = this.price + this.toppings.length + this.specialty.length * 2;
};

Pizza.prototype.addTax = function() {
  this.price = 1.0725 * this.price;
};

$(document).ready(function() {
  var order = new Order();
  $('form').submit(function(event) {
    event.preventDefault();
    $("span").empty();
    var toppingsArray = [];
    var specialtyArray = [];
    var size = $("#size").val();
    var sauce = $("#sauce").val();
    $("input:checkbox[name='toppings']:checked").each(function(){
        toppingsArray.push($(this).val());
    });
    $("input:checkbox[name='specialty']:checked").each(function(){
        specialtyArray.push($(this).val());
    });
    $('input[type=checkbox]').each(function() {
      this.checked = false;
    });
    var pizza = new Pizza(size, sauce, toppingsArray, specialtyArray);
    pizza.evaluatePrice();
    console.log(pizza);
    $(".row").hide();
    $("#display").append("<div class='col-md-8'><h2>*  You've ordered a " + pizza.pizzaSize + " with " + pizza.sauce + " sauce.<br>This pie will cost " + pizza.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ".</h2></div>").show();
    if (pizza.toppings.length > 0 || pizza.specialty.length > 0) {
      $("#display").append("<div class='col-md-4'><h2>Toppings:</h2><ul id=" + order.pies.length + "></ul></div>");
      for (var index = 0; index < pizza.toppings.length; index ++) {
        $("#" + order.pies.length).append("<li>" + pizza.toppings[index] + "</li>")
      };
      for (var index = 0; index < pizza.specialty.length; index ++) {
        $("#" + order.pies.length).append("<li>" + pizza.specialty[index] + "</li>")
      };
    };
    pizza.addTax();
    order.total = order.total + pizza.price;
    $("#price").show();
    $("span").append(order.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    order.pies.push(pizza);
    console.log(order)
    $("img").show();
    $("img").animate({
       width: '120%'
    },"slow");
    $("img").click(function() {
      $("img").animate({
         width: '0px'
      }, 1000);
    $(".row").show();
    $("img , #price, #display").hide();
    });
  });
});
