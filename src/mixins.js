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
		}
	}
}