import * as core from '@actions/core';
import * as github from '@actions/github';

const { context } = github;
const { repository } = context.payload;
const { owner } = repository;

const gh = github.getOctokit(process.env.GITHUB_TOKEN);
const args = { owner: owner.name || owner.login, repo: repository.name };

const getTotalPageCount = (headerLink) => {
  if (headerLink) {
    return headerLink.split(',')[1].match(/.*page=(?<page_num>\d+)/).groups.page_num;
  }

  return 1;
};

const getAllTags = async () => {
  const { headers: tagsHeaders } = await gh.repos.listTags({ ...args });
  const tagsTotalPageCount = getTotalPageCount(tagsHeaders.link);
  const allTagsList = [];

  for (let i = 1; i <= tagsTotalPageCount; i++) {
    // eslint-disable-next-line no-await-in-loop
    const { data } = await gh.repos.listTags({
      ...args,
      page: i,
      per_page: 100,
    });

    allTagsList.push(...data);
  }

  return allTagsList;
};

(async function run() {
  const tags = await getAllTags();
  const releaseTag = tags.find(({ commit }) => commit.sha === context.payload.commits[0].id);

  if (releaseTag) {
    core.setOutput('releaseTag', releaseTag.name);
    core.setOutput('packageName', repository.name);
  }
}());
