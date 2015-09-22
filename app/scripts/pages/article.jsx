import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import {Link} from 'react-router';
import CommentList from '../components/commentList.jsx';


var Article = React.createClass({
	mixins: [ReactFireMixin],
	//getInitialState to prevent react render DOM first and find article erro
	getInitialState: function(){
		//var article = {};
		//article['.key'] = ''
		return {
			//set key "" to prevent fetch erro (fetch nothing from sever) accure and JS stop working
			article: {
				'.key': ''},
    		//article: article
    		comments:[],
    		comment:'',
    		name:'',
    		date:''
		}

	},
	componentWillMount: function(){
		var id = this.props.params.articleId;
		//console.log(id);
		var ref = new Firebase('https://react-fireblog.firebaseio.com/articles/'+id);
		//article is an object and artciels is a array
		this.bindAsObject(ref, 'article');
	},
	componentDidMount: function(){
		var id = this.props.params.articleId;
		var ref = new Firebase('https://react-fireblog.firebaseio.com/articles/'+id+'/comments');
		this.bindAsArray(ref, 'comments');
    //console.log(this.firebaseRefs.articles);
	},
	displayEdit: function(){
		var ref = new Firebase("https://react-fireblog.firebaseio.com");
    	var authData = ref.getAuth();
    	if(authData && authData.uid=='twitter:346544377'){
      	return (
	        <button>
				{/*if failed fetch '.key' from sever JS will continue working because its initial state is set to ''.*/}
				<Link  id='editButton' to='edit' params={{articleId: this.state.article['.key']}}>Edit</Link>
			
			</button>
    	)}else{
      		return null
    };
	},
	handleSubmit: function(e){
    	e.preventDefault();
    	var date = new Date();
		this.firebaseRefs['comments'].push({
				name: this.state.name,
				comment: this.state.comment,
				date: date
			});
			this.setState({
				name:'',
				comment:'',
				date:''
			});		
	},
	handleChangeName: function(e){
		this.setState({name: e.target.value})
	},
	handleChangeComment: function(e){
		this.setState({comment: e.target.value})
	},

	render: function(){
		/*var self = this;
		console.log(this.state.article.coverImage);

		window.onload= function(){
			console.log(self.state.article.coverImage);	
			var e = document.getElementsByTagName('header')[0];
			e.style.backgroundImage="url('http://media.nu.nl/m/m1fz6dwa6h3w.jpg')";
		};*/
		//e.style.backgroundColor="#fff";};
		return(
			<div id='articleContainer'>
				<div id='articleTitle'>
					<h1>{this.state.article.title}</h1>
				</div>
				<div id='articleImage'>
					<img src={this.state.article.coverImage} />
				</div>
				<div id='articleBody'>
					{this.state.article.body}
				</div>
				{this.displayEdit()}
				<div id="commentContainer">
				<h3>comments</h3>
				<CommentList comments={this.state.comments} />
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="mdl-textfield mdl-js-textfield">
						<h3>Leave a Comment</h3>
						<div>
						    <input onChange={this.handleChangeName} value={this.state.name} className="mdl-textfield__input" type="text" id="sample1"/>
						    <label className="mdl-textfield__label" for="sample1">Name</label>
						</div>
						<div className="mdl-textfield mdl-js-textfield">
						    <textarea onChange={this.handleChangeComment} value={this.state.comment} className="mdl-textfield__input" type="text" rows= "3" id="sample5"></textarea>
						    <label className="mdl-textfield__label" for="sample5">Comment</label>
						</div>
						<button>send</button>
					</div>
				</form>
			</div>
			)

	}
})

export default Article;
