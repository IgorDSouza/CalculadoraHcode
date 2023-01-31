class CalcController{

    constructor(){
        this._lastOperator = '';

        this._audio = new Audio('click.mp3');

        this._audioOnOff = false;

        this._lastNumber = '';
        
        this._locale = 'pt-BR'
        
        this._displayCalcEl = document.querySelector("#display")

        this._dateEl = document.querySelector("#data")

        this._timeEl = document.querySelector("#hora")

        this._operation= [];

        this.initButtonsEvents();

        this._currentDate;

        this.initKeyboard()
        
        this.pastFromCliboard()

        this.initialize();
    }
    //ctrl+c
    copyToClipboard(){
        let input = document.createElement('input');

        input.value=this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("copy");

        input.remove();

    }
        //ctrl+v
    pastFromCliboard(){
        document.addEventListener('paste', e=>{

           let text = e.clipboardData.getData('Text'); // pega o valor que foi copiado e passa o tipo q foi copiado como parametro ( texto,imagem, binario etc)

           this.displayCalc= parseFloat(text);
        });
    }

    initialize(){
       this.setDateandTime();
        
        setInterval(()=>{
            this.setDateandTime(); 
        }, 1000)

        this.setLastNumberToDisplay();

        let mute = document.getElementById('mute');
        mute.addEventListener('click',e=>{
            this.toggleAudio();
        });
    } ;
    //habilitar ou remover audio
    toggleAudio(){
        // if(this._audioOnOff ==true){
        //     this._audioOnOff=false;
        // }else{
        //     this._audioOnOff==true;
        // } jeito mais simples por ele ser booleano, sempre receber o contrario dele ->

        this._audioOnOff = !this._audioOnOff;
    }
    //tocar audio
    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }
    //Manipulando a calculadora atraves so teclado
    initKeyboard(){
        document.addEventListener('keyup', e=>{
            this.playAudio();
            console.log("tecla clicada = "+e.key);

            let key = e.key
            switch(key){
                case 'Escape':
                    this.clearAll();
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    break;
    
                case '+': 
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperation(key);
                    break;
    
                case 'Enter':
                case '=':
                    this.calc();
                    break;

                case '.':
                case ',':
                    this.addDot('.');

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
                    this.addOperation(parseInt(key));
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
            }
            
        })
    }


    /** Adiciona o evento desejado a todos os elementos com a mesma classe*/
    addEventListenerAll(element,events,fn){
            
            events.split(' ').forEach(event=>{

                element.addEventListener(event,fn,false);
            });
        }

        /** Execução dos botões */
        execBtn(value){
            this.playAudio();
        
            switch(value){
                case 'ac':
                    this.clearAll();
                    break;
    
                case 'ce':
                    this.clearEntry();
                    break;
    
                case 'soma':
                    this.addOperation('+');
                    break;
    
                case 'subtracao':
                    this.addOperation('-');

                    break;
    
                case 'divisao':
                    this.addOperation('/');

                    break;
    
                case 'multiplicacao':
                    this.addOperation('*');

                    break;
    
                case 'porcento':
                    this.addOperation('%');

                    break;
    
                case 'igual':
                    this.calc();
                    break;

                case 'ponto':
                    this.addDot('.');

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

    /** Pega pelo DOM os botões da calculadora, pega apenas o que representa o botão (1,2,3,soma etc) para ser executado pela função execbtn.
     * Adiciona animação do mouse ao coloca-lo sobre as teclas
     */
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

    /** Pega a parte de data da calculadora e alimenta com DateString */
    setDateandTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{day:"2-digit", month:"long", year:"numeric"});
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    /** func que limpa a tela */
    clearAll(){
        this._operation=[];
        this._lastNumber='';
        this._lastOperator='';
        this.setLastNumberToDisplay();
    }
    /** func que limpa a ultima entrada */
    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();

    }
    /** Pega o ultimo elemento da array q manipula os numeros */
    getLastOperation(){
        return this._operation[this._operation.length-1];
    }
    /** Pega o ultimo elemento da array q manipula os numeros e sobrepõe o valor */
    setLastOperation(value){
        this._operation[this._operation.length-1] = value
    }
    /** Adiciona um item na array q manipula os numeros e deixa possivel calcular após 3 elementos digitados */
    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3){
             
            this.calc();
        }
    }
    /**Como a array fica em string, usamos o eval para transformar em inteiro e poder realizar a operação */
    getResult(){
        try{
            return eval(this._operation.join(""));

        }catch(e){
            setTimeout(()=>{
                this.setError();
            },1)
        }

    }
 /** faz os calculos e sobrepõe a array com o resultado para q apareça na tela */
    calc(){
        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){

            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3){

            last = this._operation.pop();

            this._lastNumber = this.getResult();
            
        }else if(this._operation.length == 3){
            this._lastNumber = this.getLastItem(false);
        }
       

        let result = this.getResult();

        if(last == '%'){

            result /= 100;

            this._operation = [result];

        }else{
             this._operation = [result]; 

             if (last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();

    }
/** verifica se o elemento é um operador ou não */
    isOperator(value){
    //    if (['+','-','*','%','/'].indexOf(value) >-1){
    //     return true
    //    }else{
    //     return false
    //    } mesmo valor do de baixo

    return ['+','-','*','%','/'].indexOf(value) >-1;

    }
    /**Trata o ultimo elemento */
    getLastItem(isOperator = true){
        let lastItem;

        for(let i = this._operation.length-1 ; i>=0; i--){

                if(this.isOperator(this._operation[i]) == isOperator){
                    lastItem = this._operation[i];
                    break;
                }
        }
        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }
/** mostra o ultimo numero no display */
    setLastNumberToDisplay(){
        let lastNumber = this.getLastItem(false);
        
        if(!lastNumber)lastNumber = 0;
        
        this.displayCalc = lastNumber;

    }
    /** adiciona uma operação */
    addOperation(value){
        if(isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                this.setLastOperation(value);
                
            }else{
                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }

        }else {
        
        if(this.isOperator(value)){
            this.pushOperation(value)
        } else{
           let newValue = this.getLastOperation().toString() + value.toString();
           this.setLastOperation(newValue);

           this.setLastNumberToDisplay();
        }
    }


    }

    addDot(){

       let lastOperation = this.getLastOperation();
       if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1)return;// essa operação é uma string? se sim, tem um '.' nela? se ja houver um ponto a func deve ser encerrada.

       if(this.isOperator(lastOperation) || !lastOperation){
        this.pushOperation('0.')
       }else{
        this.setLastOperation(lastOperation.toString()+'.')
       }

    this.setLastNumberToDisplay();

       

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
        if(value.length>10){
            this.setError()
            return false;
        }
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