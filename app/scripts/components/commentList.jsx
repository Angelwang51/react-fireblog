import React from 'react';

var CommentList = React.createClass({
	render: function(){
		
		
		var createComment = function(comment,index){
			console.log(comment);
			return(
				<div>	
				<div>{comment.comment}</div>
				</div>
				)
		}
		return <div>{this.props.comments.map(createComment)}</div>;
	}
})

export default CommentList;