!function(){"use strict";var t=function(t){this.$element=$(t),this.$model=$("[data-post-model]"),this.loadPosts(this.$model)};t.prototype.eventListeners=function(){},t.prototype.loadPosts=function(t){$.getJSON("public/assets/js/postsList.json",function(t){this.formatPosts(t.list)}.bind(this))},t.prototype.formatPosts=function(t){var o,s,e;$.each(t,function(t,i){this.$model=this.$model.clone(),o=this.$model.find("[data-post-title]"),s=this.$model.find("[data-post-background]"),e=this.$model.find("[data-post-href]"),o=o.text(i.title),s=s.css("background-image","url("+i.background+")"),s=s.append(o),e=e.append(s),this.$model=this.$model.append(e),this.$element.append(this.$model)}.bind(this))},t.prototype.loading=function(t){};new t("[data-posts]")}();