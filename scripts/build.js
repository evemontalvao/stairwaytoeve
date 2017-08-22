(function(){
	'use strict';
	var 
	fs = require('fs'),
	handlebars = require('handlebars'),
	posts = require('./servePosts'),
	articles = process.cwd() + '/articles/',
	dist = process.cwd() + '/public/articles/',
	templates = process.cwd() + '/dev/templates/',
	files = fs.readdirSync(articles),
	content, source, template, stats, html, birthtime, filename, list, postContent;


	var dateName = function(stats){
		console.log(stats.birthtime);	
		var year, month, day, hour, min, date, sec;
		date = stats.birthtime;
		year = date.getFullYear().toString();
		month = (1 + date.getMonth()).toString();
		day = date.getDate().toString();
		hour = date.getHours().toString();
		min = date.getMinutes().toString();
		sec = date.getSeconds().toString();
		date = year + month + day + hour + min + sec;
		return date;

	};

	files.map(function(file){
		fs.readFile(articles + file, 'utf-8', function(err, content){
			content = JSON.parse(content);
			source = fs.readFileSync(templates + content.template + '.html', 'utf-8');
			template = handlebars.compile(source);
			html = template(content);

			stats = fs.statSync(articles + file);
			birthtime = dateName(stats);
			filename = birthtime + '-' + content.filename;
			postContent = {
				title: content.title,
				background: content.background,
				date: birthtime,
				color: content.color,
				href: content.permalink
			};
			posts.setPosts(postContent);

			fs.writeFile(dist + filename + '.html', html, 'utf-8', function(err) {
				if (err) throw (err);
			});
			

		});

	});
})();





