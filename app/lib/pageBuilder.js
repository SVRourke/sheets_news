module.exports.clearPage = () => {
  document.querySelector("center").remove();
};

const tableHeadings = [
  "number",
  "story",
  "age",
  "votes",
  "comments",
  "hide",
  "author",
  "source",
];

module.exports.buildHeading = (rows) => {
  const heading = document.createElement("tr");
  tableHeadings.forEach((h) => {
    const item = document.createElement("th");
    if (h !== "number") item.textContent = h;
    heading.appendChild(item);
  });
  for (let i = 0; i < 4; i++) {
    const pad = document.createElement("td");
    pad.classList.add("padding");
    heading.appendChild(pad);
  }
  return heading;
};

const newEl = (tag, className = false) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  return element;
};

const newLink = (text, href) => {
  const link = newEl("a");
  link.textContent = text;
  link.href = href;
  return link;
};

const createTds = {
  story: (post) => {
    let { title, storyUrl } = post;
    const td = newEl("td", "story");
    td.appendChild(newLink(title, storyUrl));
    return td;
  },
  votes: (post) => {
    const { upvoteCount, upvoteUrl } = post;
    const td = newEl("td", "votes");
    td.appendChild(newLink(upvoteCount, upvoteUrl));
    return td;
  },
  comments: (post) => {
    const { commentCount, commentsUrl } = post;
    const td = newEl("td", "comments");
    td.appendChild(newLink(commentCount, commentsUrl));
    return td;
  },
  hide: (post) => {
    const { hideUrl } = post;
    const td = newEl("td", "hide");
    td.appendChild(newLink("hide", hideUrl));
    return td;
  },
  author: (post) => {
    const { posterName, posterLink } = post;
    const td = newEl("td", "author");
    td.appendChild(newLink(posterName, posterLink));
    return td;
  },
  source: (post) => {
    const { sourceName, sourceSite } = post;
    const td = newEl("td", "source");
    td.appendChild(newLink(sourceName, sourceSite));
    return td;
  },
  number: (post) => {
    const { number } = post;
    const td = newEl("td", "number");
    td.textContent = number;
    return td;
  },
  age: (post) => {
    const { postAge } = post;
    const td = newEl("td", "age");
    td.textContent = postAge;
    return td;
  },
};

const buildRow = (row) => {
  const tableRow = newEl("tr");
  tableHeadings.forEach((h) => {
    const item = createTds[h](row);
    tableRow.appendChild(item);
  });
  return tableRow;
};

module.exports.buildRows = (table, posts) => {
  posts.forEach((post) => {
    console.log("HELLO");
    table.appendChild(buildRow(post));
  });
};

module.exports.nextLink = (table, navlinkInfo) => {
  const { text, link } = navlinkInfo;
  const row = newEl("tr");
  const td = newEl("td");
  const a = newLink(text, link);
  console.log(text, link, a);
  td.appendChild(a);
  row.appendChild(td);
  table.appendChild(row);
};

// navigation = [
//   {text, link}
// ] 9

// footer_navigation = [
//   {text, link}
// ] 8

module.exports.footerNav = (table, footerNavItems) => {
  const row = newEl("tr");
  footerNavItems.forEach((e) => {
    const td = newEl("td");
    const link = newEl("a");
    link.textContent = e.text;
    link.href = e.href;
    td.appendChild(link);
    row.appendChild(td);
  });
  table.appendChild(row);
};
