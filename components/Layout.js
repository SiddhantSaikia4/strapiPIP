import Head from 'next/head';
import Nav from './Nav';
import { UserProvider } from '../lib/authContext';
import SignIn  from "../pages/signin";

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>Form Database</title>
    </Head>

    <Nav />
    <main className="px-4">
      <div
        className="
          contents
          justify-center
          items-center
          bg-white
          mx-auto
          w-2/4
          rounded-lg
          my-16
          p-16
        "
      >
        <div className="text-2xl font-medium" style={{background: 'radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)'}}>{children}</div>
      </div>
    </main>
  </UserProvider>
);
export default Layout;
