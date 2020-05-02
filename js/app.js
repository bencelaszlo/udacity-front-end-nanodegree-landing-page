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
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBarList = document.querySelector('#navbar__list');

const sections = document.querySelectorAll('section');
const sectionArray = Array.from(sections);
const sectionParent = sectionArray[0].parentElement;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* Check that an element is visible for the user */
const isInViewport = (domElement, threshold = 0) => {
    const boundaries = domElement.getBoundingClientRect();
    return (
        boundaries.top >= threshold &&
        boundaries.left >= threshold &&
        boundaries.bottom <= ((window.innerHeight || document.documentElement.clientHeight) - threshold) &&
        boundaries.right <= ((window.innerWidth || document.documentElement.clientWidth) - threshold)
    );
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/* Build the navigation bar */
const buildNavBar = () => {
    // Create a document fragment to improve performance
    const fragment = document.createDocumentFragment();

    // Create navigation bar items and attach them to the document fragment
    sections.forEach(section => {
        const newLi = document.createElement('li');
        newLi.classList.add("nav-bar-item");

        const newA = document.createElement('a');
        newA.href = `#${section.id}`;
        newA.innerText = section.dataset.nav;
        newLi.appendChild(newA);

        fragment.appendChild(newLi);
    })
    navBarList.appendChild(fragment);
}

buildNavBar();

/**
 * End Main Functions
 * Begin Events
 * 
*/

/* Custom event of the mouse scroll */
const updateEvent = new Event("update");

/* Dispatch custom event on mouse scroll */
window.onscroll = () => sectionParent.dispatchEvent(updateEvent);

/* Add event listener to update the visible section and its navigation bar item */
sectionParent.addEventListener("update", function () {
    sectionArray.forEach((section, index) => {
        const navBarChildren = Array.from(navBarList.children);
        // Check that the given section is visible
        const isOnScreen = isInViewport(section, -200);
        if (isOnScreen) {
            // Add active classes when the given section is visible
            section.classList.add("active-section");
            navBarChildren[index].classList.add("selected-nav-bar-item");
        } else {
            // Remove active classes when the given section is not visible
            section.classList.remove("active-section");
            navBarChildren[index].classList.remove("selected-nav-bar-item");
        }
    })
});
