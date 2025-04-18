// src/analytics.ts
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-YN3T2K6QHK');
  ReactGA.send('pageview');
};

export const trackPageView = () => {
  ReactGA.send('pageview');
};
