let removeIcon = document.querySelector(".remove-icon");
let shoppingCart = document.querySelector(".shopping-cart");
let cartIcon = document.querySelector(".cart-icon i");
let cartBox = document.querySelectorAll(".shopping-cart .cart-box");
let shoppingCartContainer = document.querySelector(".shopping-container .container");


cartIcon.addEventListener("click", showCart);

function showCart() {
  shoppingCart.style.transition = ".3s";
  shoppingCart.style.right = "0";
}


removeIcon.addEventListener("click", closeCart);

function closeCart() {
  shoppingCart.style.transition = "1s";
  shoppingCart.style.right = "-100%";
}

let trashIcon = document.querySelectorAll(".cart-box .trash-icon");

for (let i = 0; i < trashIcon.length; i++) {
  let btn = trashIcon[i];
  btn.addEventListener("click", removeBoxCart);
}
function removeBoxCart(event) {
  let btnClicked = event.target;
  btnClicked.parentElement.remove();
  updateCartTotal();
}

// 

let quantityInputs = document.querySelectorAll(".quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", updateCartTotal);
}

function updateCartTotal() {
  let cartItemContainer = document.querySelector(".shopping-cart");
  let cartBoxes = cartItemContainer.querySelectorAll(".cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.querySelector(".price");
    let quantityElement = cartBox.querySelector(".cart-box .quantity");
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  document.querySelector(".shopping-cart .total-price").innerText = "$" + total;
}


// 



let productBoxes = document.querySelectorAll(".products-container .book-box");

let addBtns = document.querySelectorAll(".products-container .book-box .cart-icon");

for (let i = 0; i < addBtns.length; i++) {
  let addBtn = addBtns[i];
  addBtn.addEventListener("click", addNewCartBox);
}

function addNewCartBox(event) {
  let addBtn = event.target;
  let productBox = addBtn.parentElement;
  
  let imageSrc = productBox.querySelector("img").src;
  let title = productBox.querySelector(".book-title").innerText;
  let price = productBox.querySelector(".price").innerText;
  console.log(imageSrc, title, price);
  addProductsToCart(imageSrc, title, price);
  updateCartTotal();
}
function addProductsToCart(imageSrc, title, price) {
  let productTitles = document.querySelectorAll(".book-name");
  for (let i = 0; i < productTitles.length; i++) {
    if (productTitles[i].innerText === title) {
      let quantityInputs = document.querySelectorAll(".cart-box .quantity");
      quantityInputs[i].value++
      return
    }
    console.log(productTitles[i] === title);
  }
  let newBox = document.createElement("div");
  newBox.classList.add("cart-box");
  let shoppingCartCont = document.querySelector(".shopping-cart .container");
  shoppingCartCont.prepend(newBox);
  console.log(shoppingCartCont);
  let newBoxContent = `
  <img src="${imageSrc}" alt="">
  <div class="txt">
  <h4 class="book-name">${title}</h4>
  <span class="price">${price}</span>
  </div>
  <input type="number" min="1" value="1" class="quantity">
  <i class="fa-solid fa-trash-can trash-icon"></i>
  `
  newBox.innerHTML = newBoxContent;
  newBox.querySelector(".cart-box .trash-icon").addEventListener("click", removeBoxCart);
  newBox.querySelector(".cart-box .quantity").addEventListener("change", updateCartTotal);
}
