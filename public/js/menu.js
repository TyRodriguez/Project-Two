$(document).ready(() => {
  $(document).prop("title", "Create Your Menu!");
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
  let data;
  $.get("/api/restaurants/recent").then(a => {
    data = a[0];
    $(".restaurantName").text(data.name + " ");
    $(".phoneNumber").text(data.phone);
    $(".address").text(data.address);
    $(".hours").text(data.hours);
  });

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);

  // Getting references to our form and input for menu items
  const itemName = $("input#itemName");
  const itemDescription = $("input#itemDescription");
  const itemPrice = $("input#itemPrice");

  $("#tequilabtn").on("click", event => {
    event.preventDefault();
    const menuItem = {
      item: itemName.val().trim(),
      description: itemDescription.val().trim(),
      price: itemPrice.val().trim(),
      RestaurantId: data.id
    };
    console.log(menuItem);
    // run submitItem to create a new Menu item
    submitItem(menuItem);
  });

  function submitItem(item) {
    $.post("/api/menu", item).then(() => {
      $(".menu").append(`<div><p>item - ${item.item} description - 
      ${item.description} price - ${item.price}</p></div>
     <button class="edit">Edit</button> <button class="delete">Delete</button>
      `);
    });
  }
});
