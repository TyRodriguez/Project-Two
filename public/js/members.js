$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  // Getting references to our form and input
  const restaurantName = $("input#restaurantName");
  const phoneNumber = $("input#phoneNumber");
  const address = $("input#address");
  const hours = $("input#hours");

  // When the next button is clicked, we validate the input fields are not blank
  $("#tequilabtn").on("click", event => {
    event.preventDefault();
    const userRestaurant = {
      // memberName: $(".member-name").text(data.email),
      name: restaurantName.val().trim(),
      phone: phoneNumber.val().trim(),
      address: address.val().trim(),
      hours: hours.val().trim()
    };
    console.log(userRestaurant);
    // run submitRestaurant to create a new Restaurant
    submitRestaurant(
      userRestaurant.name,
      userRestaurant.phone,
      userRestaurant.address,
      userRestaurant.hours
    );
  });

  // Submits a new restaurant and brings user to menu page
  function submitRestaurant(name, phone, address, hours) {
    $.post("/api/restaurants/", {
      name: name,
      phone: phone,
      address: address,
      hours: hours
    })
      .then(() => {
        window.location.replace("/menu");
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
