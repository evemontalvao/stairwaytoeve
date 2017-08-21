var fs = require('fs');
var list = [];
var newPosts = {};

module.exports.setPosts = function(newPostsItem){
	var articles = fs.readdirSync(process.cwd() + '/public/articles');

	list.push(newPostsItem);

	newPosts = {"list": list}
	newPosts = JSON.stringify(newPosts);

	fs.writeFile(process.cwd() + '/dev/assets/js/postsList.json', newPosts, 'utf-8', function(err) {
		if (err) throw (err);
	});

};
