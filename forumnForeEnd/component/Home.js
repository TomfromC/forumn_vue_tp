const Home = {
	//template: '<p>home page{{homedata}}</p>',
	template: `
		<ul>
			<li v-for="(article,index) in  articles">
				<router-link :to="{path:'/Article',query: {id: article.id}}">{{ article.title }}</router-link>
			</li>
			<!-- 表格 -->
			<!--
             <div class="aso-pg-rank__pagination" id="aso-pg-rank__pagination" v-cloak>  
                 <div>共{{currentPage}}/{{totalPages}}页</div>  
                 <ul class="aso-pagination">  
                     <li class="pagination-first  ">  
                         <a v-if="currentPage == 1" >第一页</a>  
                         <a v-else href="javascript:;" @click="jumpPage(1)">第一页</a>  
                     </li>  
                     <li class="pagination-prev" v-if="currentPage>1"><a href="javascript:;" @click="jumpPage(currentPage-1)">上一页</a></li>  
                     <li v-for="item in pagingList" class="pagination-page">  
                         <a v-if="currentPage==item.key || sign ==item.key" class="activeye">{{item.key}}</a>  
                         <a v-else href="javascript:;" @click="jumpPage(item.value)">{{item.key}}</a>  
                     </li>  
  
                     <li class="pagination-next" v-if="currentPage<totalPages"><a href="javascript:;" @click="jumpPage(currentPage+1)">下一页</a></li>  
                     <li class="pagination-last">  
                         <a v-if="totalPages == currentPage">尾页</a>  
                         <a v-else href="javascript:;" @click="jumpPage(totalPages)">尾页</a>  
                     </li>  
                 </ul>  
             </div>
             -->
            
             <select v-model.number="currentPage">
             	<option v-for="n in totalPages">
             		{{n}}
             	</option>
             </select>
             <span style="margin-left:5px"><a href="javascript:;" @click="jumpPage(currentPage-1)">上页</a></span>
             <span v-if="currentPage>1">...</span>
             <span v-for="n in current3Page" style="margin-left:5px">
             	<a href="javascript:;" @click="jumpPage(n)">{{n}}</a>
             </span>
             <span v-if="currentPage!=totalPages">...</span>
             <span style="margin-left:5px"><a href="javascript:;" @click="jumpPage(currentPage+1)">下页</a></span>
		</ul>
	`,
	data:function(){
		return { 
			articles:[],
			currentPage:1,
			pageSize:2,
			totalPages:null,
			current3Page:[],
			totalResults:null,
		}
	},
	methods: {
	  	getArticle:function(){
	  	//this.$http.get("/forumnbackend/index.php/Home/Article/getAllArticle").then(
	  	this.$http.get("/forumnbackend/index.php/Home/Article/getPageArticle",{params: {currentPage:this.currentPage,pageSize:this.pageSize}}).then(
	        function (res) {
	            // 处理成功的结果
	            //console.info(res);
	            //console.info(res.body['list']);
	            // this.articles = res.body;
	            this.articles = res.body['list'];
	            this.totalResults = res.body['totalResults'];
	            this.returntotalPages()//获取页数最好在异地操作成功之后,而不是mounted里.不然获取不到.
	            this.returnCurrent3Page()
	        },function (res) {
	        // 处理失败的结果
	        }
		);
	  },
	  jumpPage:function(num){
	  	if(num <= 1){
	  		this.currentPage = 1 //在加之前应该要看看是不是还有.判断总页数?
	  	}else if(num >= this.totalPages){
	  		this.currentPage = this.totalPages
	  	}else{
	  		this.currentPage = num
	  	}
	  	this.returnCurrent3Page()//获取当然3个页码
	  	this.getArticle()//重新获取一次数据
	  },
	  returnCurrent3Page:function(){//这里不应该是push而是更新,在之前清空也行吧.
	  	this.current3Page = []
	  	
	  	if(this.currentPage>1 && this.currentPage<this.totalPages){
		  	this.current3Page.push(this.currentPage-1)
		  	this.current3Page.push(this.currentPage)
		  	this.current3Page.push(this.currentPage+1)
	  	}else if(this.currentPage <= 1){//单独判断小于等于1,下面的else只有大于totalPages的情况了
	  		this.current3Page.push(1)
		  	this.current3Page.push(2)
		  	this.current3Page.push(3)
	  	}else {
	  		this.current3Page.push(this.currentPage-2)
		  	this.current3Page.push(this.currentPage-1)
		  	this.current3Page.push(this.currentPage)
	  	}
	  },
	  returntotalPages:function(){
	  	//计算页数,然后给data.template根据data循环出123
	  	this.totalPages = Math.ceil(this.totalResults/this.pageSize)
	  }
	},
	watch:{
		currentPage(){
			this.jumpPage(this.currentPage)
		}
	},
	mounted:function(){
		this.getArticle()
	}
}