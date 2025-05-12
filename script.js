// Check if we're on the product page
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.product-card button');

    if (addToCartButtons.length > 0) {
        // Load cart from localStorage or start with an empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add click event listeners to each "Add to Cart" button
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.product-card');
                const name = card.querySelector('h3').textContent;
                const price = card.querySelector('p').textContent;

                const product = { name, price };
                cart.push(product);

                // Save the updated cart to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                alert(`${name} added to cart!`);
            });
        });
    }

    // If we're on the cart page, display cart contents
    const cartContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');

    if (cartContainer && totalPriceEl) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            let total = 0;
            cart.forEach((item, index) => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <strong>${item.name}</strong> - ${item.price}
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartContainer.appendChild(div);

                total += parseFloat(item.price.replace('$', ''));
            });

            totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;

            // Add remove functionality
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const index = button.getAttribute('data-index');
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload(); // Refresh to update cart
                });
            });
        }
    }
});