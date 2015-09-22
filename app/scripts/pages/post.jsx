import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';


var Post = React.createClass({
	
	mixins: [ReactFireMixin],

	getInitialState: function(){
		return{
				articles:[],
		 		title:'',
		  		coverImage:'',
		   		summary:'',
		    	body:'',
		     	date:'',
		     	user:''
		     };
	},
	componentWillMount: function(){
		var ref = new Firebase('https://react-fireblog.firebaseio.com/articles');
		this.bindAsArray(ref, 'articles');
	},
	handleSubmit: function(e){
		var ref = new Firebase("https://react-fireblog.firebaseio.com");
		var authData = ref.getAuth();
		var date = new Date().valueOf();
    	e.preventDefault();
    	if(this.state.coverImage){
		this.firebaseRefs['articles'].push({
				title: this.state.title,
				coverImage: this.state.coverImage,
				summary: this.state.summary,
				body: this.state.body,
				date: date,
				user: authData.uid
			});

			this.setState({
				title:'',
				coverImage:'',
				summary:'',
				body:'',
				date:'',
				user:''
			});
		}else{
			this.firebaseRefs['articles'].push({
				title: this.state.title,
				//default image url
				coverImage: 'https://41.media.tumblr.com/cd1c0a571bdd2d81e47dbd9dfece8f30/tumblr_mre6fd0KFr1stlkgho1_500.jpg',
				summary: this.state.summary,
				body: this.state.body,
				date: date,
				user: authData.uid
			});

			this.setState({
				title:'',
				coverImage:'',
				summary:'',
				body:'',
				date:'',
				user:''
			});
		}	
	},
	redirectToHomePage:function(){
		window.location.href = '/';
	},
	handleChangeTitle: function(e){
		this.setState({title: e.target.value})
	},
	handleChangeCoverImage: function(e){
		this.setState({coverImage: e.target.value})
	},
	handleChangeSummary: function(e){
		this.setState({summary: e.target.value})
	},
	handleChangeBody: function(e){
		this.setState({body: e.target.value})
	},

	render: function(){
		var self = this;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input onChange={this.handleChangeTitle} value={this.state.title} placeholder='Title' />
					</div>
					<div>
						<input id='imageInput' onChange={this.handleChangeCoverImage} value={this.state.coverImage} placeholder='Cover Image URL' />
					</div>
					<div>
						<textarea onChange={this.handleChangeSummary} value={this.state.summary} placeholder='Summary'/>
					</div>
					<div>
						<textarea onChange={this.handleChangeBody} value={this.state.body} placeholder='Body'/>
					</div>
					
					<button onClick={this.redirectToHomePage}>Publish</button>
				</form>
			</div>
			)
	}
})

export default Post;