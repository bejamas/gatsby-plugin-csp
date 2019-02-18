const crypto = require("crypto");

const defaultDirectives = {
  "base-uri": "'self'",
  "default-src": "'self'",
  "script-src": "'self'",
  "style-src": "'self'",
  "object-src": "'none'",
  "form-action": "'self'",
  "font-src": "'self' data:",
  "connect-src": "'self'",
  "img-src": "'self' data:"
};

function computeHash(component) {
  let { __html: stringHtml } = component.props.dangerouslySetInnerHTML;

  let hash = crypto
    .createHash("sha256")
    .update(stringHtml)
    .digest("base64");

  return "'sha256-" + hash + "'";
}

function cspString(csp) {
  return Object.keys(csp)
    .reduce((acc, key) => {
      if (csp[key]) {
        return `${acc}${key} ${csp[key]}; `;
      } else {
        return acc;
      }
    }, ``)
    .slice(0, -1); // remove last space
}

function getHashes(components, type) {
  let isType = element => element.type === type;
  let isInline = element =>
    element.props.dangerouslySetInnerHTML &&
    element.props.dangerouslySetInnerHTML.__html.length > 0;

  return components
    .filter(isType)
    .filter(isInline)
    .map(computeHash)
    .join(" ");
}

module.exports = {
  computeHash,
  cspString,
  getHashes,
  defaultDirectives
};
