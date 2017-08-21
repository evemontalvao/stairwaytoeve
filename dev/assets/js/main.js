(function(){
	'use strict';
	var Stairwaytoeve = function(element){
		this.$element = $(element);
		this.$model = $('[data-post-model]');
		this.loadPosts(this.$model);
	};

	Stairwaytoeve.prototype.eventListeners = function(){

	};

	Stairwaytoeve.prototype.loadPosts = function(model){
		$.getJSON('public/assets/js/postsList.json', (function(data){
			this.formatPosts(data.list);
		}).bind(this));
	};

	Stairwaytoeve.prototype.formatPosts = function(data){
		var postArr = [],
		title, background, href;
		$.each(data, (function(index, post){
			this.$model = this.$model.clone();
			title = this.$model.find('[data-post-title]');
			background = this.$model.find('[data-post-background]');
			href = this.$model.find('[data-post-href]');

			title = title.text(post.title);
			background = background.css('background-image', 'url(' + post.background + ')');
			background = background.append(title);
			href = href.append(background);
			this.$model = this.$model.append(href);
			this.$element.append(this.$model)

			
		}).bind(this));

	};

	Stairwaytoeve.prototype.loading = function(state){

	};

	var init = new Stairwaytoeve('[data-posts]');

})();