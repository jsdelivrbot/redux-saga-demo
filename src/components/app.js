import React, { Component } from 'react';
import { connect } from 'react-redux';
import testAction from '../actions';

const renderPosts = (posts) => {
  if (!posts.length) {
    return <h1>No posts to show</h1>;
  }

  const listItems = posts.map((item) => <li key={item.id}>{item.title}</li>);
  return <ul>{listItems}</ul>;
}

const App = (props) => {
  return (
    <div>
      <button onClick={() => props.test()}>Dispatch saga action</button>
      {renderPosts(props.posts)}
    </div>
  );
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { test: testAction })(App);
