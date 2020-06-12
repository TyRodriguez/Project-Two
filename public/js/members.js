$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  // Getting references to our form and input
  const restaurantForm = $("form.restaurant");
  const restaurantName = $("input#restaurantName");
  const phoneNumber = $("input#phoneNumber");
  const address = $("input#address");
  const hours = $("input#hours");

  // When the next button is clicked, we validate the input fields are not blank
  restaurantForm.on("submit", event => {
    event.preventDefault();
    const userRestaurant = {
      restaurant: restaurantName.val().trim(),
      phone: phoneNumber.val().trim(),
      address: address.val().trim(),
      hours: hours.val().trim()
    };

    console.log(userRestaurant);

    // run submitRestaurant to create a new Restaurant
    submitRestaurant(userRestaurant);
  });
  // Submits a new restaurant and brings user to menu page
  function submitRestaurant(Restaurant) {
$.post("/api/posts/", Post, function() {
  window.location.href = "/menu";
});
  }
});
