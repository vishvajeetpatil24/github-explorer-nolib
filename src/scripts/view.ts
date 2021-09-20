import { Repos } from "./script";
import { createDivElement, timeDisplay, uniqueArray } from "./utils";

export const displayResponse = (
  foundRepos,
  fromSearch = false,
  updateSortBar = false
) => {
  if (foundRepos.length == 0) {
    if (fromSearch) {
      const notFoundNode = createDivElement(
        "notFound",
        "No repos found for given keyword"
      );
      document.getElementById("response").innerHTML = notFoundNode.outerHTML;
      document.getElementById("sortAndLangBar").innerHTML = "";
    } else if (!fromSearch) {
      const notFoundNode = createDivElement(
        "notFound",
        "No public repos found for given user"
      );
      document.getElementById("response").innerHTML = notFoundNode.outerHTML;
      document.getElementById("sortAndLangBar").innerHTML = "";
    }
  } else {
    const listElement = getRepoListNode(foundRepos);
    const resultNode = createDivElement("repolist", listElement.outerHTML);
    const sortAndLangBar = getSortAndLangBarNode(
      fromSearch ? foundRepos : undefined
    );

    if (updateSortBar)
      document.getElementById("sortAndLangBar").outerHTML =
        sortAndLangBar.outerHTML;

    document.getElementById("response").innerHTML = resultNode.outerHTML;
  }
};

const getSortAndLangBarNode = (repos = Repos.repos) => {
  return createDivElement(
    "sortAndLangBar",
    `
  <details class="details" id="languageSelector">
    <summary>
      <span>Language</span>
      <span class="dropdown-caret"></span>
    </summary>
    <details-menu>
      <form id="languages">
        ${languageLabels(repos.map((repo) => repo.language))}
      </form>
    </details-menu>
  </details>
  <details class="details" style="left: 150px;" id="sortSelector">
    <summary>
      <span>Sort</span>
      <span class="dropdown-caret"></span>
    </summary>
    <details-menu>
      <form id="sortcriterion">
        <label class="summary-menu-label">
          <input type="radio" name="sortcriterion" value="Last Updated" hidden="hidden" onchange="(function() {require('script').sortHandler('LU')})()">
          <span>Last Updated</span>
          <hr />
        </label>
        <label class="summary-menu-label">
          <input type="radio" name="sortcriterion" value="Stars" hidden="hidden" onchange="(function() {require('script').sortHandler('ST')})()">
          <span>Stars</span>
        </label>
      </form>
    </details-menu>
  </details>`
  );
};

const getRepoListNode = (repos: GithubRepo[]) => {
  const ul = document.createElement("ul");
  ul.id = "repoUL";
  ul.innerHTML = repos
    .map(
      (repo) =>
        `<li class="repo row">
      <h3>${repo.name ?? ""}</h3>
      <p>${repo.description ?? ""}</p>
      <div class="secondary-info">
        <div class="row-element">
          <span class="language-color" style="background-color: #4F5D95"></span>
          <span>${repo.language ?? "Unknown"}</span>
        </div>
        <div class="row-element leftpositioned" style="left: 200px;">
          <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" class="star-icon">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
          </svg>
          <span>${repo.stargazers_count}</span>
        </div>
        <div class="row-element leftpositioned" style="left: 400px;">
          <span> Updated ${timeDisplay(repo.updated_at)} ago </span>
        </div>
      </div>
    </li>`
    )
    .reduce((prev, current) => (prev += current));
  return ul;
};

const languageLabels = (languages: string[]) => {
  const langHTMLString = uniqueArray(languages)
    .filter((language) => language !== undefined && language !== null)
    .map(
      (language) => `
  <label class="summary-menu-label">
    <input type="radio" name="language" value="${language}" hidden="hidden" onchange="(function() {require('script').languageChangeHandler('${language}')})()">
    <span>${language}</span>
    <hr />
  </label>`
    )
    .reduce((prev, current) => (prev += current), "");

  return (
    langHTMLString +
    `<label class="summary-menu-label">
    <input type="radio" name="language" value="All" checked hidden="hidden" onchange="(function() {require('script').languageChangeHandler()})()">
    <span>All</span>
  </label>`
  );
};
