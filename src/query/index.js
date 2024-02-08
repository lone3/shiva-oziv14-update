class QueryManager {
    Tasks = [];

    async init(ms) {
        while(true) {
            if(this.Tasks.length <= 0) {
              await new Promise(resolve => setTimeout(resolve, ms));
              continue;
            }
            let task = this.Tasks.shift(); // Dizinin sıfırıncı elemanını al ve kaldır
            await task();
        }
    }

    query(handler) {
        this.Tasks.push(handler);
    }
}

module.exports = QueryManager;
