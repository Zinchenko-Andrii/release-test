import * as core from '@actions/core';
import * as github from '@actions/github';

const { context } = github;
const { repository } = context.payload;
const { owner } = repository;

const gh = github.getOctokit(process.env.GITHUB_TOKEN);
const args = { owner: owner.name || owner.login, repo: repository.name };

(async function run() {
  console.log('head_commit', context.payload.head_commit.message);

  const { message } = context.payload.head_commit;

  const branch = message.replace(message.slice(message.indexOf('\n\n')), '').split(`${process.env.ORGANIZATION}/`)[1]

  console.log('branch', branch);
  console.log('commits', context.payload.commits[0]);
  // console.log('context', context);
}());
