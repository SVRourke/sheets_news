// import { parsePage, parsePosts } from "./lib/parse";
import { parsePage } from "./lib/parse";
import {
  clearPage,
  buildHeading,
  buildRows,
  footerNav,
  nextLink,
} from "./lib/pageBuilder";
document.querySelector("link[type='text/css']").remove();

if (window.location.href.match(/item\?/)) {
  // Item parsing
  console.log("discussion");
} else {
  // posts parsing
  console.log("posts");

  const pageBackup = document.querySelector("table#hnmain");

  const pageData = parsePage();
  //removing the defualt page
  clearPage();
  console.log(pageData);

  // parse footer nav
  // parse search form
  // console.log(pageData);
  const newTable = document.createElement("table");
  document.body.appendChild(newTable);

  const heading = buildHeading(pageData.posts);
  newTable.appendChild(heading);
  // newTable.appendChild(heading);
  buildRows(newTable, pageData.posts);
  nextLink(newTable, pageData.next_page);
  footerNav(newTable, pageData.footer_navigation);
  // Clear STYLES
  console.log(window.location.href);
}
