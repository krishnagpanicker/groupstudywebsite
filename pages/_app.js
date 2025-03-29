import Head from 'next/head';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
        <Head>
            <title>PSU Group Study</title>
            <meta name='description' content='Study group finder to help you meet fellow Penn State study buddies.'></meta>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/Logofavicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/images/Logofavicon-16x16.png"/>
        </Head>
        <GlobalStyle/>
        <Component {...pageProps}/>
    </> 
  );
}
