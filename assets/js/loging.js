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
                <div class="card-value">$12,426</div>
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
                <div class="card-value">1,248</div>
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
                <div class="card-value">5,642</div>
                <div class="card-growth growth-positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>15.3% increase</span>
                </div>
            </div>
            
            <div class="dashboard-card">
                <div class="card-header">
                    <h3 class="card-title">New Customers</h3>
                    <div class="card-icon bg-danger-light">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="card-value">324</div>
                <div class="card-growth growth-positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>5.7% increase</span>
                </div>
            </div>
        </div>
        
        <div class="chart-container">
            <div class="chart-header">
                <h3 class="chart-title">Revenue Analytics</h3>
                <div class="chart-actions">
                    <button class="chart-action-btn active">Week</button>
                    <button class="chart-action-btn">Month</button>
                    <button class="chart-action-btn">Year</button>
                </div>
            </div>
            <div style="height: 100px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #a1a5b7;">
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
                    <button class="btn-primary">
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
                        <tr>
                            <td>#ORD-001</td>
                            <td>John Doe</td>
                            <td>2024-01-15</td>
                            <td>$245.99</td>
                            <td><span class="status-badge status-success">Completed</span></td>
                            <td>
                                <button class="btn-outline" style="padding: 6px 12px; font-size: 12px;">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ORD-002</td>
                            <td>Jane Smith</td>
                            <td>2024-01-15</td>
                            <td>$189.50</td>
                            <td><span class="status-badge status-warning">Pending</span></td>
                            <td>
                                <button class="btn-outline" style="padding: 6px 12px; font-size: 12px;">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ORD-003</td>
                            <td>Mike Johnson</td>
                            <td>2024-01-14</td>
                            <td>$320.00</td>
                            <td><span class="status-badge status-success">Completed</span></td>
                            <td>
                                <button class="btn-outline" style="padding: 6px 12px; font-size: 12px;">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function loadPOS() {
    pageTitle.textContent = "POS System";
    breadcrumbCurrent.textContent = "POS System";
    
    pageContent.innerHTML = `
        <div style="background: #fff; padding: 40px; border-radius: 12px; text-align: center; color: #a1a5b7;">
            <i class="fas fa-cash-register" style="font-size: 64px; margin-bottom: 20px;"></i>
            <h3>POS System Interface</h3>
            <p>Point of Sale system would be implemented here with product grid, cart, and payment processing.</p>
        </div>
    `;
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
                    <button class="btn-primary">
                        <i class="fas fa-plus"></i>
                        Add Product
                    </button>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${item_array.length > 0 ? item_array.map(item => `
                            <tr>
                                <td>${item.id || 'N/A'}</td>
                                <td>${item.name || 'N/A'}</td>
                                <td>${item.category || 'N/A'}</td>
                                <td>Rs. ${item.price || '0.00'}</td>
                                <td>${item.stock || '0'}</td>
                                <td><span class="status-badge ${item.stock > 0 ? 'status-success' : 'status-danger'}">${item.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
                                <td style="display: flex; gap: 8px; justify-content: center;">
                                    <button class="btn-outline" style="padding: 6px 12px; font-size: 16px; margin-right: 5px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-outline" style="padding: 6px 12px; font-size: 16px; color: #f1416c;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="7" style="text-align: center; color: #a1a5b7;">
                                    <i class="fas fa-box-open" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                                    No products found
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
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
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order_array.length > 0 ? order_array.map(order => `
                            <tr>
                                <td>${order.id || 'N/A'}</td>
                                <td>${order.customerId || 'N/A'}</td>
                                <td>${order.orderDate || 'N/A'}</td>
                                <td>Rs. ${order.totalAmount || '0.00'}</td>
                                <td><span class="status-badge status-warning">${order.status || 'Pending'}</span></td>
                                <td>
                                    <button class="btn-outline" style="padding: 6px 12px; font-size: 12px;">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="6" style="text-align: center; color: #a1a5b7;">
                                    <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                                    No orders found
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
function loadCustomers() {
    pageTitle.textContent = "Customers";
    breadcrumbCurrent.textContent = "Customers";
    
    pageContent.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Customer Management</h3>
                <div class="table-actions">
                    <button class="btn-primary">
                        <i class="fas fa-plus"></i>
                        Add Customer
                    </button>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
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
                                <td>${customer.id || 'N/A'}</td>
                                <td>${customer.name || 'N/A'}</td>
                                <td>${customer.email || 'N/A'}</td>
                                <td>${customer.phone || 'N/A'}</td>
                                <td>${customer.joinDate || 'N/A'}</td>
                                <td style="display: flex; gap: 8px; justify-content: center;">
                                    <button class="btn-outline" style="padding: 6px 12px; font-size: 16px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-outline" style="padding: 6px 12px; font-size: 16px; color: #f1416c;">
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
    `;
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