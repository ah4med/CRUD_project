var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productInput = document.getElementById("gall");
var searchInput = document.getElementById("search");

var productList;

if (localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
} else {
  productList = [];
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescriptionInput.value,
  };
  productList.push(product);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct(productList);
  // console.log(productList);
}

function displayProduct(arr) {
  var box = ``;
  for (var i = 0; i < arr.length; i++) {
    box += `
      <div class="col-lg-3 col-sm-6">
        <div id="item-${i}" class="card p-2 ">
          <img src="PP.jpg" alt="product img" />
          <div class="cardbody">
            <h2 class="h3">${arr[i].name}</h2>
            <p class="lead">${arr[i].desc}</p>
            <h3 class="h5">
              <span>${arr[i].category}</span>
            </h3>
            <h3 class="h5">
              <span>${arr[i].price}</span>
            </h3>
            <button class="btn btn-danger btn-sm w-100 my-1" onclick="deleteProduct(${i})">Delete</button>
            <button class="btn btn-warning btn-sm w-100 my-1" onclick="goToForm(${i})">Update</button>
          </div>
        </div>
      </div>
    `;
  }
  productInput.innerHTML = box;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct(productList);
}

function search() {
  var searchRes = [];
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      searchRes.push(productList[i]);
    }
  }
  displayProduct(searchRes);
}

var currProduct;
function goToForm(index) {
  location.href = "#product-form";
  document.getElementById("addProduct-btn").classList.add("d-none");
  document.getElementById("updateProduct-btn").classList.remove("d-none");
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].desc;
  currProduct = index;
}
function updateProduct() {
  document.getElementById("addProduct-btn").classList.remove("d-none");
  document.getElementById("updateProduct-btn").classList.add("d-none");
  productList[currProduct].name = productNameInput.value;
  productList[currProduct].price = productPriceInput.value;
  productList[currProduct].category = productCategoryInput.value;
  productList[currProduct].desc = productDescriptionInput.value;
  displayProduct(productList);
  location.href = `#item-${currProduct}`;
}
