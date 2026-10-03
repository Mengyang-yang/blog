import Document, { Html, Head, Main, NextScript } from 'next/document'
import { KEYWORDS, DESCRIPTION, AUTHOR, LANG } from '../lib/constants'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={LANG}>
        <Head>
          <meta name="description" content={DESCRIPTION} />
          <meta name="author" content={AUTHOR} />
          <meta name="keywords" content={KEYWORDS} />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />
          <script
            defer
            src="https://stats.mengyangblog.page/script.js"
            data-website-id="16b37dd8-1acb-48ff-9522-32d5f200508a"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}