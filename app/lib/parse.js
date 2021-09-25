const nlToArr = (nodes) => {
  const output = [];

  for (const node of nodes) output.push(node);
  return output;
};

// NAVLINK UTILITIES
const navLinksSelector = () => {
  return document
    .querySelector(
      "#hnmain > tbody > tr:nth-child(1) > td > table > tbody > tr"
    )
    .querySelectorAll("a");
};

const getNavLinks = () => {
  const rawElements = navLinksSelector();
  return nlToArr(rawElements)
    .slice(1)
    .map((e) => {
      return {
        text: e.textContent,
        link: e.href,
      };
    });
};

// POSTLINK UTILITIES
const rowsSelector = () => {
  return document.querySelectorAll(
    "#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr"
  );
};

// chunk rows takes the list trs created by rowSelector
// and returns a new list with each items being a list in it's self
// with the first item being a tr containing: order number,
// upvote link, story link (contains title), title, sitebit (source site).
// The second contains: upvote count, user profile link (user name inside),
// hide link, comment count

const chunkRows = () => {
  const rows = nlToArr(rowsSelector());
  const newRows = [];
  let tempStorage = [];

  while (rows.length > 0) {
    const currentRow = rows.shift();
    if (currentRow.textContent == "") {
      if (tempStorage.length == 2) newRows.push(tempStorage);
      tempStorage = [];
    } else {
      tempStorage.push(currentRow);
    }
  }
  return newRows;
};

const applySelector = (element, selector, url = false) => {
  try {
    if (!!url) {
      return element.querySelector(selector).href;
    } else {
      return element.querySelector(selector).textContent;
    }
  } catch (TypeError) {
    return false;
  }
};

const parseRow = (row) => {
  return {
    number: applySelector(row[0], ".rank"),
    upvoteUrl: applySelector(row[0], "center > a", true),
    storyUrl: applySelector(row[0], "a.storylink", true),
    title: applySelector(row[0], "a.storylink"),
    sourceSite: applySelector(row[0], "span.sitebit > a", true),
    sourceName: applySelector(row[0], "span.sitebit > a"),
    upvoteCount: applySelector(row[1], ".subtext > span.score"),
    posterLink: applySelector(row[1], ".subtext > .hnuser", true),
    posterName: applySelector(row[1], ".subtext > .hnuser"),
    postAge: applySelector(row[1], ".subtext > .age"),
    hideUrl: applySelector(row[1], ".subtext > a:nth-child(5)", true),
    commentCount: applySelector(row[1], ".subtext > a:nth-child(6)"),
    commentsUrl: applySelector(row[1], ".subtext > a:nth-child(6)", true),
  };
};

const parsePosts = () => {
  const rows = nlToArr(rowsSelector());
  const halfParsed = chunkRows(rows);
  const newRows = [];
  halfParsed.forEach((e) => {
    newRows.push(parseRow(e));
  });
  return newRows;
};

const getFooterLinks = () => {
  const links = nlToArr(document.querySelectorAll(".yclinks > a"));

  return links.map((e) => {
    return { text: e.textContent, link: e.href };
  });
};

const getSearchForm = () => {
  return document.querySelector("form");
};

const getNextLink = () => {
  const link = document.querySelector(
    "#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(92) > td.title > a"
  );
  return {
    text: link.textContent,
    link: link.href,
  };
};

module.exports.parsePage = () => {
  return {
    navigation: getNavLinks(),
    footer_navigation: getFooterLinks(),
    posts: parsePosts(),
    search: getSearchForm(),
    next_page: getNextLink(),
  };
};
