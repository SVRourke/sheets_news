// import { parsePage, parsePosts } from "./lib/parse";
import { parsePage } from "./lib/parse";
import { clearPage, buildHeading, buildRows } from "./lib/pageBuilder";

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

  // parse footer nav
  // parse search form
  // console.log(pageData);
  const newTable = document.createElement("table");
  document.body.appendChild(newTable);

  const heading = buildHeading(pageData.posts);
  newTable.appendChild(heading);
  // newTable.appendChild(heading);
  buildRows(newTable, pageData.posts);
  // Clear STYLES
  document.querySelector("link[type='text/css']").remove();
  console.log(window.location.href);
}
