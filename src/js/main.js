"use strict";

let homePage;
let resumePage;
let servicePage;
let blogPage;
let allPages;
let pageTargetMap;

function initAllSections() {
  allPages = document.querySelectorAll("main section");
  homePage = document.querySelector('main > section[data-page="#home"]');
  resumePage = document.querySelector('main > section[data-page="#resume"]');
  servicePage = document.querySelector('main > section[data-page="#service"]');
  blogPage = document.querySelector('main > section[data-page="#blog"]');

  pageTargetMap = {
    "#home": homePage,
    "#resume": resumePage,
    "#service": servicePage,
    "#blog": blogPage,
  };
}

function addListenerForNavButton() {
  const navButtons = document.querySelectorAll("header a");
  console.log(navButtons);
  navButtons.forEach((navButton) => {
    navButton.addEventListener("click", (event) => {
      // click then do something.. (e.g. change some css)
      // 但是在这里面不要做具体的事情，抽象出去做, 放到这里面调用。
      // 比如在外面定义具体的改动function, 把target当参数传进去（function xxx(target){}）
      // 这个例子里其实并没用到，因为这个例子里是依据监听hash来换的，不是监听click
      // console.log(event.target);
    });
  });
}

function addHomeHashOnFirstLoad() {
  if (location.hash === "") {
    location.hash = "#home";
  }
}

function hideAllPages() {
  allPages.forEach((page) => {
    page.style.display = "none";
  });
}

function showTargetPage(pageNode) {
  hideAllPages();
  pageNode.style.display = "block";
}

function switchPage() {
  const targetPage = pageTargetMap[location.hash];
  showTargetPage(targetPage);
}

// 项目初始化的时候要做的事情
window.onload = function () {
  // print the log for current hash
  // console.log(location.hash)

  initAllSections();

  // add listener for hash change
  window.onhashchange = switchPage;

  // if current hash is empty, add #home
  addHomeHashOnFirstLoad();

  // add listener to nav button
  addListenerForNavButton();
};

function switchNavbarAndSidebar() {
  let x = document.querySelector("#sections");
  if (x.className === "navbar__sections") {
    x.className = "sidepanel";
    // x.display = 'block';
  } else {
    x.className = "navbar__sections";
  }
}

// if the window size becomes large again, switch side bar to navbar
window.addEventListener("resize", function (event) {
  if (window.innerWidth > 767) {
    document.querySelector("#sections").className = "navbar__sections";
  }
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (window.innerWidth > 767) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      document.querySelector(".navbar").style.backgroundColor = "white";
    } else {
      document.querySelector(".navbar").style.backgroundColor = "transparent";
    }
  }
}
