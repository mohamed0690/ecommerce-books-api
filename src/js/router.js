const urlPageTitle = "";

const urlRoutes = {
  "/": {
    template: "/index.html",
    title: "Home | " + urlPageTitle,
    description: "This is the home page",
  },
  "/search": {
    template: "/src/pages/search.html",
    title: "Search | " + urlPageTitle,
    description: "This is the search page",
  },
  "/cart": {
    template: "/src/pages/cart.html",
    title: "Cart | " + urlPageTitle,
    description: "This is the cart page",
  },
  "/overview": {
    template: "/src/pages/overview.html",
    title: "Overview | " + urlPageTitle,
    description: "This is the overview page",
  },
  "/about": {
    template: "/src/pages/aboutus.html",
    title: "About Us | " + urlPageTitle,
    description: "This is the about page",
  },
  "/contact": {
    template: "/src/pages/contact.html",
    title: "Contact Us | " + urlPageTitle,
    description: "This is the contact page",
  },
  404: {
    template: "/src/pages/notfound.html",
    title: "404 | " + urlPageTitle,
    description: "Page not found",
  },
};

const contentDiv = document.querySelector("article");

const fetchTemplate = async (template) => {
  const response = await fetch(template);
  if (!response.ok) {
    throw new Error(`Failed to fetch template: ${response.statusText}`);
  }
  return response.text();
};

const updateContent = (html) => {
  contentDiv.innerHTML = html;
};

const updateDocumentMeta = (title, description) => {
  document.title = title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }
};

const handleRoute = async (location) => {
  const route = urlRoutes[location] || urlRoutes[404];
  const templateHtml = await fetchTemplate(route.template);
  updateContent(templateHtml);
  updateDocumentMeta(route.title, route.description);
};

const changeRoute = (location) => {
  window.history.pushState({}, "", location);
  handleRoute(location);
};

const handleNavClick = (e) => {
  const { target } = e;
  if (target.matches(".navbar-list a")) {
    e.preventDefault();
    changeRoute(target.href);
  }
};

document.addEventListener("click", handleNavClick);
window.addEventListener("popstate", () =>
  handleRoute(window.location.pathname)
);

handleRoute(window.location.pathname);
