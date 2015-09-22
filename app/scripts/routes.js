import React from 'react';
import { Route, DefaultRoute, NotFoundRoute} from 'react-router';
import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Info from './pages/info.jsx';
import Article from './pages/article.jsx';
import Post from './pages/post.jsx';
import Edit from './pages/edit.jsx';
import NotFound from './pages/notFound.jsx';

var routes = (
  <Route name="app" path="/" handler={ App }>
    <Route name="info" handler={ Info } />
    <Route name="home" handler={ Home } />
    <Route name="article" path = "/articles/:articleId" handler={ Article }/>
    <Route name="post" handler={ Post } />
    <Route name="edit" path = "/edit/:articleId" handler={ Edit } />
    <DefaultRoute handler={ Home } />
    <NotFoundRoute handler={ NotFound } />
  </Route>
);

export default routes;