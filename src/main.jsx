import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ThemeProvider } from "@material-tailwind/react";
import App from './App.jsx';
import './index.css';

// const customTheme = {
//   button: {
//     defaultProps: {
//       variant: "filled",
//       size: "md",
//       ripple: true,
//     },
//     styles: {
//       base: {
//         initial: {
//           textTransform: "none",
//         },
//       },
//     },
//   },
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ThemeProvider value={customTheme}> */}
      <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>,
);
