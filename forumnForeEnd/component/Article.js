const Article = {
	template: '<p>Article page{{articles.title}}{{articles.content}}</p>',
	created:function(){
	    this.id = this.$route.query.id;
	    //this.name = this.$route.query.name;
    },
    data:function(){
		return { articles:'' }
	},
    methods: {
	  	getArticleById:function(id){
	  	//this.$http.get("/forumnbackend/index.php/Home/Article/getArticleById?id="+id).then(
	  	this.$http.get("/forumnbackend/index.php/Home/Article/getArticleById",{params: {id:1}}).then(
	        function (res) {
	            // 处理成功的结果
	            console.info(res.body[0]);
	            //this.articles = res.body;
	            this.articles = res.body[0];
	            console.info(this.articles);
	        },function (res) {
	        // 处理失败的结果
	        }
		);
	  }
	},
	mounted:function(){
		//console.info("id="+this.id);
		this.getArticleById(this.id)
	}
}