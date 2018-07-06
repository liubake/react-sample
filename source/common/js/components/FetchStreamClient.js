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
                media:[{url:'file:///C:/Users/Erola/Pictures/Saved%20Pictures/v2-c88a0a781bd26c09fa85d4eab8d5c586_b.gif'}]
            });
        }, 100);
    }
}

export default FetchStreamClient