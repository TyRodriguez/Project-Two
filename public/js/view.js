$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/view-restaurants").then(data => {
    console.log(data);
    renderRestaurants(data);
  });

  $("#myRestaurants").on("click", "#addRestaurant", () => {
    $(".modal").addClass("is-active");
  });

  $(document).on("click", "#closeModal", () => {
    $(".modal").removeClass("is-active");
  });

  function renderRestaurants(data) {
    data.forEach(a => {
      $("#myRestaurants").append(`
          <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content" style="overflow:unset">
            <h3 class="title is-4 restaurantTitle">${a.name}</h3>
          </div>
        </div>
        <div class="content">
          <div class="show display" id="show">
          <p>Address - ${a.address}</p>
          <p>Hours - ${a.hours}</p>
          <p>Phone - ${a.phone}</p>
          </div>
    </div>
          `);
    });
  }
});
