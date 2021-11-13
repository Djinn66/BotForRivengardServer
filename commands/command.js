module.exports = class Command {

    static parse(message, args){
        console.log("x fois")
        if (this.match(message)){
            this.action(message,args)
            return true
        }
        return false
    }

    static match(){
        return false
    }

    static action (message,args){
    }
}


