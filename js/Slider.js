let imgSlider=[];
let radioHeroBtns=document.getElementsByName('h-ellipse');
let heroSection = document.querySelector('.hero-section');
let sliderWrapper = document.querySelector('.slider-wrapper');
let slides =  document.querySelectorAll('.slide');
const slidesCount = slides.length;
const slideWidth=1120;
let offsetSlider = slideWidth;
let currentSlide = Number(localStorage.getItem('currentSlide'));
console.log(currentSlide);
let currentRadioBtn = currentSlide;
const moveNextSlide = -1;
let direction=moveNextSlide;
let distance = 1;
const interval = 7000;
initSlider();
radioHeroBtns.forEach(element => element.addEventListener('change',radioButtonClick,true));
sliderWrapper.addEventListener('transitionend',()=>{
    
    if(direction === moveNextSlide){
            for(let i = 0; i < distance; i++){
                currentSlide++;
                sliderWrapper.append(sliderWrapper.firstElementChild);
            }
        
    }else{   
            for(let i = 0; i < distance; i++){
                currentSlide--;
                sliderWrapper.prepend(sliderWrapper.lastElementChild);
            }
       
    };

    sliderWrapper.style.transition = 'none';
    sliderWrapper.style.transform = 'translateX(0%)';
    setTimeout(()=>{
        distance = 1;
        sliderWrapper.style.transition = 'all ease .5s';
    });
    updateRadioBtn();
});
let time=setInterval(nextSlide,interval);
function initSlider()
{   
    for (let i=currentSlide;i<slidesCount;i++)
    {
        imgSlider[i-currentSlide]=slides[i];
        slides[i].remove();
        sliderWrapper.appendChild(imgSlider[i-currentSlide]);
    }
    for (let i=0; i<currentSlide;i++)
    {
        imgSlider[i+currentSlide]=slides[i];
        slides[i].remove();
        sliderWrapper.appendChild(imgSlider[i+currentSlide]);
    }
    radioHeroBtns[currentRadioBtn].checked=true;
}


function radioButtonClick()
{     
        let newRadioBtn = Number(this.value);
        let dist=newRadioBtn - currentRadioBtn;
        currentRadioBtn=newRadioBtn;
        localStorage.setItem('currentSlide',currentRadioBtn);
        distance=Math.abs(dist);
        offsetSlider=distance*offsetSlider;
        if(dist>= 1){
            nextSlide();
        }else {
            previousSlide();
           
        }
        offsetSlider =slideWidth; 
        clearInterval(time);
        time=setInterval(nextSlide,interval);
    }


function updateRadioBtn(){
    if(currentSlide > slidesCount - 1){
        currentSlide = 0;
    }else if(currentSlide < 0){
        currentSlide = slidesCount - 1;
    }
    currentRadioBtn=currentSlide;
    radioHeroBtns[currentRadioBtn].checked=true;
    localStorage.setItem('currentSlide',currentRadioBtn);
};

function nextSlide(){
    if(direction === -moveNextSlide){
        direction = moveNextSlide;
        sliderWrapper.prepend(sliderWrapper.lastElementChild);
    };
    
    heroSection.style.justifyContent = 'flex-start';
    sliderWrapper.style.transform = 'translateX('+(-offsetSlider)+'px)';
};

function previousSlide(){
    if(direction === moveNextSlide){
        direction = -moveNextSlide;
        sliderWrapper.append(sliderWrapper.firstElementChild);
    };
    heroSection.style.justifyContent = 'flex-end';
    sliderWrapper.style.transform = 'translateX('+offsetSlider+'px)';
};





