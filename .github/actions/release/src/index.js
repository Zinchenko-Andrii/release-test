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
  const { message } = context.payload.head_commit;

  const branch = message.replace(message.slice(message.indexOf('\n\n')), '').split(`${process.env.ORGANIZATION}/`)[1]

  console.log('branch', branch);
  // console.log('commits', context.payload.commits);
  const tags = await getAllTags();
  // console.log('tags', tags);
  console.log('tag -- ', tags.find(({ commit }) => commit.sha === context.payload.commits[0].id))
}());
