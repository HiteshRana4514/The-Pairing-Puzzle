const imagesWrap = document.querySelector('.images-wrap');
const score = document.querySelector('.score');
const totalAttempts = document.querySelector('.total-attempts');
const restartBtn = document.querySelector('.restart-btn');
window.addEventListener('load',createRandomElement)

function createRandomElement() {
    let length = 12;
    let storedArr = generateImage(length)  
      
    for (let i = 0; i < length; i++) {
        if (i < length / 2) {
            
            let html = `<div class="image-block" dataset="${storedArr[i]}">
                <img src="./assets/images/image-${storedArr[i]}.jpg" alt="image${storedArr[i]}">
                <div class="overlay"></div>
            </div>`
            imagesWrap.innerHTML += html
            if(i===(length/2)-1){
                storedArr = generateImage(length)
            }
        }
        else {
            let html = `<div class="image-block" dataset="${storedArr[(length-i)-1]}">
                <img src="./assets/images/image-${storedArr[(length-i)-1]}.jpg" alt="image${storedArr[(length-i)-1]}">
                <div class="overlay"></div>
            </div>`
            imagesWrap.innerHTML += html
        }
    }
    initilaizeClick(imagesWrap)
}

function generateArray(length){
    let storedArr = [];
    for(let i=1;i<=length/2;i++){
        storedArr.push(i);
    }
    
    return storedArr
}

function generateImage(length) {
    let storedArr = generateArray(length)
    for(let i=0;i<storedArr.length;i++){
        let randomNum = Math.floor(Math.random() * length / 2);
        [storedArr[i],storedArr[randomNum]] = [storedArr[randomNum], storedArr[i]]
    }
    
    return storedArr
}


function initilaizeClick(imagesWrap){
    let imageBlock = imagesWrap.querySelectorAll('.image-block');
    
    let checkValue = 0;
    let count = 0;
    let clickCount = 0;
    imageBlock.forEach((item)=>{
        item.onclick = ()=>{  
            clickCount++;          
            item.classList.add('active');
            item.style.pointerEvents= 'none'
            let dataSet = Number(item.getAttribute('dataset'));
            if(clickCount % 2 === 0){
                if(checkValue === dataSet){
                    count++;
                    score.innerText = count
                    checkValue = 0;
                }
                else{
                    const filteredElement = Array.from(imageBlock).filter((ele)=>{
                        return ele.getAttribute('dataset')==dataSet || ele.getAttribute('dataset')==checkValue;
                    })
                    setTimeout(()=>{
                        filteredElement.forEach((item)=>{
                            item.classList.remove('active');
                            item.style.pointerEvents= 'auto';
                        })
                        checkValue = 0;
                    },500)
                }
            }
            else{
                checkValue = dataSet;
            }
            if(count === imageBlock.length/2){
                totalAttempts.innerText = `You have taken total ${clickCount/2} attempts to complete this game`
            }
        }
    })
    
}

restartBtn.onclick = ()=>{
    let imageBlock = imagesWrap.querySelectorAll('.image-block');
    imageBlock.forEach((item)=>{
        item.remove();
    })
    score.innerText = 0;
    totalAttempts.innerText = ''
    createRandomElement();
}





