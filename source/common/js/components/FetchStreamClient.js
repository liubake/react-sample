const imgArray=['../image/test.gif','../../common/image/test.gif']

let FetchStreamClient = {
    fetchedCall:null,
    tweetInterval : null,

    stopFetch:function(){
        this.tweetInterval&&clearInterval(this.tweetInterval);
    },

    startFetch:function(onFetched){
        let self=this;
        this.fetchedCall=onFetched;
        this.tweetInterval=setInterval(()=>{
            self.fetchedCall&&self.fetchedCall({
                id:(new Date().getTime()).toString(),
                text:'嘿嘿嘿...',
                media:[{url:imgArray[parseInt(Math.random()*10)%2]}]
            });
        }, 100);
    }
}

export default FetchStreamClient