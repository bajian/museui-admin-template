export default {
	methods: {
		goTo(to,replace=false){
			if (replace) {
				this.$router.replace(to)
			}else{
				this.$router.push(to)
			}
		},
		back(){
			if (window.hasLoadedCenter) 
				history.go(-1)
			else
				this.$router.replace('/')
		},
		getAccessToken(){
			return this.$store.state.user?this.$store.state.user.access_token:'0';
		},
		appendAccessToken(url){
		    let key=`access_token=${this.getAccessToken()}`
            if (url.indexOf('?')===url.length-1)//去掉?
                url.substr(0,url.length-1)
            return (url.indexOf('?')>0?(url+'&'+key):(url+'?'+key))
		},
		setArg(argKey,value){//对任意变量赋值，适用于类似开关之类的等等
		    this[argKey]=value
		}
	}
}