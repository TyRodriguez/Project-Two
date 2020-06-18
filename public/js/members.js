$(document).ready(() => {
  let currentUser;
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    currentUser = data;
    console.log(data);
    $(".member-name").text(data.email);
    renderRestaurants(data.Restaurants);
  });
  // Getting references to our form and input
  const restaurantName = $("input#restaurantName");
  const phoneNumber = $("input#phoneNumber");
  const address = $("input#address");
  const hours = $("input#hours");

  // When the next button is clicked, we validate the input fields are not blank
  $("#addRestaurantButton").on("click", event => {
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
       <button class="detailsButton" id=${a.id} style="position:absolute; top:40%;right:10%">Details</button>
    <button class="editRestaurant" id=${a.id} style="position:absolute; top:40%;right:5%%">Edit</button>
      </div>
      <div class="hide editR" id="hide" hidden>
        <p>
          Title - <input value=${a.name}>
          Address - <input value=${a.address}>
          Hours - <input value=${a.hours}>
          Phone - <input value=${a.phone}>
        </p>
        <button class="updateRestaurant" rId=${a.id}>Update</button>
    </div>
</div>
      `);
    });
  }

  $("#myRestaurants").on("click", ".editRestaurant", e => {
    const content = $(e.target).siblings(".content");
    // content.children(".display").hide();
    content.children("#show").hide();
    // .removeClass("show")
    // .addClass("hide");
    // content.children(".editR").show();
    content.children("#hide").show();
    // .removeClass("hide")
    // .addClass("show");
  });

  $("#myRestaurants").on("click", ".detailsButton", function () {
    console.log($(this).attr("id"));
    $.get("/menu/" + $(this).attr("id")).then(data => {
      $("#myRestaurants").html(
        `<p class="title is-4">${data.name}Menu Items</p>
       
        ${!data.Menus.length
          ? "<span>You don't have any menu items right now!</span>"
          : ""
        }
        <div class="buttons">
        <button class="button brickRedButton" id="addRestaurant">Add Menu Item</button>
        <button class="button brickRedButton" id="back2R">Back</button>
        </div>`
      );
      $(".modal-content").html(`
            <div class="field">
              <label class="label is-medium" style="color:#CC3210">Item Name</label>
              <div class="control">
                <input class="input" id="itemName">
              </div>
            </div>

            <div class="field">
              <label class="label is-medium" style="color:#CC3210">Item Description</label>
              <div class="control">
                <input class="input" id="itemDescription">
              </div>
            </div>

            <div class="field">
              <label class="label is-medium" style="color:#CC3210">Item Price</label>
              <div class="control">
                <input class="input" id="itemPrice">
              </div>
            </div>
            <button class="button brickRedButton" id="addMenu" data-rid=${data.id}>Add Menu Item</button>
            <button class="button brickRedButton" id="closeModal">Cancel</button>
`);
      renderMenu(data.Menus);
    });
  });

  $(".modal-content").on("click", "#addMenu", function () {
    console.log("whiskey!");
    const menuItem = {
      item: $("#itemName")
        .val()
        .trim(),
      description: $("#itemDescription")
        .val()
        .trim(),
      price: $("#itemPrice")
        .val()
        .trim(),
      RestaurantId: $(this).data("rid")
    };
    console.log(menuItem);
    // run submitItem to create a new Menu item
    RestaurantId = menuItem.RestaurantId;
    submitItem(menuItem);
  });
  // Submits a new restaurant and brings user to menu page
  function submitRestaurant(data) {
    $.post("/api/restaurants/", data)
      .then(() => {
        location.reload();
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  function submitItem(item) {
    $.post("/api/menu", item).then(data => {
      $(".modal").removeClass("is-active");
      renderMenu(data);
    });
  }

  function renderMenu(arr) {
    let content = "";
    arr.forEach(item => {
      content += `
      <div>
        <p>
            item <input value=${item.item}>
            <br>
            description <input value=${item.description}>
            <br>
            price <input value=${item.price}>
        </p>
      </div>
      <button class="button is-small" item-id="${item.id}">Update Item</button>
     
      <br>
      <button class="delete" style="color: CC3210" item-id="${item.id}">Delete</button>
      `;
    });

    $(".menu").html(content);
  }

  $("#myRestaurants").on("click", ".delete", function () {
    $.ajax({
      method: "DELETE",
      url: "/api/menu/" + $(this).attr("item-id")
    }).then(data => {
      console.log(data);
      renderMenu(data.menuItems);
    });
  });

  $("#myRestaurants").on("click", ".edit", () => {
    event.preventDefault();
    console.log("this", $(event.target).attr("item-id"));
    const inputs = $(event.target)
      .siblings("div")
      .children("p")
      .children("input");
    const menuItem = {
      item: $(inputs[0])
        .val()
        .trim(),
      description: $(inputs[1])
        .val()
        .trim(),
      price: $(inputs[2])
        .val()
        .trim()
    };
    editItem(menuItem, event.target.getAttribute("item-id"));
  });

  $("#myRestaurants").on("click", ".updateRestaurant", e => {
    const inputs = $(e.target)
      .siblings("p")
      .children("input");
    editRestaurant(
      {
        name: $(inputs[0])
          .val()
          .trim(),
        address: $(inputs[1])
          .val()
          .trim(),
        hours: $(inputs[2])
          .val()
          .trim(),
        phone: $(inputs[3])
          .val()
          .trim()
      },
      $(e.target).attr("rId")
    );
  });

  function editItem(menuItem, id) {
    console.log(menuItem);
    $.ajax({
      method: "PUT",
      url: "/api/menu/" + id,
      data: menuItem
    }).then(() => console.log("edited!"));
  }

  function editRestaurant(data, id) {
    $.ajax({
      method: "PUT",
      url: "/api/restaurants/" + id,
      data
    }).then(() => location.reload());
  }
});
