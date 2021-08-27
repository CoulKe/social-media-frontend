import { Link } from "react-router-dom";
const reactStringReplace = require("react-string-replace");

/**
 * Formats text to replace urls and hashtags to links.
 * @param {*} prop.text - Text to format.
 * @param {object} prop.linkStyle - styles to apply to links.
 * @returns formattted text.
 */
export const Linkify = function ({ text, linkStyles={} }) {
  // let formattedText = parse(text); /(https?:\/\/\S+)/g
  // Match URLs
  let replacedText = reactStringReplace(
    text,
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.?[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
    (match, i) => (
      <a key={match + i} style={linkStyles} href={match}>
        {match}
      </a>
    )
  );

  // Match emails
  // Put this before mentions to avoid errors
  replacedText = reactStringReplace(
    replacedText,
    /([^\s@]+@[^\s@]+)/g,
    (match, i) => (
      <a key={match + i} style={linkStyles} href={`mailto:${match}`}>
        {match}
      </a>
    )
  );

  // Match @-mentions
  replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
    <a key={match + i} style={linkStyles} href={`https://twitter.com/${match}`}>
      @{match}
    </a>
  ));

  // Match hashtags
  replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
    <Link key={match + i} style={linkStyles} to={`/hashtags/${match}`}>
      #{match}
    </Link>
  ));
  return replacedText;
};

export const FormatNotification = function ({ text }) {
  let replacedText = reactStringReplace(
    text,
    /<b>([\s\S]+?)<\/b>/g,
    (match, i) => <b key={match + i}>{match}</b>
  );
  return replacedText;
};
