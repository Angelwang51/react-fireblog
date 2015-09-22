import React from 'react';
import {Link} from 'react-router';
import minigrid from 'minigrid';


var ArticleList = React.createClass({
	componentDidUpdate: function(){
		this.renderGrid()
	},
	componentDidMount: function(){
		this.renderGrid()
		window.addEventListener('resize', function(){
          minigrid('.grid', '.grid-item',6);
        });	
	},
	renderGrid: function(e){
		//console.log(e)
		minigrid('.grid', '.grid-item', 6);
	},
	render: function(){
		//console.log(this.props.articles);
		
        /*minigrid('.grid', '.grid-item');
   
        window.addEventListener('resize', function(){
          minigrid('.grid', '.grid-item',6);
        });*/
     	var self = this;
		var createArticle = function(article,index){
			//console.log(article);//log article find key
			/*var e = document.getElementById('title-item');
			if (article.coverImage == ''){
				e.style.background='#fff';
			}*/
			
			return (
				<div className='grid-item'>
					{/*Link is from react-router module*/}
					{/*.key is the key of article and special var should use ['']*/}
					<Link to='article' params={{articleId: article['.key']}}>
						<div id='item-container'>
					{/*Important: onload is an image event, will execute function renderGrid() after images finished loading*/}
							<img id='img-item' src={article.coverImage} onLoad={self.renderGrid}/>
							<div id='title-item'>{article.title}</div>
						</div>
					</Link>
				</div>
				);	
		};
		
		return  <div className='grid'>
					{this.props.articles.map(createArticle)}
				</div>;

		
        	
	}
});

export default ArticleList;