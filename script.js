"use strict";
window.onload = function(){
    let btn = document.querySelector('button');
    btn.addEventListener('click', checkForm);
}
function checkForm (e) {
    e.preventDefault();
    let birthday = document.querySelector('[data-toggle="datepicker"]').value;
    let email = document.querySelector('[type="email"]');

    let textFields = document.querySelectorAll('[type="text"]');

    let text = [];
    textFields.forEach((item) => {
        let inp = new Verification(item);
        inp.isRequired();
        inp.checkValidity();
        inp.removeMessage();

        text.push(inp.value);
    });

    let checkPost = new Verification(email);
    checkPost.isRequired();
    checkPost.removeMessage();

    checkPost.checkEmail();
    //console.log(text, email);

}
class Verification {
    constructor(elem){
        this.elem= elem;
        this.required = elem.required;
        this.nextEl = this.elem.nextElementSibling;
        this.parentElem = this.elem.parentElement;
        this.valid = true;
        this.message = "This field is required";  
    }

    showError(){
        let mes = document.createElement('span');
        mes.textContent = this.message;
        mes.className = "message";

        if (this.valid) {
            this.elem.classList.remove('error');
            if(this.nextEl.classList.contains("message")) this.parentElem.removeChild(this.nextEl); 

        } else {
            if (!this.nextEl.classList.contains("message")) {
                this.parentElem.insertBefore(mes, this.elem.nextElementSibling);
            }
        } 
        console.log(this.valid);
        return this.valid =!this.valid;  
    }
    removeMessage(){
        this.elem.addEventListener('focus', (e) => {
            this.elem.classList.remove('error');
            this.nextEl = this.elem.nextElementSibling;

            if(this.nextEl.classList.contains("message")) this.parentElem.removeChild(this.nextEl); 
        });
         this.elem.addEventListener('change', () => this.elem.classList.remove('error'));

    }
    isRequired(){
        if (this.required) {
           if (this.elem.value.length != 0) {
                if (this.nextEl.classList.contains("message")) {
                    this.parentElem.removeChild(this.nextEl); 

                } 
           } else {
                this.valid = !this.valid;
                this.elem.classList.add('error');
                this.showError();
        console.log(this.valid);

           }
        }
        console.log(this.valid);

       return this.valid;

    }
    checkValidity() {
        this.nextEl = this.elem.nextElementSibling;

        this.message = 'This field can\'t contain character \' and \"';
        if(this.elem.value.includes("\"")||this.elem.value.includes("\'")){
            this.elem.classList.add('error');
            this.showError()
        };
    }
    checkEmail(){
       // this.removeMessage();
        this.nextEl = this.elem.nextElementSibling;

        this.message = "Invalid Email address";
        console.log(this.valid);
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
      //  console.log(reg.test(this.elem.value));
        if (!reg.test(this.elem.value)) {
            this.elem.classList.add('error');
            this.valid = !this.valid;
        console.log(this.valid);

            this.showError();
            //this.removeMessage();
        } else {
            this.elem.classList.add('error');
            this.removeMessage();

        }
    }

}
