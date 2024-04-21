
        var cart = [];
        var total = 0;
        var showNames = false;

        function addToCart(itemName, itemPrice) {
            cart.push({ name: itemName, price: itemPrice });
            updateCart();
            updateItemCounter(); // Update item counter
        }

        function buyNow() {
            // Copy cart items and send as a form
            var form = document.createElement("form");
            form.method = "POST"; // Or "GET"
            form.action = "checkout.php"; // Adjust the URL

            cart.forEach(function(item) {
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = "items[]";
                input.value = item.name + " - ₦" + item.price;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        }

        function updateCart() {
            var cartItemsElement = document.getElementById("cartItems");
            var cartTotalElement = document.getElementById("cartTotal");

            cartItemsElement.innerHTML = ""; // Clear existing items

            if (showNames) {
                for (var i = 0; i < cart.length; i++) {
                    var listItem = document.createElement("li");
                    listItem.textContent = cart[i].name + " - ₦" + cart[i].price;
                    cartItemsElement.appendChild(listItem);
                }
            }

            cartTotalElement.textContent = calculateTotal();
        }

        function clearCart() {
            cart = [];
            updateCart();
            updateItemCounter(); // Update item counter
        }

        function toggleItemNames() {
            showNames = !showNames;
            var toggleButton = document.getElementById("toggleNamesButton");
            if (showNames) {
                toggleButton.textContent = "Hide Names";
                updateCart(); // Update cart to show names
            } else {
                toggleButton.textContent = "Show Names";
                // Clear cart items if hiding names
                document.getElementById("cartItems").innerHTML = "";
            }
        }

        function updateItemCounter() {
            document.getElementById("itemCounter").textContent = cart.length;
        }

        function calculateTotal() {
            var sum = 0;
            for (var i = 0; i < cart.length; i++) {
                sum += cart[i].price;
            }
            return sum;
        }
