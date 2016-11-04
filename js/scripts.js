function Pizza(toppings, size, sauce) {
  this.toppings = toppings;
  this.pizzaSize = size;
  this.sauce = sauce;
  this.price;
}

Pizza.prototype.evaluatePrice = function() {
  if (this.pizzaSize === "large") {
    this.price = 20;
  } else if (this.pizzaSize === "medium") {
    this.price = 15;
  } else {
    this.price = 10;
  };
  if (this.sauce === "red") {
    this.price = this.price + 1;
  } else if (this.sauce === "white") {
    this.price = this.price + 2;
  } else {
    this.price = this.price + 3;
  };
  
}

$(function() {
  $('form').submit(function(event) {
    // debugger;
    event.preventDefault;
    var toppingsArray = []
    var size = $("#size").val();
    var sauce = $("#sauce").val();
    $("input:checkbox[type='checkbox']:checked").each(function(){
        toppingsArray.push($(this).val());
        console.log(toppingsArray, size, sauce);
    });
    var pizza = new Pizza(toppingsArray, size, sauce);
    pizza.evaluatePrice();
    console.log(pizza);
  });
});
