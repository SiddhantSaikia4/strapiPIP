// pages/_app.js
// import { AuthProvider } from '../lib/authContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // <AuthProvider>
      <Component {...pageProps} />
    // </AuthProvider>
  );
}

export default MyApp;
