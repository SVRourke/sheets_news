module.exports.clearPage = () => {
  document.querySelector("center").remove();
};

const tableHeadings = [
  "number",
  "story", // LINK title storyUrl
  "age",
  "votes", // LINK upvoteCount upvoteUrl
  "comments", // LINK commentCount commentsUrl
  "hide", // LINK hideUrl
  "author", // LINK posterName posterLink
  "source", // LINK sourceName sourceSite
];

// create table heading

module.exports.buildHeading = (rows) => {
  const heading = document.createElement("tr");
  tableHeadings.forEach((h) => {
    const item = document.createElement("th");
    if (h !== "number") item.textContent = h;
    heading.appendChild(item);
  });
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

// create table
// create table body
// add footer to body
//add table to doc

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
