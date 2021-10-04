import * as core from '@actions/core';
import * as github from '@actions/github';

const { context } = github;
const { repository } = context.payload;
const { owner } = repository;

const gh = github.getOctokit(process.env.GITHUB_TOKEN);
const args = { owner: owner.name || owner.login, repo: repository.name };

(async function run() {
  console.log('head_commit', context.payload.head_commit);
  console.log('commits', context.payload.commits);
  console.log('context', context);
}());
