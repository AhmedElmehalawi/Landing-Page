// Accessing the [ul] of the navbar & All the sections of the page.
const navbar = document.getElementById("navbar__list");
const navSections = document.querySelectorAll("section");

// building the nav [buildingNavBar()]
//Looping for all the sections in the page and getting the data-nav of each one of them as li in the nav
buildingNavBar = () => {
  const frag = document.createDocumentFragment();

  smoothScroll = (e) => {
    e.preventDefault();
    const sec = document.querySelector(e.target.getAttribute("sec_id"));
    sec.scrollIntoView({
      behavior: "smooth",
    });
  };

  for (const sec of navSections) {
    const sectionID = sec.id,
      sectionDataNav = sec.getAttribute("data-nav"),
      nav_li = document.createElement("li"),
      section_a = document.createElement("a");

    section_a.textContent = sectionDataNav;
    section_a.href = `#${sectionID}`;
    section_a.setAttribute("sec_id", `#${sectionID}`);
    section_a.addEventListener("click", smoothScroll);

    nav_li.appendChild(section_a);
    frag.appendChild(nav_li);
  }
  navbar.appendChild(frag);
};
buildingNavBar();

/**
 * Adding event listener on scrolling to make the active section appears with
 * different color and determine a ref value for switching.  */
window.addEventListener("scroll", function () {
  const refLinks = navbar.querySelectorAll("li a");

  refLinks.forEach((link) => {
    const a_id = link.getAttribute("sec_id"),
      a_sec = document.querySelector(a_id),
      a_pos = a_sec.getBoundingClientRect();

    if ((a_pos.top <= 50) & (a_pos.bottom >= 50)) {
      link.style.color = "black";
    } else {
      link.style.color = "white";
    }
  });
});

//  Moving "your-active-class" of the section specified while scrolling.
const isInViewport = (elem) => {
  const bounding = elem.getBoundingClientRect();

  return (
    bounding.top >= -300 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

const addActiveClass = (isInViewport) => {
  document.addEventListener("scroll", () => {
    for (let i = 0; i < navSections.length; i++) {
      const section = navSections[i];

      isInViewport(section)
        ? section.classList.add("your-active-class")
        : section.classList.remove("your-active-class");
    }
  });
};
addActiveClass(isInViewport);
