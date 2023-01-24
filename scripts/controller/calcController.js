class CalcController{

    constructor(){
        
        this._locale = 'pt-BR'
        
        this._displayCalcEl = document.querySelector("#display")

        this._dateEl = document.querySelector("#data")

        this._timeEl = document.querySelector("#hora")

        this._operation= [];

        this.initButtonsEvents();

        this._currentDate;

        this.initialize();
    }

    initialize(){
       this.setDateandTime();
        
        setInterval(()=>{
            this.setDateandTime(); 
        }, 1000)
    } 

    addEventListenerAll(element,events,fn){
            
            events.split(' ').forEach(event=>{

                element.addEventListener(event,fn,false);
            });
        }

        execBtn(value){
        
            switch(value){
                case 'ac':
                    this.clearAll();
                    break;
    
                case 'ce':
                    this.clearEntry();
                    break;
    
                case 'soma':
    
                    break;
    
                case 'subtracao':
                    break;
    
                case 'divisao':
                    break;
    
                case 'mutiplicacao':
                    break;
    
                case 'porcento':
                    break;
    
                case 'igual':
                    break;
                
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(value));
                    break;
    
                default:
                    this._setError()
                    break;
            }
        }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons>g , #parts> g ");

        buttons.forEach((btn,index)=>{
            this.addEventListenerAll/*Criado por nós*/(btn,"click drag ", e =>{
                var textBtn = btn.className.baseVal.replace("btn-",'');

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn,'mouseover mouseup mousedown', e=>{

                btn.style.cursor="pointer";
            })
        })      
    }

    setDateandTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{day:"2-digit", month:"long", year:"numeric"});
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    clearAll(){
        this._operation=[];
    }

    clearEntry(){
        this._operation.pop();
    }
    
    addOperation(value){
        this._operation.push(value);

        console.log(this._operation)

    }

    setError(){
        this.displayCalc = 'Error';
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
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
         
        return new Date;
    }
    set currentDate(value){
        this._currentDate = value;
    }

}