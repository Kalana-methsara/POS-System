import { user_array, customer_array, item_array, order_array } from "/db/db.js";

const loginFormContainer = document.querySelector(".login-form-container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

const loginForm = document.querySelector(".form-box.login form");
const registerForm = document.querySelector(".form-box.register form");
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logout-btn");
const pageContent = document.getElementById("page-content");
const pageTitle = document.getElementById("page-title");
const breadcrumbCurrent = document.getElementById("breadcrumb-current");
const sidebarToggle = document.getElementById("sidebarToggle");
const posSidebar = document.getElementById("posSidebar");

// Toggle sidebar on mobile
sidebarToggle.addEventListener('click', () => {
    posSidebar.classList.toggle('active');
});

// Navigation functions
function loadDashboard() {
    pageTitle.textContent = "Dashboard";
    breadcrumbCurrent.textContent = "Dashboard";
    
    pageContent.innerHTML = `
        <div class="dashboard-cards">
            <div class="dashboard-card">
                <div class="card-header">
                    <h3 class="card-title">Total Revenue</h3>
                    <div class="card-icon bg-primary-light">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                </div>
                <div class="card-value">Rs. ${order_array.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}</div>
                <div class="card-growth growth-positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>12.5% increase</span>
                </div>
            </div>
            
            <div class="dashboard-card">
                <div class="card-header">
                    <h3 class="card-title">Total Orders</h3>
                    <div class="card-icon bg-success-light">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
                <div class="card-value">${order_array.length}</div>
                <div class="card-growth growth-positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>8.2% increase</span>
                </div>
            </div>
            
            <div class="dashboard-card">
                <div class="card-header">
                    <h3 class="card-title">Products Sold</h3>
                    <div class="card-icon bg-warning-light">
                        <i class="fas fa-box"></i>
                    </div>
                </div>
                <div class="card-value">${order_array.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}</div>
                <div class="card-growth growth-positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>15.3% increase</span>
                </div>
            </div>
            
            <div class="dashboard-card">
                <div class="card-header">
                    <h3 class="card-title">Total Customers</h3>
                    <div class="card-icon bg-danger-light">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="card-value">${customer_array.length}</div>
                <div class="card-growth growth-positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>5.7% increase</span>
                </div>
            </div>
        </div>
        
        <div class="chart-container">
            <div class="chart-header">
                <h3 class="chart-title">Recent Orders</h3>
                <div class="chart-actions">
                    <button class="chart-action-btn active">Week</button>
                    <button class="chart-action-btn">Month</button>
                    <button class="chart-action-btn">Year</button>
                </div>
            </div>
            <div style="height: 300px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #a1a5b7;">
                Revenue Chart Area
            </div>
        </div>
        
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Recent Orders</h3>
                <div class="table-actions">
                    <button class="btn-outline">
                        <i class="fas fa-download"></i>
                        Export
                    </button>
                    <button class="btn-primary" onclick="loadPOS()">
                        <i class="fas fa-plus"></i>
                        New Order
                    </button>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order_array.slice(-5).reverse().map(order => `
                            <tr>
                                <td>#${order.id.toString().padStart(3, '0')}</td>
                                <td>${order.customerName}</td>
                                <td>${order.orderDate}</td>
                                <td>Rs. ${order.totalAmount.toFixed(2)}</td>
                                <td><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
                                <td>
                                    <button class="btn-outline view-order-btn" data-order-id="${order.id}" style="padding: 6px 12px; font-size: 12px;">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Add event listeners to view order buttons
    document.querySelectorAll('.view-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order-id'));
            showOrderDetails(orderId);
        });
    });
}

function getStatusClass(status) {
    switch(status) {
        case 'Completed': return 'status-success';
        case 'Pending': return 'status-warning';
        case 'Cancelled': return 'status-danger';
        default: return 'status-warning';
    }
}

// Update the loadPOS function
function loadPOS() {
    pageTitle.textContent = "POS System";
    breadcrumbCurrent.textContent = "POS System";
    
    pageContent.innerHTML = `
        <div class="pos-system">
            <div class="pos-container">
                <div class="pos-left">
                    <div class="pos-header">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search products..." id="productSearch">
                        </div>
                        <div class="category-filter">
                            <select id="categoryFilter">
                                <option value="">All Categories</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Bakery">Bakery</option>
                                <option value="Meat">Meat</option>
                                <option value="Grains">Grains</option>
                                <option value="Pantry">Pantry</option>
                            </select>
                        </div>
                    </div>
                    
<div class="products-grid">
  ${item_array.length > 0 ? item_array.map(item => `
    <div class="product-card" data-id="${item.id}" data-category="${item.category}">
      <div class="product-image">
        ${item.image ? 
          `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
          ''
        }
        <div class="placeholder-icon" style="${item.image ? 'display: none;' : ''}">
          <i class="fas fa-box"></i>
        </div>
      </div>
      <div class="product-info">
        <h4 class="product-name">${item.name}</h4>
        <p class="product-category">${item.category}</p>
        <div class="product-price">Rs. ${item.price.toFixed(2)}</div>
        <div class="product-stock">Stock: ${item.stock}</div>
      </div>
      <div class="product-actions">
        <button class="btn-primary add-to-cart" data-id="${item.id}" ${item.stock <= 0 ? 'disabled' : ''}>
          <i class="fas fa-plus"></i> ${item.stock <= 0 ? 'Out of Stock' : 'Add'}
        </button>
      </div>
    </div>
  `).join('') : `
    <div class="no-products">
      <i class="fas fa-box-open"></i>
      <p>No products available</p>
    </div>
  `}
</div>
                </div>
                
                <div class="pos-right">
                    <div class="customer-section">
                        <div class="customer-header">
                            <h3>Customer</h3>
                            <button class="btn-outline btn-sm" id="addCustomerBtn">
                                <i class="fas fa-plus"></i> New
                            </button>
                        </div>
                        <div class="customer-selector">
                            <select id="customerSelect">
                                <option value="0">Walk-in Customer</option>
                                ${customer_array.map(customer => `
                                    <option value="${customer.id}">${customer.name} (${customer.phone})</option>
                                `).join('')}
                            </select>
                            <div class="customer-info" id="customerInfo">
                                <div class="customer-details">
                                    <p><strong>Walk-in Customer</strong></p>
                                    <p class="customer-contact">No contact information</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cart-container">
                        <div class="cart-header">
                            <h3>Current Order</h3>
                            <span class="cart-count">0 items</span>
                        </div>
                        
                        <div class="cart-items" id="cartItems">
                            <div class="empty-cart">
                                <i class="fas fa-shopping-cart"></i>
                                <p>Your cart is empty</p>
                            </div>
                        </div>
                        
                        <div class="cart-summary">
                            <div class="summary-row">
                                <span>Subtotal:</span>
                                <span id="subtotal">Rs. 0.00</span>
                            </div>
                            <div class="summary-row">
                                <span>Tax (10%):</span>
                                <span id="tax">Rs. 0.00</span>
                            </div>
                            <div class="summary-row discount-row">
                                <span>Discount:</span>
                                <div class="discount-controls">
                                    <input type="number" id="discountInput" placeholder="0" min="0" max="100">
                                    <span>%</span>
                                </div>
                            </div>
                            <div class="summary-row total">
                                <span>Total:</span>
                                <span id="total">Rs. 0.00</span>
                            </div>
                        </div>
                        
                        <div class="payment-actions">
                            <button class="btn-outline" id="clearCart">
                                <i class="fas fa-trash"></i> Clear
                            </button>
                            <button class="btn-primary" id="checkoutBtn">
                                <i class="fas fa-credit-card"></i> Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Customer Modal -->
        <div class="modal" id="customerModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add New Customer</h3>
                    <button class="modal-close" id="closeCustomerModal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="customerForm">
                        <input type="hidden" id="customerId">
                        <div class="form-group">
                            <label for="customerName">Full Name *</label>
                            <input type="text" id="customerName" required>
                        </div>
                        <div class="form-group">
                            <label for="customerEmail">Email</label>
                            <input type="email" id="customerEmail">
                        </div>
                        <div class="form-group">
                            <label for="customerPhone">Phone *</label>
                            <input type="tel" id="customerPhone" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-outline" id="cancelCustomerBtn">Cancel</button>
                            <button type="submit" class="btn-primary">Save Customer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Initialize POS functionality
    setupPOS();
}

// Enhanced POS functionality with customer selection
function setupPOS() {
    let cart = [];
    let selectedCustomerId = 0; // 0 = Walk-in customer
    let discount = 0;
    
    const productSearch = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const customerSelect = document.getElementById('customerSelect');
    const customerInfo = document.getElementById('customerInfo');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const discountInput = document.getElementById('discountInput');
    const clearCartBtn = document.getElementById('clearCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const customerModal = document.getElementById('customerModal');
    const closeCustomerModal = document.getElementById('closeCustomerModal');
    const cancelCustomerBtn = document.getElementById('cancelCustomerBtn');
    const customerForm = document.getElementById('customerForm');

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = item_array.find(item => item.id === productId);
            
            if (product && product.stock > 0) {
                addToCart(product);
            }
        });
    });
    
    // Search functionality
    productSearch.addEventListener('input', function() {
        filterProducts();
    });
    
    // Category filter functionality
    categoryFilter.addEventListener('change', function() {
        filterProducts();
    });
    
    // Customer selection
    customerSelect.addEventListener('change', function() {
        selectedCustomerId = parseInt(this.value);
        updateCustomerInfo();
    });
    
    // Discount input
    discountInput?.addEventListener('input', function() {
        discount = parseInt(this.value) || 0;
        if (discount > 100) {
            discount = 100;
            this.value = 100;
        }
        updateCartDisplay();
    });
    
    // Clear cart
    clearCartBtn?.addEventListener('click', function() {
        cart = [];
        updateCartDisplay();
    });
    
    // Checkout
    checkoutBtn?.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Please add items to cart before checkout');
            return;
        }
        
        processCheckout();
    });
    
    // Customer modal functionality
    addCustomerBtn?.addEventListener('click', function() {
        customerForm.reset();
        document.getElementById('customerId').value = '';
        customerModal.style.display = 'flex';
    });
    
    closeCustomerModal?.addEventListener('click', function() {
        customerModal.style.display = 'none';
        customerForm.reset();
    });
    
    cancelCustomerBtn?.addEventListener('click', function() {
        customerModal.style.display = 'none';
        customerForm.reset();
    });
    
    // Add new customer
    customerForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerId = document.getElementById('customerId').value;
        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        
        if (!name || !phone) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (customerId) {
            // Update existing customer
            const customerIndex = customer_array.findIndex(c => c.id == customerId);
            if (customerIndex !== -1) {
                customer_array[customerIndex] = {
                    ...customer_array[customerIndex],
                    name: name,
                    email: email,
                    phone: phone
                };
            }
        } else {
            // Create new customer
            const newCustomer = {
                id: customer_array.length > 0 ? Math.max(...customer_array.map(c => c.id)) + 1 : 1,
                name: name,
                email: email,
                phone: phone,
                joinDate: new Date().toISOString().split('T')[0]
            };
            
            customer_array.push(newCustomer);
        }
        
        // Refresh customer select
        refreshCustomerSelect();
        
        // Close modal and reset form
        customerModal.style.display = 'none';
        customerForm.reset();
        
        alert(`Customer ${customerId ? 'updated' : 'added'} successfully!`);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === customerModal) {
            customerModal.style.display = 'none';
            customerForm.reset();
        }
    });
    
    // Refresh customer select dropdown
    function refreshCustomerSelect() {
        if (customerSelect) {
            customerSelect.innerHTML = `
                <option value="0">Walk-in Customer</option>
                ${customer_array.map(customer => `
                    <option value="${customer.id}">${customer.name} (${customer.phone})</option>
                `).join('')}
            `;
            customerSelect.value = selectedCustomerId;
            updateCustomerInfo();
        }
    }
    
    // Update customer info display
    function updateCustomerInfo() {
        if (!customerInfo) return;
        
        if (selectedCustomerId === 0) {
            customerInfo.innerHTML = `
                <div class="customer-details">
                    <p><strong>Walk-in Customer</strong></p>
                    <p class="customer-contact">No contact information</p>
                </div>
            `;
        } else {
            const customer = customer_array.find(c => c.id === selectedCustomerId);
            if (customer) {
                customerInfo.innerHTML = `
                    <div class="customer-details">
                        <p><strong>${customer.name}</strong></p>
                        <p class="customer-contact">${customer.phone}${customer.email ? ` • ${customer.email}` : ''}</p>
                    </div>
                `;
            }
        }
    }
    
    // Add to cart function
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                alert(`Only ${product.stock} units available in stock`);
                return;
            }
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                stock: product.stock
            });
        }
        
        updateCartDisplay();
    }
    
    // Remove from cart
    function removeFromCart(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            updateCartDisplay();
        }
    }
    
    // Update quantity
    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else if (newQuantity > item.stock) {
                alert(`Only ${item.stock} units available in stock`);
            } else {
                item.quantity = newQuantity;
                updateCartDisplay();
            }
        }
    }
    
    // Update cart display
    function updateCartDisplay() {
        if (!cartItems || !cartCount) return;
        
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
        
        // Update cart items
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="item-info">
                        <h4 class="item-name">${item.name}</h4>
                        <div class="item-price">Rs. ${item.price.toFixed(2)} × ${item.quantity}</div>
                        <div class="item-total">Rs. ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div class="item-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    const item = cart.find(item => item.id === id);
                    if (item) {
                        updateQuantity(id, item.quantity - 1);
                    }
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    const item = cart.find(item => item.id === id);
                    if (item) {
                        updateQuantity(id, item.quantity + 1);
                    }
                });
            });
            
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    removeFromCart(id);
                });
            });
        }
        
        // Update totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = (subtotal * discount) / 100;
        const taxableAmount = subtotal - discountAmount;
        const tax = taxableAmount * 0.1; // 10% tax
        const total = taxableAmount + tax;
        
        if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `Rs. ${tax.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `Rs. ${total.toFixed(2)}`;
        
        // Update discount display
        const discountRow = document.querySelector('.discount-row');
        if (discountRow) {
            if (discount > 0) {
                discountRow.style.display = 'flex';
            } else {
                discountRow.style.display = 'none';
            }
        }
    }
    
    // Filter products
    function filterProducts() {
        const searchTerm = productSearch.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        
        document.querySelectorAll('.product-card').forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productCategory = card.getAttribute('data-category');
            
            const matchesSearch = productName.includes(searchTerm);
            const matchesCategory = !selectedCategory || productCategory === selectedCategory;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Process checkout
    function processCheckout() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = (subtotal * discount) / 100;
        const taxableAmount = subtotal - discountAmount;
        const tax = taxableAmount * 0.1;
        const total = taxableAmount + tax;
        
        // Get customer info
        let customerName = "Walk-in Customer";
        let customerId = null;
        
        if (selectedCustomerId !== 0) {
            const customer = customer_array.find(c => c.id === selectedCustomerId);
            if (customer) {
                customerName = customer.name;
                customerId = customer.id;
            }
        }
        
        // Create order
        const newOrder = {
            id: order_array.length > 0 ? Math.max(...order_array.map(o => o.id)) + 1 : 1,
            customerId: customerId,
            customerName: customerName,
            items: cart.map(item => ({
                itemId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: total,
            discount: discount,
            orderDate: new Date().toISOString().split('T')[0],
            status: "Completed"
        };
        
        // Add to order array
        order_array.push(newOrder);
        
        // Update stock
        cart.forEach(cartItem => {
            const product = item_array.find(item => item.id === cartItem.id);
            if (product) {
                product.stock -= cartItem.quantity;
                if (product.stock < 0) product.stock = 0;
            }
        });
        
        // Show success message
        const discountText = discount > 0 ? ` (${discount}% discount applied)` : '';
        alert(`Order #${newOrder.id} placed successfully!\nCustomer: ${customerName}\nTotal: Rs. ${total.toFixed(2)}${discountText}`);
        
        // Clear cart and reset
        cart = [];
        discount = 0;
        if (discountInput) discountInput.value = '';
        updateCartDisplay();
        
        // Refresh products display
        loadPOS();
    }
    
    // Initialize customer info
    updateCustomerInfo();
}

function loadProducts() {
    pageTitle.textContent = "Products";
    breadcrumbCurrent.textContent = "Products";
    
    pageContent.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Product Management</h3>
                <div class="table-actions">
                    <button class="btn-outline">
                        <i class="fas fa-download"></i>
                        Export
                    </button>
                    <button class="btn-primary" onclick="openProductModal()">
                        <i class="fas fa-plus"></i>
                        Add Product
                    </button>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Unit</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${item_array.length > 0 ? item_array.map(item => `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.name}</td>
                                <td>${item.category}</td>
                                <td>Rs. ${item.price.toFixed(2)}</td>
                                <td>${item.stock}</td>
                                <td>${item.unit}</td>
                                <td><span class="status-badge ${item.stock > 0 ? 'status-success' : 'status-danger'}">${item.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
                                <td style="display: flex; gap: 8px;">
                                    <button class="btn-outline edit-product" data-id="${item.id}" style="padding: 6px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-outline delete-product" data-id="${item.id}" style="padding: 6px 12px; color: #f1416c;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="8" style="text-align: center; color: #a1a5b7;">
                                    <i class="fas fa-box-open" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                                    No products found
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Product Modal -->
        <div class="modal" id="productModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="productModalTitle">Add New Product</h3>
                    <button class="modal-close" id="closeProductModal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="productForm">
                        <input type="hidden" id="productId">
                        <div class="form-group">
                            <label for="productName">Product Name *</label>
                            <input type="text" id="productName" required>
                        </div>
                        <div class="form-group">
                            <label for="productCategory">Category *</label>
                            <select id="productCategory" required>
                                <option value="">Select Category</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Bakery">Bakery</option>
                                <option value="Meat">Meat</option>
                                <option value="Grains">Grains</option>
                                <option value="Pantry">Pantry</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="productPrice">Price (Rs.) *</label>
                            <input type="number" id="productPrice" step="0.01" min="0" required>
                        </div>
                        <div class="form-group">
                            <label for="productStock">Stock *</label>
                            <input type="number" id="productStock" min="0" required>
                        </div>
                        <div class="form-group">
                            <label for="productUnit">Unit *</label>
                            <input type="text" id="productUnit" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-outline" id="cancelProductBtn">Cancel</button>
                            <button type="submit" class="btn-primary">Save Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for product actions
    document.querySelectorAll('.edit-product').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            editProduct(productId);
        });
    });
    
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
    
    setupProductModal();
}

function setupProductModal() {
    const productModal = document.getElementById('productModal');
    const closeProductModal = document.getElementById('closeProductModal');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const productForm = document.getElementById('productForm');

    closeProductModal?.addEventListener('click', function() {
        productModal.style.display = 'none';
        productForm.reset();
    });

    cancelProductBtn?.addEventListener('click', function() {
        productModal.style.display = 'none';
        productForm.reset();
    });

    productForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = document.getElementById('productId').value;
        const name = document.getElementById('productName').value.trim();
        const category = document.getElementById('productCategory').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);
        const unit = document.getElementById('productUnit').value.trim();

        if (!name || !category || !price || !stock || !unit) {
            alert('Please fill in all required fields');
            return;
        }

        if (productId) {
            // Update existing product
            const productIndex = item_array.findIndex(p => p.id == productId);
            if (productIndex !== -1) {
                item_array[productIndex] = {
                    ...item_array[productIndex],
                    name: name,
                    category: category,
                    price: price,
                    stock: stock,
                    unit: unit
                };
            }
        } else {
            // Create new product
            const newProduct = {
                id: item_array.length > 0 ? Math.max(...item_array.map(p => p.id)) + 1 : 1,
                name: name,
                category: category,
                price: price,
                stock: stock,
                unit: unit
            };
            
            item_array.push(newProduct);
        }

        productModal.style.display = 'none';
        productForm.reset();
        loadProducts();
        
        alert(`Product ${productId ? 'updated' : 'added'} successfully!`);
    });

    window.addEventListener('click', function(e) {
        if (e.target === productModal) {
            productModal.style.display = 'none';
            productForm.reset();
        }
    });
}

function openProductModal(productId = null) {
    const productModal = document.getElementById('productModal');
    const productModalTitle = document.getElementById('productModalTitle');
    const productForm = document.getElementById('productForm');

    productForm.reset();
    
    if (productId) {
        productModalTitle.textContent = "Edit Product";
        const product = item_array.find(p => p.id === productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productUnit').value = product.unit;
        }
    } else {
        productModalTitle.textContent = "Add New Product";
        document.getElementById('productId').value = '';
    }
    
    productModal.style.display = 'flex';
}

function editProduct(productId) {
    openProductModal(productId);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const productIndex = item_array.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            item_array.splice(productIndex, 1);
            loadProducts();
            alert('Product deleted successfully!');
        }
    }
}

function loadOrders() {
    pageTitle.textContent = "Orders";
    breadcrumbCurrent.textContent = "Orders";
    
    pageContent.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Order Management</h3>
                <div class="table-actions">
                    <button class="btn-outline">
                        <i class="fas fa-download"></i>
                        Export
                    </button>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order_array.length > 0 ? order_array.map(order => `
                            <tr>
                                <td>#${order.id.toString().padStart(3, '0')}</td>
                                <td>${order.customerName}</td>
                                <td>${order.orderDate}</td>
                                <td>${order.items.reduce((sum, item) => sum + item.quantity, 0)} items</td>
                                <td>Rs. ${order.totalAmount.toFixed(2)}</td>
                                <td><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
                                <td>
                                    <button class="btn-outline view-order-btn" data-order-id="${order.id}" style="padding: 6px 12px;">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn-outline delete-order-btn" data-order-id="${order.id}" style="padding: 6px 12px; color: #f1416c;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="7" style="text-align: center; color: #a1a5b7;">
                                    <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                                    No orders found
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Order Details Modal -->
        <div class="modal" id="orderDetailsModal">
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h3 id="orderDetailsTitle">Order Details</h3>
                    <button class="modal-close" id="closeOrderDetailsModal">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="orderDetailsContent">
                        <!-- Order details will be loaded here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for order actions
    document.querySelectorAll('.view-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order-id'));
            showOrderDetails(orderId);
        });
    });
    
    document.querySelectorAll('.delete-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order-id'));
            deleteOrder(orderId);
        });
    });
    
    setupOrderDetailsModal();
}

function setupOrderDetailsModal() {
    const orderDetailsModal = document.getElementById('orderDetailsModal');
    const closeOrderDetailsModal = document.getElementById('closeOrderDetailsModal');

    closeOrderDetailsModal?.addEventListener('click', function() {
        orderDetailsModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === orderDetailsModal) {
            orderDetailsModal.style.display = 'none';
        }
    });
}

function showOrderDetails(orderId) {
    const order = order_array.find(o => o.id === orderId);
    if (!order) return;

    const orderDetailsModal = document.getElementById('orderDetailsModal');
    const orderDetailsTitle = document.getElementById('orderDetailsTitle');
    const orderDetailsContent = document.getElementById('orderDetailsContent');

    orderDetailsTitle.textContent = `Order #${order.id.toString().padStart(3, '0')} Details`;
    
    orderDetailsContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 10px; color: #181c32;">Customer Information</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                <p><strong>Name:</strong> ${order.customerName}</p>
                <p><strong>Order Date:</strong> ${order.orderDate}</p>
                <p><strong>Status:</strong> <span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></p>
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 10px; color: #181c32;">Order Items</h4>
            <table class="data-table" style="width: 100%;">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>Rs. ${item.price.toFixed(2)}</td>
                            <td>Rs. ${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div style="border-top: 2px solid #e4e6ef; padding-top: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Subtotal:</span>
                <span>Rs. ${(order.totalAmount / 1.1).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Tax (10%):</span>
                <span>Rs. ${(order.totalAmount - (order.totalAmount / 1.1)).toFixed(2)}</span>
            </div>
            ${order.discount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #50cd89;">
                    <span>Discount (${order.discount}%):</span>
                    <span>-Rs. ${((order.totalAmount / 1.1) * (order.discount / 100)).toFixed(2)}</span>
                </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #181c32; border-top: 1px solid #e4e6ef; padding-top: 8px;">
                <span>Total Amount:</span>
                <span>Rs. ${order.totalAmount.toFixed(2)}</span>
            </div>
        </div>
    `;

    orderDetailsModal.style.display = 'flex';
}

function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        const orderIndex = order_array.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            order_array.splice(orderIndex, 1);
            loadOrders();
            alert('Order deleted successfully!');
        }
    }
}

function loadCustomers() {
    pageTitle.textContent = "Customers";
    breadcrumbCurrent.textContent = "Customers";
    
    pageContent.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Customer Management</h3>
                <div class="table-actions">
                    <button class="btn-primary" onclick="openCustomerModal()">
                        <i class="fas fa-plus"></i>
                        Add Customer
                    </button>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Join Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${customer_array.length > 0 ? customer_array.map(customer => `
                            <tr>
                                <td>${customer.id}</td>
                                <td>${customer.name}</td>
                                <td>${customer.email || 'N/A'}</td>
                                <td>${customer.phone}</td>
                                <td>${customer.joinDate}</td>
                                <td style="display: flex; gap: 8px;">
                                    <button class="btn-outline edit-customer" data-id="${customer.id}" style="padding: 6px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-outline delete-customer" data-id="${customer.id}" style="padding: 6px 12px; color: #f1416c;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="6" style="text-align: center; color: #a1a5b7;">
                                    <i class="fas fa-users" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                                    No customers found
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Customer Modal -->
        <div class="modal" id="customerModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="customerModalTitle">Add New Customer</h3>
                    <button class="modal-close" id="closeCustomerModal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="customerForm">
                        <input type="hidden" id="customerId">
                        <div class="form-group">
                            <label for="customerName">Full Name *</label>
                            <input type="text" id="customerName" required>
                        </div>
                        <div class="form-group">
                            <label for="customerEmail">Email</label>
                            <input type="email" id="customerEmail">
                        </div>
                        <div class="form-group">
                            <label for="customerPhone">Phone *</label>
                            <input type="tel" id="customerPhone" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-outline" id="cancelCustomerBtn">Cancel</button>
                            <button type="submit" class="btn-primary">Save Customer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for customer actions
    document.querySelectorAll('.edit-customer').forEach(btn => {
        btn.addEventListener('click', function() {
            const customerId = parseInt(this.getAttribute('data-id'));
            editCustomer(customerId);
        });
    });
    
    document.querySelectorAll('.delete-customer').forEach(btn => {
        btn.addEventListener('click', function() {
            const customerId = parseInt(this.getAttribute('data-id'));
            deleteCustomer(customerId);
        });
    });
    
    setupCustomerModal();
}

function setupCustomerModal() {
    const customerModal = document.getElementById('customerModal');
    const closeCustomerModal = document.getElementById('closeCustomerModal');
    const cancelCustomerBtn = document.getElementById('cancelCustomerBtn');
    const customerForm = document.getElementById('customerForm');

    closeCustomerModal?.addEventListener('click', function() {
        customerModal.style.display = 'none';
        customerForm.reset();
    });

    cancelCustomerBtn?.addEventListener('click', function() {
        customerModal.style.display = 'none';
        customerForm.reset();
    });

    customerForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerId = document.getElementById('customerId').value;
        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        
        if (!name || !phone) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (customerId) {
            // Update existing customer
            const customerIndex = customer_array.findIndex(c => c.id == customerId);
            if (customerIndex !== -1) {
                customer_array[customerIndex] = {
                    ...customer_array[customerIndex],
                    name: name,
                    email: email,
                    phone: phone
                };
            }
        } else {
            // Create new customer
            const newCustomer = {
                id: customer_array.length > 0 ? Math.max(...customer_array.map(c => c.id)) + 1 : 1,
                name: name,
                email: email,
                phone: phone,
                joinDate: new Date().toISOString().split('T')[0]
            };
            
            customer_array.push(newCustomer);
        }

        customerModal.style.display = 'none';
        customerForm.reset();
        loadCustomers();
        
        alert(`Customer ${customerId ? 'updated' : 'added'} successfully!`);
    });

    window.addEventListener('click', function(e) {
        if (e.target === customerModal) {
            customerModal.style.display = 'none';
            customerForm.reset();
        }
    });
}

function openCustomerModal(customerId = null) {
    const customerModal = document.getElementById('customerModal');
    const customerModalTitle = document.getElementById('customerModalTitle');
    const customerForm = document.getElementById('customerForm');

    customerForm.reset();
    
    if (customerId) {
        customerModalTitle.textContent = "Edit Customer";
        const customer = customer_array.find(c => c.id === customerId);
        if (customer) {
            document.getElementById('customerId').value = customer.id;
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerEmail').value = customer.email || '';
            document.getElementById('customerPhone').value = customer.phone;
        }
    } else {
        customerModalTitle.textContent = "Add New Customer";
        document.getElementById('customerId').value = '';
    }
    
    customerModal.style.display = 'flex';
}

function editCustomer(customerId) {
    openCustomerModal(customerId);
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        // Check if customer has orders
        const hasOrders = order_array.some(order => order.customerId === customerId);
        if (hasOrders) {
            alert('Cannot delete customer with existing orders. Please delete the orders first.');
            return;
        }
        
        const customerIndex = customer_array.findIndex(c => c.id === customerId);
        if (customerIndex !== -1) {
            customer_array.splice(customerIndex, 1);
            loadCustomers();
            alert('Customer deleted successfully!');
        }
    }
}

function loadSettings() {
    pageTitle.textContent = "Settings";
    breadcrumbCurrent.textContent = "Settings";
    
    pageContent.innerHTML = `
        <div class="table-container">
            <h3 style="margin-bottom: 20px;">Application Settings</h3>
            <div style="background: #f8f9fa; padding: 30px; border-radius: 8px;">
                <p style="color: #a1a5b7; text-align: center;">
                    <i class="fas fa-cog" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                    Settings configuration would be implemented here
                </p>
            </div>
        </div>
    `;
}

// Add other page load functions (categories, inventory, reports)
function loadCategories() {
    pageTitle.textContent = "Categories";
    breadcrumbCurrent.textContent = "Categories";
    pageContent.innerHTML = `<div class="table-container"><h3>Categories Management</h3><p>Categories content here...</p></div>`;
}

function loadInventory() {
    pageTitle.textContent = "Inventory";
    breadcrumbCurrent.textContent = "Inventory";
    pageContent.innerHTML = `<div class="table-container"><h3>Inventory Management</h3><p>Inventory content here...</p></div>`;
}

function loadReports() {
    pageTitle.textContent = "Reports";
    breadcrumbCurrent.textContent = "Reports";
    pageContent.innerHTML = `<div class="table-container"><h3>Sales Reports</h3><p>Reports content here...</p></div>`;
}

// Navigation event listeners
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            link.parentElement.classList.add('active');
            
            // Load the corresponding page
            const page = link.getAttribute('data-page');
            switch(page) {
                case 'dashboard':
                    loadDashboard();
                    break;
                case 'pos':
                    loadPOS();
                    break;
                case 'products':
                    loadProducts();
                    break;
                case 'categories':
                    loadCategories();
                    break;
                case 'orders':
                    loadOrders();
                    break;
                case 'customers':
                    loadCustomers();
                    break;
                case 'inventory':
                    loadInventory();
                    break;
                case 'reports':
                    loadReports();
                    break;
                case 'settings':
                    loadSettings();
                    break;
            }
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 1024) {
                posSidebar.classList.remove('active');
            }
        });
    });
}

// Existing form toggle functionality
registerBtn.addEventListener("click", () => {
  loginFormContainer.classList.add("active");
  loginForm.reset();
  registerForm.reset();
  loginPassword.type = "password";
  showLoginPassword.checked = false;
});

loginBtn.addEventListener("click", () => {
  loginFormContainer.classList.remove("active");
  loginForm.reset();
  registerForm.reset();
  loginPassword.type = "password";
  showLoginPassword.checked = false;
});

const loginPassword = document.getElementById("login-password");
const showLoginPassword = document.getElementById("show-login-password");
showLoginPassword.addEventListener("change", function () {
  loginPassword.type = this.checked ? "text" : "password";
});

const registerPassword = document.getElementById("register-password");
const showRegisterPassword = document.getElementById("show-register-password");
showRegisterPassword.addEventListener("change", function () {
  registerPassword.type = this.checked ? "text" : "password";
});

// Login form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = loginForm.querySelector('input[type="text"]').value.trim();
  const password = loginPassword.value.trim();

  const user = user_array.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    alert("✅ Login successful!");
    loginFormContainer.style.display = "none";
    dashboard.style.display = "block";
    loginForm.reset();
    
    // Initialize dashboard
    setupNavigation();
    loadDashboard();
  } else {
    alert("❌ Invalid username or password!");
  }
});

// Register form submission
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = registerForm.querySelector('input[placeholder="Username"]').value.trim();
  const email = registerForm.querySelector('input[type="email"]').value.trim();
  const password = registerPassword.value.trim();

  const existing = user_array.find((u) => u.username === username);
  if (existing) {
    alert("⚠️ Username already taken!");
    return;
  }

  user_array.push({ username, email, password });
  alert("✅ Registered successfully! You can now login.");

  registerForm.reset();
  registerPassword.type = "password";
  showRegisterPassword.checked = false;
  loginFormContainer.classList.remove("active");
});

// Logout functionality
logoutBtn.addEventListener("click", function () {
  dashboard.style.display = "none";
  loginFormContainer.style.display = "flex";
  loginFormContainer.classList.remove("active");
  loginForm.reset();
  registerForm.reset();
  loginPassword.type = "password";
  showLoginPassword.checked = false;
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && 
        !posSidebar.contains(e.target) && 
        !sidebarToggle.contains(e.target) &&
        posSidebar.classList.contains('active')) {
        posSidebar.classList.remove('active');
    }
});

// Make functions globally available for onclick handlers
window.loadPOS = loadPOS;
window.openCustomerModal = openCustomerModal;
window.openProductModal = openProductModal;