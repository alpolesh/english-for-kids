import store from '../store/store';
import updateBoard from '../board/updateBoard';
import updateMenu from '../menu/updateMenu';
import countQuantity from '../statistics/countQuantity';

class Card {
    constructor({word, translation, image, audioSrc}, categoryName) {
        // Card in train mode
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'text-white', 'bg-info');
        this.cardElement = cardElement;

        // Card in play mode
        const cardElementPlay = document.createElement('div');
        cardElementPlay.classList.add('card', 'text-white', 'bg-info', 'card-play');
        cardElementPlay.setAttribute('audioSrc', `${audioSrc}`);
        cardElementPlay.setAttribute('word', `${word}`);
        this.cardElementPlay = cardElementPlay;

        this.isFlipped = false;

        this.initialPosition =  
        `<img src="${image}" class="card-img-top rounded-circle card-front" alt="${categoryName}">
        <div class="card-body">
          <p class="card-text text-front">${categoryName || word}</p>
        </div>
        ${categoryName ? '' : '<img src="./img/rotate.svg" class="rotate" alt="rotate"></img>'}
        `

        this.flipped = {
          image: `<img src="${image}" class="card-img-top rounded-circle card-back" alt="${categoryName}">`,
          text: `<p class="card-text text-back">${translation}</p>`
        }
        
        this.modePlay =  
        `<img src="${image}" class="card-img-top rounded-circle card-img-play" alt="${categoryName}">`

        this.makeFlip = () => {
          if (!this.isFlipped) {
            this.cardElement.insertAdjacentHTML('afterbegin', this.flipped.image);
            this.cardElement.querySelector('.card-body').insertAdjacentHTML('afterbegin', this.flipped.text);
          } else {
            this.cardElement.innerHTML = this.initialPosition;
          }
          // this.isFlipped = !this.isFlipped;
        }

        
        this.cardElementPlay.innerHTML = this.modePlay;
        this.cardElement.innerHTML = this.initialPosition;
        this.makeFlip();
        
        this.cardElement.addEventListener("click", (e) => {
          if (store.currentRoute === 'Main Page') {
            store.currentRoute = categoryName;
            updateMenu(Array.from(document.querySelectorAll('.navigation__link')).find((item) => item.innerText === store.currentRoute));
            updateBoard();
          } else if (store.mode === 'train') {
            // Quantity of clicks on cards in train mode
            countQuantity(e.target.closest('.card').querySelector('.card-body').lastElementChild.innerText);
            
            const audio = new Audio();
            audio.src = audioSrc;
            audio.play();
          } else if (store.mode === 'play' && store.currentRoute === 'Statistics') {
            const audio = new Audio();
            audio.src = audioSrc;
            audio.play();
          }
          if (e.target.classList.contains('rotate')) {
            this.cardElement.classList.add('flip');
            this.cardElement.classList.remove('flip-two');
            this.cardElement.addEventListener('mouseleave', () => {
              this.cardElement.classList.add('flip-two');
              this.cardElement.classList.remove('flip');
            })
            
          }
        });
    }
}

export default Card;

