import ReactGA from 'react-ga4'

const GA_MEASUREMENT_ID = 'G-BZE99BPQSY'

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID)
}

export const trackEvent = ({
  category,
  action,
  label,
}) => {
  ReactGA.event({
    category,
    action,
    label,
  })
}