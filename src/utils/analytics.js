import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-BZE99BPQSY");
};

export const pageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (category, action, label = "") => {
  ReactGA.event({
    category,
    action,
    label,
  });
};