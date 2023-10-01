/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint


*/

// Helper function to check if an element is in the viewport

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint




/*
 * Start Helper Functions
 * 
*/
//Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
const navbar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("a");
const activeSection = document.querySelector(".active");
const navItems = document.querySelectorAll("nav ul li");

//NAV BUILDING
for (let i = 0; i < sections.length; i++) {
  // Create a link element
  const link = document.createElement('a');

  // Generate the href attribute value
  const linkName = `#section${i + 1}`;
  link.setAttribute('href', linkName);

  // Create a list item element
  const item = document.createElement('li');

  // Get the name from the dataset of the current section
  const name = sections[i].dataset.nav;

  // Create a text node with the name and append it to the list item
  const itemName = document.createTextNode(name);
  item.appendChild(itemName);

  // Add the 'menu__link' class to the list item
  item.classList.add('menu__link');

  // Append the list item to the link
  link.appendChild(item);

  // Append the link to the navbar
  navbar.appendChild(link);
}

// Add class 'active' to section when near top of viewport
function makeActive() { sections.forEach(section => {
  if (isInViewport(section)){
    section.classList.add("active");
    navLinks.forEach(navLink => {
      if(navLink.getAttribute('href') == section.getAttribute('id')){
        navLink.classList.add("active")
        console.log(true);
      }
      else{
        navLink.classList.remove("active")
        console.log(false)
      }
    })
  }
  else{
    section.classList.remove("active");
  }
})
};
// Create an Intersection Observer instance
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const section = entry.target; 
    const navLink = document.querySelector(`a[href="#${section.id}"]`);

    if (entry.isIntersecting) {
      section.classList.add('active');
      navLink.classList.add('active');
    } else {
      section.classList.remove('active');
      navLink.classList.remove('active');
    }
  });
}, { threshold: 0.3 }); // Adjust the threshold as needed

// Observe each section
sections.forEach(section => {
  observer.observe(section);
});

//call function for scrolling
document.addEventListener("scroll", makeActive);

//Scroll to section
navItems.forEach((navItem) => {
  navItem.addEventListener("click", (event) => {
    event.preventDefault();

    // Get the ID of the target section from the href attribute
    const targetSectionId = navItem.getAttribute("href");

    // Scroll to the target section smoothly
    document.querySelector(targetSectionId).scrollIntoView({ behavior: "smooth" });

    // Update the 'active' state of sections and navigation links
    makeActive();
  });
});
