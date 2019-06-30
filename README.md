# gatsby-plugin-csp

[Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

`gatsby-plugin-csp` by default creates strict policy, generates script and style hashes then adds `Content-Security-Policy` meta tag to the `<head>` of each page.

## Install

`npm i gatsby-plugin-csp`

or

`yarn add gatsby-plugin-csp`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-csp`]
};
```

Default Policy:

```
base-uri 'self';
default-src 'self';
script-src 'self' 'sha256-iF/...GM=' 'sha256-BOv...L4=';
style-src 'self' 'sha256-WCK...jU=';
object-src 'none';
form-action 'self';
font-src 'self' data:;
connect-src 'self';
img-src 'self' data:;
```

sha256 for every inline script and style is generated automatically during the build process and appended to its directive (`script-src` or `style-src`).

## Options

Strict CSP can break a lot of things you use on your website, especially 3rd party scripts like Google Analytics. To allow your 3rd party scripts running, you can adjust the policy through the plugin options.

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: true, // you can disable scripts sha256 hashes
        mergeStyleHashes: true, // you can disable styles sha256 hashes
        mergeDefaultDirectives: true,
        directives: {
          "script-src": "'self' www.google-analytics.com",
          "style-src": "'self' 'unsafe-inline'",
          "img-src": "'self' data: www.google-analytics.com"
          // you can add your directives or override defaults
        }
      }
    }
  ]
};
```

## Further reading

- [Improving Security of Gatsby Websites and Apps by Implementing a Strict CSP](https://bejamas.io/blog/content-security-policy-gatsby-websites/)
