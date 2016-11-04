function Pizza(size, sauce, toppings, specialty) {
  this.toppings = toppings;
  this.specialty = specialty;
  this.pizzaSize = size;
  this.sauce = sauce;
  this.price;
}

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
  $('form').submit(function(event) {
    event.preventDefault();
    $("#display , ul , #price").empty();
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
    var pizza = new Pizza(size, sauce, toppingsArray, specialtyArray);
    pizza.evaluatePrice();
    console.log(pizza);
    $("#display").append("You've ordered a " + pizza.pizzaSize + " with " + pizza.sauce + " sauce.<br>");
    if (pizza.toppings.length > 0 || pizza.specialty.length > 0) {
      $("#display").append("Toppings:");
    };
    for (var index = 0; index < pizza.toppings.length; index ++) {
      $("ul").append("<li>" + pizza.toppings[index] + "</li>")
    };
    for (var index = 0; index < pizza.specialty.length; index ++) {
      $("ul").append("<li>" + pizza.specialty[index] + "</li>")
    };
    $("#price").append('Your subtotal is ' + pizza.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + '<br>');
    pizza.addTax();
    $("#price").append('Your total with tax is ' + pizza.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
  });
});
