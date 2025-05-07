// DOM Elements
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const signupError = document.getElementById("signup-error");
const loginError = document.getElementById("login-error");

// Toggle between login and signup forms
registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

// Function to create user account
function createAccount() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    
    // Basic validation
    if (!name || !email || !password) {
        signupError.textContent = "Please fill all fields";
        signupError.style.display = "block";
        return;
    }
    
    if (password.length < 6) {
        signupError.textContent = "Password must be at least 6 characters";
        signupError.style.display = "block";
        return;
    }
    
    // Get existing users or initialize empty array
    let users = JSON.parse(localStorage.getItem("touristaUsers") || "[]");
    
    // Check if email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        signupError.textContent = "Email already registered";
        signupError.style.display = "block";
        return;
    }
    
    // Create new user
    const userData = {
        id: Date.now(), // Use timestamp as a simple unique ID
        name: name,
        email: email,
        password: password
    };
    
    // Add new user to array
    users.push(userData);
    
    // Save updated array back to localStorage
    localStorage.setItem("touristaUsers", JSON.stringify(users));
    
    // Clear form and errors
    document.getElementById("signupForm").reset();
    signupError.style.display = "none";
    
    // Show success message and switch to login
    alert("Account created successfully! Please sign in with your new credentials.");
    container.classList.remove("active");
}

// Function to validate login and redirect
function loginUser() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    
    // Basic validation
    if (!email || !password) {
        loginError.textContent = "Please enter both email and password";
        loginError.style.display = "block";
        return;
    }
    
    // Get stored users
    const users = JSON.parse(localStorage.getItem("touristaUsers") || "[]");
    
    if (users.length === 0) {
        loginError.textContent = "No users found. Please sign up first";
        loginError.style.display = "block";
        return;
    }
    
    // Find matching user
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        // Clear form and errors
        document.getElementById("loginForm").reset();
        loginError.style.display = "none";
        
        // Store login state and current user info
        sessionStorage.setItem("touristaLoggedIn", "true");
        sessionStorage.setItem("currentUser", JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        })); // Store user info but not password
        
        // Redirect to home page
        window.location.href = "../../tourista/home.html";
    } else {
        loginError.textContent = "Invalid email or password";
        loginError.style.display = "block";
    }
}

// Animation timeline
const tl = gsap.timeline();

tl.to(".train", {
    x: window.innerWidth + 250,
    duration: 5,
    ease: "power1.inOut",
});

tl.to(
    ".airplane",
    {
        opacity: 1,
        duration: 0.1,
    },
    "+=0.1"
);
tl.to(".airplane", {
    x: -(window.innerWidth + 0),
    y: -300,
    duration: 5,
    ease: "power1.inOut",
    rotationY: 0,
    rotationX: -25,
    rotationZ: -10,
    transformPerspective: 600,
});
tl.to(".airplane", {
    opacity: 0,
    duration: 0.5,
});

// Parallax background animation
gsap.to(".parallax-bg", {
    backgroundPosition: "100% 100%",
    duration: 20,
    repeat: -1,
    ease: "none",
});

// Optional: Function to get all users (for admin or testing)
function getAllUsers() {
    return JSON.parse(localStorage.getItem("touristaUsers") || "[]");
}

// Optional: Function to delete a user account
function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem("touristaUsers") || "[]");
    users = users.filter(user => user.id !== userId);
    localStorage.setItem("touristaUsers", JSON.stringify(users));
}