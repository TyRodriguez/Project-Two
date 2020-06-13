$(document).ready(() => {
  $(document).prop("title", "Create Your Menu!");
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $.get("/api/restaurants/recent").then(a => {
    const [data] = a;
    $(".restaurantName").text(data.name);
    $(".phoneNumber").text(data.phone);
    $(".address").text(data.address);
    $(".hours").text(data.hours);
  });

  // Getting references to our form and input for menu items
  const itemName = $("input#itemName");
  const itemDescription = $("input#itemDescription");
  const itemPrice = $("input#itemPrice");

  $("#tequilabtn").on("click", event => {
    event.preventDefault();
    const menuItem = {
      // memberName: $(".member-name").text(data.email),
      item: itemName.val().trim(),
      description: itemDescription.val().trim(),
      price: itemPrice.val().trim()
    };
    console.log(menuItem);
    // run submitRestaurant to create a new Restaurant
    submitItem(menuItem);
  });

  // function submitItem(data){
  //   //$.post("/some route")
  // }
});
