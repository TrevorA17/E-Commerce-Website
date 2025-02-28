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
  const currentPage = window.location.pathname.split("/").pop(); // Get current page filename
  const menuItems = document.querySelectorAll("#navbar li a");

  menuItems.forEach((item) => {
    if (item.getAttribute("href") === currentPage) {
      item.classList.add("active"); // Add active class to the matching menu item
    } else {
      item.classList.remove("active"); // Remove active class from others
    }
  });
});
