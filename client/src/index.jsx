import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import SubmitSuccess from './components/SubmitSuccess.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      repoCount: 0,
      repoSubmit: {
        success: false,
        added: 0,
        dupes: 0,
        updated: 0
      }
    }
    this.read = this.read.bind(this);
  }

  componentDidMount() {
    this.read();
  }

  read () {
    $.get('repos', ({ count, top }) => {
      console.log(count);
      console.log(top);
      // console.log(repos.map(repo => repo['stargazers_count']));
      this.setState({ ...this.state, count, repos: top });
      console.log(this.state);
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: 'repos',
      type: 'POST',
      'Content-Type': 'application/json',
      data: {'term': term},
      success: (result) => {
        console.log('success', result);
        // var repoSubmit = {
        //   success: true,
        //   added: result.added,
        //   dupes: result.updated
        // };
        result.success = true;
        this.setState({repoSubmit: {...result}})
        console.log('setState', this.state);
        this.read();
      },
      error: () => {console.log('error')}
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} count={this.state.count}/>
      <Search onSearch={this.search.bind(this)}/>
      {this.repoAddedSuccess()}
    </div>)
  }

  repoAddedSuccess () {
    if (this.state.repoSubmit.success) {
      return <SubmitSuccess counts={this.state.repoSubmit} />
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));