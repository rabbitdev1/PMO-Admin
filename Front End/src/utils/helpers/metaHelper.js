export const setMetaData = (response, location) => {

  if (!response) return;

  const updateMetaTag = (selector, attribute, content) => {
    const element = document.querySelector(selector);
    if (element && content) {
      element.setAttribute(attribute, content);
    }
  };

  const defaultTitle = response.judul + " - Topup game terpercaya";
  const { hostname } = window.location;

  if (location.pathname === "/") {
    document.title = defaultTitle;
    updateMetaTag('meta[name="title"]', "content", defaultTitle);
    updateMetaTag(
      'meta[name="description"]',
      "content",
      response.deskripsi_meta,
    );
    updateMetaTag('meta[name="keywords"]', "content", response.keywords);
    updateMetaTag('meta[name="image"]', "content", response.meta_image);
  }

  else {
    const judulHalaman = location.pathname
      .replace("/", "")
      .split("/")
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ");

    const pageTitle = response.judul + " - " + judulHalaman;
    document.title = pageTitle;
    updateMetaTag('meta[name="title"]', "content", pageTitle);
    updateMetaTag(
      'meta[name="description"]',
      "content",
      response.deskripsi_meta,
    );
    updateMetaTag('meta[name="keywords"]', "content", response.keywords);
    updateMetaTag('meta[name="image"]', "content", response.meta_image);
  }

  // Common meta tag updates
  updateMetaTag('meta[name="author"]', "content", response.judul);

  const commonMetaUpdates = [
    ['meta[property="og:url"]', hostname],
    ['meta[property="og:title"]', response.judul],
    ['meta[property="og:description"]', response.deskripsi_meta],
    ['meta[property="og:image"]', response.meta_image],
    ['meta[property="twitter:url"]', hostname],
    ['meta[property="twitter:title"]', response.judul],
    ['meta[property="twitter:description"]', response.deskripsi_meta],
    ['meta[property="twitter:image"]', response.meta_image],
  ];

  commonMetaUpdates.forEach(([selector, content]) => {
    updateMetaTag(selector, "content", content);
  });

  const updateLinkHref = (selector, href) => {
    const element = document.querySelector(selector);
    if (element && href) {
      element.href = href;
    }
  };

  updateLinkHref('link[rel="apple-touch-icon"]', response?.favicon);
  updateLinkHref('link[rel="icon"]', response?.favicon);
};
