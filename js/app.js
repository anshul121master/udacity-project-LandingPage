const paras = document.querySelectorAll(".activepara");
const landingdivs = document.querySelectorAll(".landing__container");
const sections = document.querySelectorAll("section");
let navElements;
const activeClassForSection = "your-active-class";
const activeClassForNav = "nav-item-active";

function isInViewPort(element) {
  //this method will return true if element is in viewport else false
  console.log("isInViewport started");
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function addActiveClass(element, activeClass) {
  //this method will add an active class on element
  console.log("addActiveClass started");
  if (!element.classList.contains(activeClass)) {
    element.classList.add(activeClass);
  }
}

function removeActiveClass(element, activeClass) {
  //this method will add an active class on element
  console.log("removeActiveClass started");
  if (element.classList.contains(activeClass)) {
    element.classList.remove(activeClass);
  }
}

function checkVisibleSection(event) {
  //this method will check which section is currently visible in viewport
  console.log("started scrollingon");
  for (let i = 0; i < paras.length; i++) {
    if (isInViewPort(paras[i])) {
      addActiveClass(
        paras[i].parentElement.parentElement,
        activeClassForSection
      );
      addActiveClass(navElements[i], activeClassForNav);
      break;
    } else {
      console.log("removed");
      removeActiveClass(
        paras[i].parentElement.parentElement,
        activeClassForSection
      );
      removeActiveClass(navElements[i], activeClassForNav);
    }
  }
}
window.addEventListener("scroll", checkVisibleSection);

window.addEventListener("load", addNavItems);

function addNavItems() {
  //this function will dynamically create nav list items and append it to ul.
  console.log("addNavItems started");
  let itemfragment = document.createDocumentFragment();
  for (let section of sections) {
    let navitem = document.createElement("li");
    navitem.textContent = section.getAttribute("data-nav");
    attachListenerToNavItem(navitem);
    itemfragment.append(navitem);
  }
  document.querySelector("ul").append(itemfragment);
  navElements = document.querySelectorAll(".navbar__menu li");
  console.log(navElements);
}

function attachListenerToNavItem(item) {
  //this method will attach an event listener to every nav items.
  console.log("attachListenerToNavItem started");
  item.addEventListener("click", scrollIntoSection);
}

function scrollIntoSection(event) {
  //this function will scroll to that particular section which is clicked in navbar.
  console.log(`${event.target.textContent} was clicked.`);
  for (let landingdiv of landingdivs) {
    if (
      landingdiv.parentElement.getAttribute("data-nav") ==
      event.target.textContent
    ) {
      landingdiv.scrollIntoView(false);
      break;
    }
  }
}
