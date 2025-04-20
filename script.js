// const bar = document.getElementById("bar");
// const nav = document.getElementById("navbar");
// const close = document.getElementById("close");

// if (bar) {
//   bar.addEventListener("click", () => {
//     nav.classList.add("active");
//   });
// }

// if (close) {
//   close.addEventListener("click", () => {
//     nav.classList.remove("active");
//   });
// }

const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active"); // Toggle the menu visibility
  menuIcon.classList.toggle("fa-times"); // Change icon to 'X' when open
});

// Ensure it works when resizing back to desktop view
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    navbar.classList.remove("active"); // Hide menu on desktop
    menuIcon.classList.remove("fa-times");
  }
});

  document.addEventListener("DOMContentLoaded", function () {
    // Highlight active nav link
    const currentPage = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll("#navbar li a");

    menuItems.forEach((item) => {
      if (item.getAttribute("href") === currentPage) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Newsletter subscription logic
    const submitBtn = document.getElementById("newsletter-submit");
    const emailInput = document.getElementById("newsletter-email");

    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (!email || !email.includes("@")) {
        showSnackbar("Please enter a valid email address.");
        return;
      }

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        showSnackbar(data.message || "Thanks for subscribing!");
        emailInput.value = "";
      } catch (err) {
        showSnackbar("Something went wrong. Please try again later.");
        console.error(err);
      }
    });

    function showSnackbar(message) {
      const snackbar = document.getElementById("snackbar");
      snackbar.textContent = message;
      snackbar.classList.add("show");

      setTimeout(() => {
        snackbar.classList.remove("show");
      }, 3000);
    }
  });

  // Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value;

    // Prepare the data to be sent to the backend
    const formData = {
      name,
      email,
      subject,
      message
    };

    // Show loading feedback (optional)
    showSnackbar("Submitting your message...");

    try {
      // Send the data to the backend API (the API URL should match the route in your backend)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // On success, show a success message
        showSnackbar(result.message || "Thanks for reaching out!");
      } else {
        // On error, show an error message
        showSnackbar(result.message || "There was an error, please try again.");
      }
    } catch (error) {
      // If there's a network or server error
      console.error("Error during form submission:", error);
      showSnackbar("There was an error, please try again.");
    }
  });

  // Function to show feedback messages (snackbar)
  function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    
    // Hide the snackbar after 3 seconds
    setTimeout(() => {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }
});
