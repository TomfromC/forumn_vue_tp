const Login = {//登录
	template: `
		<div>
			<img src="./img/Zoom_in.png" v-if="isLogin">
			<a v-else href="javascript:;" v-b-modal.modal-center>请登录</a>
			<!-- Modal Component -->
		      <b-modal id="modal-center" hide-footer centered title="登录">
		        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
			      
			      <b-form-group id="exampleInputGroup1"
			                    label="帐号:"
			                    label-for="name">

			        <b-form-input id="name"
			                      type="text"
			                      v-model="form.name"
			                      required
			                      placeholder="Enter name">
			        </b-form-input>

			      </b-form-group>
			     
			      <b-form-group id="exampleInputGroup2"
			                    label="密码:"
			                    label-for="password">

			        <b-form-input id="password"
			                      type="password"
			                      v-model="form.password"
			                      required
			                      placeholder="Enter password">
			        </b-form-input>

			      </b-form-group>

			      <b-button type="submit" variant="primary">Submit</b-button>
			      <b-button type="reset" variant="danger">Reset</b-button>
			    </b-form>
		      </b-modal>
		</div>
	`,
	data:function(){
		return {
			isLogin:false,
			form: {
				name: '',
				password: '',
			},
			show: true,
			formData:''
		}
	},
	methods: {
	  	logIn:function(formData){
		  	this.$http.post("/forumnbackend/index.php/Home/Login/logIn",{name:this.form.name,password:hex_md5(this.form.password)},{emulateJSON:true}).then(
		        function (res) {
		            // 处理成功的结果
		            console.log(res.body)
		            this.articles = res.body;
		        },function (res) {
		        // 处理失败的结果
		        }
			);
	  	},
	  	showForm:function(){
	  		
	  	},
	  	onSubmit (evt) {
	      evt.preventDefault();
	      alert(JSON.stringify(this.form));
	      //this.formData = JSON.stringify(this.form);
	      this.logIn(this.formData);
	    },
	    onReset (evt) {
	      evt.preventDefault();
	      /* Reset our form values */
	      this.form.password = '';
	      this.form.name = '';
	      
	      /* Trick to reset/clear native browser form validation state */
	      this.show = false;
	      this.$nextTick(() => { this.show = true });
	    }
	},
	mounted:function(){
		
	}
}