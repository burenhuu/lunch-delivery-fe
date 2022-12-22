import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="index, follow" />
                <link
                    rel="shortcut icon"
                    href="https://www.toki.mn/wp-content/uploads/2020/07/cropped-favi-1-32x32.png"
                    sizes="32x32"
                ></link>
                <link
                    rel="shortcut icon"
                    href="https://www.toki.mn/wp-content/uploads/2020/07/cropped-favi-1-192x192.png"
                    sizes="192x192"
                ></link>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
