const Home = {//应该像微信小程序一样把什么都放到pages组件里,上拉加载也是
	template: `
		<scroller :on-refresh="refresh"
	            :on-infinite="infinite"
	            ref="myscroller"
	            style="padding-top: 45px;z-index:1;">
			<ul>
				<slot></slot>
				<li v-for="(article,index) in  articles">
					<router-link :to="{path:'/Article',query: {id: article.id}}">{{ article.title }}</router-link>
				</li>
			</ul>
		</scroller>
	`,
	data:function(){
		return { 
			articles:[],
			currentPage:1,
			pageSize:10,
			current3Page:[],
			totalPages:null,
			totalResults:null,
		}
	},
	methods: {
	  	getArticle:function(){
		  	this.$http.get("/forumnbackend/index.php/Home/Article/getPageArticle",{params: {currentPage:this.currentPage,pageSize:this.pageSize}}).then(
		        function (res) {
		            // 处理成功的结果
		            this.articles = res.body['list'];
		            this.totalResults = res.body['totalResults'];
		            this.totalPages = Math.ceil(this.totalResults/this.pageSize)
		            //this.returntotalPages()//获取页数最好在异地操作成功之后,而不是mounted里.不然获取不到.
		            //this.returnCurrent3Page()
		        },function (res) {
		        // 处理失败的结果
		        }
			);
	  	},
	  	getArticleByPullUp:function(){
	  		//判断是不是超出页数了
	  		if(this.currentPage<this.totalPages){
	  			this.currentPage = this.currentPage+1
	  		}else{
	  			return 2;
	  		}
		  	this.$http.get("/forumnbackend/index.php/Home/Article/getPageArticle",
		  		{params: {currentPage:this.currentPage,pageSize:this.pageSize}}).then(
		        function (res) {
		            // 处理成功的结果
		            this.articles.push.apply(this.articles,res.body['list']);
		            console.log(res)
		        },function (res) {
		        // 处理失败的结果
		        }
			);
	  	},
	  	//刷新
	    refresh: function (done) {
	      //console.info(done)
	      
	      var self = this
	      setTimeout(function () {
	        // console.info("刷新")
	        done();//这里的done执行传入的函数.
	        self.$router.go(0)
	      }, 1500)
	    },
	    //无限拉
	    infinite: function (done) {
	      //console.info(done)
	      var self = this
	      setTimeout(function () {
	        done(self.getArticleByPullUp());
	      }, 1500)
	    }
	},
	mounted:function(){
		this.getArticle()
	}
}