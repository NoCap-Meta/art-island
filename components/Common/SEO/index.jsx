import React from "react"
import Head from "next/head"

export default function SEO({
  author = "Dishant Sharma",
  meta,
  title = "Konflix and Chill: Where Anime Lovers Unite!"
}) {
  const metaData = [
    {
      name: `description`,
      content: `Discover unique and antique items on NoCap.Network. Browse our collection of rare and one-of-a-kind NFTs, including historic artifacts, vintage collectibles, and more. Sign up now to start your collection.`
    },
    {
      property: `og:title`,
      content: `NoCap.Network - Antique NFT Marketplace`
    },
    {
      property: `og:description`,
      content: `Discover unique and antique items on NoCap.Network. Browse our collection of rare and one-of-a-kind NFTs, including historic artifacts, vintage collectibles, and more. Sign up now to start your collection.`
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`
    },
    {
      name: `twitter:creator`,
      content: `@NoCapNetwork`
    },
    {
      name: `twitter:title`,
      content: `NoCap.Network - Antique NFT Marketplace`
    },
    {
      name: `twitter:description`,
      content: `Discover unique and antique items on NoCap.Network. Browse our collection of rare and one-of-a-kind NFTs, including historic artifacts, vintage collectibles, and more. Sign up now to start your collection.`
    }
  ]
  .concat(meta)
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/Images/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
}