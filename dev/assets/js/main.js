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
			console.log(data.list);
			this.formatPosts(data.list);
			this.checkEmptySpaces(data.list);
		}).bind(this));
	};

	Stairwaytoeve.prototype.formatPosts = function(data){
		var title, background, href;
		$.each(data, (function(index, post){
			this.$model = this.$model.clone();
			title = this.$model.find('[data-post-title]');
			background = this.$model.find('[data-post-background]');
			href = this.$model.find('[data-post-href]');

			title = title.text(post.title);
			background = background.css('background-image', 'url(' + post.background + ')').addClass(post.color);
			background = background.append(title);
			href = href.append(background);
			this.$model = this.$model.append(href);
			this.$element.append(this.$model)

			
		}).bind(this));

	};

	Stairwaytoeve.prototype.checkEmptySpaces = function(data){
		var times = 0;
		if(data.length % 4 == 0){
			while(times < 2) {
				times = times + 1;
				console.log(times);
				this.fillEmptySpaces();
			}
		} else if(data.length % 5 == 0){
			this.fillEmptySpaces();
		}
	};

	Stairwaytoeve.prototype.fillEmptySpaces = function(){
		this.$model = this.$model.clone();
		this.$model = this.$model.empty().append('<div class="empty" data-post-empty></div>');
		this.$element.append(this.$model);
	};

	Stairwaytoeve.prototype.loading = function(state){

	};

	var init = new Stairwaytoeve('[data-posts]');

})();