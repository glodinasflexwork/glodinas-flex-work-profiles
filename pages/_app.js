import '../styles/globals.css';
import '../i18n'; // 👈 Add this line
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);