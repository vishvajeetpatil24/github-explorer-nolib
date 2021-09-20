export const timeDisplay = (dateString) => {
  const diff = Date.now() - Date.parse(dateString);
  // Not doing it for year/month because then it is not 100% accurate.
  // One need to take in account varying number of days and leap year stuff.
  const msInADay = 1000 * 3600 * 24;
  const msInHour = 1000 * 60 * 60;
  const msInMinute = 1000 * 60;
  if (Math.floor(diff / msInADay)) {
    return `${Math.floor(diff / msInADay)} day${
      Math.floor(diff / msInADay) == 1 ? "" : "s"
    }`;
  } else if (Math.floor(diff / msInHour)) {
    return `${Math.floor(diff / msInHour)} hour${
      Math.floor(diff / msInHour) == 1 ? "" : "s"
    }`;
  } else if (Math.floor(diff / msInMinute)) {
    return `${Math.floor(diff / msInMinute)} minute${
      Math.floor(diff / msInMinute) == 1 ? "" : "s"
    }`;
  } else {
    return "just moments";
  }
};

export const uniqueArray = (arr) =>
  arr.reduce((prev, next) => {
    if (prev.indexOf(next) < 0) prev.push(next);
    return prev;
  }, []);

export const findInNames = (value, repos: GithubRepo[]): GithubRepo[] => {
  return repos.filter((repo) =>
    repo.name.toLowerCase().includes(value.toLowerCase())
  );
};

export const createDivElement = (
  id: string,
  innerHTML?: string
): HTMLDivElement => {
  const newDiv = document.createElement("div");
  newDiv.id = id;
  newDiv.innerHTML = innerHTML;
  return newDiv;
};
