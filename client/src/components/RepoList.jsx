import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.count} total repos.
    <h4> Top Repos </h4>
    <ol>
      {props.repos.map(repo => {
        return (
        <li key={repo.id}>
          <a href={repo.html_url}>{repo.full_name}</a><span> - {repo.stargazers_count}</span>
        </li>
        )
      })}
    </ol>
  </div>
)

export default RepoList;