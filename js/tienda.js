// tienda.js

const cartTableBody = document.querySelector("#cart-table tbody");
const totalPriceSpan = document.getElementById("total-price");
const checkoutForm = document.getElementById("checkout-form");
const proceedToCheckoutBtn = document.getElementById("proceed-to-checkout");
const thankYouMessage = document.getElementById("thank-you-message");
const purchaseForm = document.getElementById("purchase-form");

let cart = [];

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const price = parseFloat(button.dataset.price);

    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ product, price, quantity: 1 });
    }

    renderCart();
  });
});

function renderCart() {
  cartTableBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.product}</td>
      <td>s/${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" class="form-control form-control-sm quantity-input" data-index="${index}">
      </td>
      <td>s/${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Eliminar</button>
      </td>
    `;
    cartTableBody.appendChild(row);
  });

  totalPriceSpan.textContent = total.toFixed(2);

  // Actualizar cantidades
  document.querySelectorAll(".quantity-input").forEach(input => {
    input.addEventListener("change", event => {
      const index = event.target.dataset.index;
      const newQuantity = parseInt(event.target.value);
      if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        renderCart();
      }
    });
  });

  // Eliminar productos
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      cart.splice(index, 1);
      renderCart();
    });
  });
}

proceedToCheckoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  checkoutForm.style.display = "block";
  thankYouMessage.style.display = "none";
  window.scrollTo({ top: checkoutForm.offsetTop, behavior: "smooth" });
});

purchaseForm.addEventListener("submit", event => {
  event.preventDefault();

  // Validación simple (opcional)
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;
  const contact = document.getElementById("contact").value.trim();

  if (!address || !payment || !contact) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Simular compra finalizada
  cart = [];
  renderCart();
  checkoutForm.style.display = "none";
  thankYouMessage.style.display = "block";
});
