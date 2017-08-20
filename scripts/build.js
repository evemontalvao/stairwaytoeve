var 
_ = require('lodash'),
path = require('path'),
fs = require('fs'),
handlebars = require('handlebars'),
post, posts, source, html, date, day, month, year, hour, min, template;

var Post = function(){
	this.$articles = process.cwd() + '/article/';
	this.$jsDir = process.cwd() + '/assets/js/';
	this.$dist = process.cwd() + '/public/article/';
	this.$templates = process.cwd() + '/templates/';
	this.$files = this.readDir(this.$articles);
	this.$file = this.mapFiles(this.$files);
	this.$content = this.readFile(this.$articles, this.$file);
	this.$stats = this.stats(this.$articles, this.$file);
	this.$date = this.getDate(this.$stats);
	this.$compiled = this.compile(this.$content);
	this.$formattedName = this.$date + '-' + this.$filename + '.html';
	this.writeFile(this.$dist, this.$compiled, this.$formattedName);
	
};

Post.prototype.readDir = function(dir){
	var files = fs.readdirSync(dir, function(err, files){
		if(err) throw err;
		return files;
	});
	return files;
};

Post.prototype.mapFiles = function(files){
	var file = files.map(function(file){
		return file;
	});
	return file;
};

Post.prototype.readFile = function(dir, file){
	var contentFile = fs.readFileSync(dir + file, 'utf-8', function(err, content){
		return content;
	});
	return contentFile;
};

Post.prototype.stats = function(dir, file){
	var stats = fs.statSync(dir + file, function(err, stat){
		if(err) throw err;
	});
	return stats;
};

Post.prototype.getDate = function(stats){
	date = stats.birthtime;
	year = date.getFullYear().toString();
	month = date.getMonth().toString();
	day = date.getDate().toString();
	hour = date.getHours().toString();
	min = date.getMinutes().toString();
	date = year + month + day + hour + min;

	return date;
};

Post.prototype.compile = function(content){
	this.setPostsList(this.$content);
	content = JSON.parse(content);
	this.$template = content.template;
	this.$filename = content.filename;

	source = fs.readFileSync(this.$templates + this.$template + '.html', 'utf-8');
	template = handlebars.compile(source);
	html = template(content);

	return html;
};

Post.prototype.writeFile = function(dist, content, name){
	fs.writeFile(dist + name, content, 'utf-8', function(err){
		if (err) throw err;
	});
	console.log('-----------------------');
	console.log(name);
};

Post.prototype.setPostsList = function(content){
	var postsList = this.readFile(this.$jsDir, 'postsList.json');
	postsList = JSON.parse(postsList);
	content = JSON.parse(content);
	
	var info = {
		title: content.title,
		background: content.background,
		color: content.color
	}

	postsList.push(info);
	postsList = JSON.stringify(postsList);

	this.writeFile(this.$jsDir, postsList, 'postsList.json');

};

var newPost = new Post();



