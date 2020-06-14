$(document).ready(() => {
  let currentUser;
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    currentUser = data;
    console.log(data);
    $(".member-name").text(data.email);
    renderRestaurants(currentUser.Restaurants);
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
      hours: hours.val().trim(),
      UserId: currentUser.id
    };
    console.log(userRestaurant);
    // run submitRestaurant to create a new Restaurant
    submitRestaurant(userRestaurant);
  });

  function renderRestaurants(data) {
    data.forEach(a => {
      $("#myRestaurants").append(`
      <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <h3 class="title is-4">Name - ${a.name}</h3>
      </div>
    </div>

    <div class="content">
      <p>Address - ${a.address}</p>
      <p>Hours - ${a.hours}</p>
      <p>Phone - ${a.phone}</p>
    </div>
  </div>
</div>
      `);
    });
  }

  // Submits a new restaurant and brings user to menu page
  function submitRestaurant(data) {
    $.post("/api/restaurants/", data)
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
