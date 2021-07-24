import "../styles/index.css";

import Head from "next/head";
import * as React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
