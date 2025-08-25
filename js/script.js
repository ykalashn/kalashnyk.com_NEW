// Get all the links that will trigger the scrolling
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default jump behavior

    const targetId = this.getAttribute('href'); // Get the ID of the target section
    const targetElement = document.querySelector(targetId); // Find the target element

    if (targetElement) {
      // Calculate the position to center the element
      const headerOffset = 0; // Adjust this for any fixed headers
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (window.innerHeight / 2) + (targetElement.offsetHeight / 2) - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" // Use smooth scrolling for a better user experience
      });
    }
  });
});