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
            return (url.indexOf('&')>0?(url+'&'+key):(url+'?'+key))
		}
	}
}