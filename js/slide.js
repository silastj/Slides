export default class Slide {

    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper =  document.querySelector(wrapper);
        this.dist = { finalPosition: 0, startX: 0,movement:0 }
    }


    moveSlide(distX){
        this.dist.movePositon = distX;
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    onStart(event){
        let movetype;
        if(event.type === 'mousedown'){
            event.preventDefault();
            this.dist.startX = event.clientX;
            movetype = 'mousemove';
        }else{
            this.dist.startX = event.changedTouches[0].clientX;
            movetype = 'touchmove';
        }
        this.wrapper.addEventListener(movetype, this.onMove);

    }

    updatePosition(clienteX){
        this.dist.movement = (this.dist.startX - clienteX) * 1.6;
        return this.dist.finalPosition - this.dist.movement;
    }

    onMove(event){
        const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointerPosition);
        this.moveSlide(finalPosition);
    }

    onEnd(event){
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(movetype, this.onMove);
        this.dist.finalPosition = this.dist.movePositon;
    }

    addSlideEvents(){
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('touchstar', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchend', this.onEnd);
    }


    bindEvents(){
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }


    init(){
        this.bindEvents();
        this.addSlideEvents();
        return this;
    }



}