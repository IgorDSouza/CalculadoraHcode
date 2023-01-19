class CalcController{

    constructor(){
        
        this._locale = 'pt-BR'
        
        this._displayCalcEl = document.querySelector("#display")

        this._dateEl = document.querySelector("#data")

        this._timeEl = document.querySelector("#hora")

        this._currentDate;

        this.initialize();
    }
    initialize(){
       this.setDateandTime();
        
        setInterval(()=>{
            this.setDateandTime(); 
        }, 1000)
        
        

    }

    setDateandTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{day:"2-digit", month:"long", year:"numeric"});
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }
    
    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = valor;
    }

    get currentDate(){
         
        return new Date;
    }
    set currentDate(valor){
        this._currentDate = valor;
    }

}