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
			<div className='logo'>
			<div className='contactInfoContainer'>
				<h3>Subscribe or follow me for update</h3>
				<div className='contactInfo'>
					<a target='_blank' href={'http://yutingwang.me/'}>PORTFOLIO / </a>
					<a target='_blank' href={'https://twitter.com/YutWang'}>TWITTER / </a>
					<a target='_blank' href={'https://github.com/Angelwang51'}>GITHUB / </a>
					<a target='_blank' href={'https://instagram.com/yutingwangme/'}>INSTAGRAM</a>
			    </div>
			</div>
			</div>  
			<div className='introContainer'>
				<p>I’ll stop wearing black</p>
				<p>when they make a darker color</p>
			</div>

			<div>
	      		<ArticleList articles={this.state.articles}/>
	      	</div>
		</div>
	)}
})

export default Home;