import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import ArticleList from '../components/articleList.jsx';



var Home = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function(){
		return {articles: [], article: ''};
	},
	componentWillMount: function(){
		var ref = new Firebase('https://react-fireblog.firebaseio.com/articles');
		this.bindAsArray(ref, 'articles');
    //console.log(this.firebaseRefs.articles);
	},
	render: function(){
		
    return (
		<div id="homeContainer">
			<div className='introContainer'>
				<div className='intro'>
					
					<p>I’ll stop wearing black</p>
					<p>when they make a darker color</p>
					

				</div>
			</div>
			<div>
	      		<ArticleList articles={this.state.articles}/>
	      	</div>
		</div>
	)}
})

export default Home;