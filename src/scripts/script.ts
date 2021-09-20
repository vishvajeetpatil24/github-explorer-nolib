import { findInNames } from "./utils";
import { displayResponse } from "./view";

// State available to all functions. Avoids pollution by using class rather than bare variable
export class Repos {
  static repos: GithubRepo[] = [];
  static currentView: GithubRepo[] = [];
  static sortSelection: string;
  static languageSelection: string;
}

export const init = async () => {
  const repos: GithubRepo[] = await (
    await fetch("http://localhost:3000/search")
  ).json();
  Repos.repos = repos;
  Repos.currentView = repos;
  displayResponse(repos, false, true);
};

export const searchRepo = async () => {
  const value = (document.getElementById("searchBar") as HTMLInputElement)
    .value;
  const foundRepos = findInNames(value, Repos.repos);
  Repos.currentView = foundRepos;
  displayResponse(foundRepos, true, true);
};

export const languageChangeHandler = (language) => {
  if (!language) Repos.languageSelection = "";
  else Repos.languageSelection = language;
  displayResponse(getView(Repos.currentView), false, false);
  document.getElementById("languageSelector").removeAttribute("open");
};

export const sortHandler = (criterion) => {
  Repos.sortSelection = criterion;
  displayResponse(getView(Repos.currentView));
  document.getElementById("sortSelector").removeAttribute("open");
};

export const refreshHandler = () => {
  init();
};

const getView = (repos) => {
  let sortedRepos = repos;
  if (Repos.sortSelection === "LU") {
    sortedRepos = repos.sort((repo1, repo2) => {
      return Date.parse(repo2.updated_at) - Date.parse(repo1.updated_at);
    });
  } else if (Repos.sortSelection === "ST") {
    sortedRepos = repos.sort((repo1, repo2) => {
      return repo2.stargazers_count - repo1.stargazers_count;
    });
  }
  if (Repos.languageSelection) {
    sortedRepos = sortedRepos.filter(
      (repo) => repo.language === Repos.languageSelection
    );
  }
  return sortedRepos;
};
