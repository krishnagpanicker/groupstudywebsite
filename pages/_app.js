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
        </Head>
        <GlobalStyle/>
        <Component {...pageProps}/>
    </> 
  );
}
