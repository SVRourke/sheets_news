// BROAD UTILITIES
const nodelistToArray = (nodes) => {
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
  return nodelistToArray(rawElements).slice(1);
};

// POSTLINK UTILITIES
const rowsSlector = () => {
  return document.querySelectorAll(
    "#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr"
  );
};

// chunk rows takes the list trs created by rowSelector
// and returns a new list with each items being a list in it's self
// with the first item being a tr containing the
// - order number
// - upvote link?
// - story link (contains title)
// - title
// - sitebit (source site)
//
// The second contains
// - upvote count
// - user profile link (user name inside)
// - hide link
// - comment count

const chunkRows = (rows) => {
  const newRows = [];
  let tempStorage = [];

  while (rows.length > 0) {
    const currentRow = rows.shift();
    if (currentRow.textContent == "") {
      console.log("SPACER", tempStorage);
      if (tempStorage.length == 2) newRows.push(tempStorage);
      tempStorage = [];
    } else {
      tempStorage.push(currentRow);
    }
  }
  return newRows;
};

// with the first item being a tr containing the
// The second contains
// - comment count

const parseRow = (row) => {
  return {
    number: row[0].querySelector(".rank").textContent,
    upvoteUrl: row[0].querySelector("center > a").href,
    storyUrl: row[0].querySelector("a.storylink").href,
    title: row[0].querySelector("a.storylink").textContent,
    sourceSite: row[0].querySelector("span.sitebit > a").href,
    sourceName: row[0].querySelector("span.sitebit > a").textContent,
    upvoteCount: row[1].querySelector(".subtext > span.score"),
    posterLink: row[1].querySelector("span.subtext > .hnuser").href,
    pasterName: row[1].querySelector(".subtext > .hnuser").textContent,
    postAge: row[1].querySelector(".subtext > .age").textContent,
    hideUrl: row[1].querySelector(".subtext > a:nth-child(5)").href,
    commentCount: row[1].querySelector(".subtext > a:nth-child(6)")
      .textContent,
    commentsUrl: row[1].querySelector(".subtext > a:nth-child(6)").href,
  };
};

// PAGINATION UTILITIES
const navLinks = getNavLinks();
const table = document.querySelector("table#hnmain");

const rows = nodelistToArray(rowsSlector());
const chunked = chunkRows(rows);
parseRow(chunked[0]);
debugger;
