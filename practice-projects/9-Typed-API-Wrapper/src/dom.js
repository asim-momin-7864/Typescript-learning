// Note the '.js' extension here! You must import the COMPILED JavaScript file,
// not the .ts file, when working natively in the browser.
import { handleData, apiCall } from "../dist/typed-api-warpper.js";

// Get DOM Elements
const btnUsers = document.getElementById("btn-users");
const btnPosts = document.getElementById("btn-posts");
const resultsGrid = document.getElementById("results-grid");
const statusMessage = document.getElementById("status-message");

// Utility function to handle UI State (Loading/Error)
function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.className = isError ? "error-text" : "";
  if (!message) statusMessage.className = "hidden";
}

// Render Users
async function loadUsers() {
  resultsGrid.innerHTML = ""; // Clear old cards
  setStatus("Loading Users...");

  try {
    // In plain JS, we just pass the arguments without the <User> generic
    const users = await handleData(
      "https://jsonplaceholder.typicode.com/users",
      apiCall,
    );

    setStatus(""); // Clear loading message

    // Inside your loadUsers() function...
    users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "card";

      // Injecting much more detail into the HTML structure
      card.innerHTML = `
        <div class="card-header">
            <h3>${user.name}</h3>
            <span class="username">@${user.username}</span>
        </div>
        <div class="card-body">
            <p>📧 <strong>Email:</strong> ${user.email}</p>
            <p>📞 <strong>Phone:</strong> ${user.phone.split(" ")[0]}</p> <!-- Removed extension for cleaner look -->
            <p>🌐 <strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <p>🏢 <strong>Company:</strong> ${user.company.name}</p>
            <p>📍 <strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        </div>
    `;
      resultsGrid.appendChild(card);
    });
  } catch (error) {
    setStatus("Failed to load users. Please try again.", true);
    console.error(error);
  }
}

// Render Posts
async function loadPosts() {
  resultsGrid.innerHTML = ""; // Clear old cards
  setStatus("Loading Posts...");

  try {
    // Again, no <Post> generic needed in plain JS
    const posts = await handleData(
      "https://jsonplaceholder.typicode.com/posts",
      apiCall,
    );

    setStatus(""); // Clear loading message

    // Inside your loadPosts() function...

    posts.slice(0, 20).forEach((post) => {
      const card = document.createElement("div");

      // Use BOTH classes to combine the styles
      card.className = "card post-card";

      card.innerHTML = `
        <h3 class="post-title">📝 ${post.title}</h3>
        <p class="post-body">${post.body}</p>
        <a href="#" class="read-more" onclick="event.preventDefault()">Read Comments →</a>
    `;

      resultsGrid.appendChild(card);
    });
  } catch (error) {
    setStatus("Failed to load posts. Please try again.", true);
    console.error(error);
  }
}

// Event Listeners
btnUsers.addEventListener("click", loadUsers);
btnPosts.addEventListener("click", loadPosts);
