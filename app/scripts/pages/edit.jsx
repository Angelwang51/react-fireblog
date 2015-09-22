import React from 'react';
import Firebase from 'firebase';

var Edit = React.createClass({

	getInitialState: function(){
	
		return{
			title:'',
			coverImage:'',
			summary:'',
			body:''
			}

	},
	componentWillMount: function(){
		var self = this;
		var id = this.props.params.articleId;
		//console.log(id);
		var ref = new Firebase('https://react-fireblog.firebaseio.com/articles/'+id);
		// use firebase data retrieving instead of ReactFire, because ReactFire cannot direct update ui state from database;
		var article;
		ref.on("value", function(snapshot){
			article = snapshot.val();
			//console.log(article.title);
			self.setState({
			title: article.title,
			coverImage: article.coverImage,
			summary: article.summary,
			body: article.body
			});
			
		});
					
	},
	removeArticle: function(){
		var id = this.props.params.articleId;
		var firebaseRef = new Firebase('https://react-fireblog.firebaseio.com/articles/');
		var redirectToHomePage = function(){
			if(error){
				console.log('remove failed')
			} else {
				window.location.href = '/';
			}
		};
		firebaseRef.child(id).remove(redirectToHomePage);
		this.setState({
			
				title:'',
				coverImage:'',
				summary:'',
				body:'',
				date:''
		
		});
	},
	updateArticle: function(){
		var date = new Date().valueOf();
		var id = this.props.params.articleId;
		var firebaseRef = new Firebase('https://react-fireblog.firebaseio.com/articles/');
		var redirectToHomePage = function(error){
			if(error){
				console.log('update failed')
			} else {
				window.location.href = '/';
			}
		};
		firebaseRef.child(id).update({
			title: this.state.title,
			coverImage: this.state.coverImage,
			summary: this.state.summary,
			body: this.state.body,
			date: date
		}, redirectToHomePage);

		this.setState({
			
				title:'',
				coverImage:'',
				summary:'',
				body:'',
				date:''
		
		});
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
		
	    //this.state.title=this.state.article.title
	    console.log(this.state);
	   
		return(
			<div>
				<form>
					<div>
						<input onChange={this.handleChangeTitle} value={this.state.title} placeholder='Title' />
					</div>
					<div>
						<input onChange={this.handleChangeCoverImage} value={this.state.coverImage} placeholder='Cover Image URL' />
					</div>
					<div>
						<textarea onChange={this.handleChangeSummary} value={this.state.summary} placeholder='Summary'/>
					</div>
					<div>
						<textarea onChange={this.handleChangeBody} value={this.state.body} placeholder='Body'/>
					</div>
					
					<button onClick={this.updateArticle}>Update</button><button onClick={this.removeArticle}>Delete</button>
				</form>
			</div>
			)
	}
})

export default Edit;