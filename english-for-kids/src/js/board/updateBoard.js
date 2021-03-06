import store from '../store/store';
import updateStartButton from '../modes/updateStartButton';
import createTable from '../statistics/createTable';
import resetTable from '../statistics/resetTable';
import sortListeners from '../statistics/sort/sortListeners';
import repeat from '../statistics/repeat';

function updateBoard(){
    const container = document.querySelector('.card__container');
    container.innerHTML = '';
    const curr = store.currentRoute;

    if (curr === 'Statistics') {
      createTable();
      resetTable();
      sortListeners();
      repeat();
    }
  
    const {content} = store.routes.find((item) => item.categoryName === curr);
  
    content.forEach((card)=>{
       if (store.mode === 'play' && store.currentRoute !== 'Main Page') {
        container.append(card.cardElementPlay);
      } else container.append(card.cardElement);
    })

    // checkbox Play/Train
    if (store.mode === 'play' && store.currentRoute !== 'Main Page' && store.currentRoute !== 'Statistics') {
      document.querySelector('.button_start').classList.add('button_start_active');
    } else document.querySelector('.button_start').classList.remove('button_start_active');
    if (store.mode === 'play' && store.currentRoute === 'Main Page') {
      document.querySelectorAll('.card').forEach((el) => el.classList.add('card-play'));
    } else if (store.mode === 'train' && store.currentRoute === 'Main Page') {
      document.querySelectorAll('.card').forEach((el) => el.classList.remove('card-play'));
    }

    updateStartButton();

    document.querySelectorAll('.card').forEach((item) => item.classList.remove('card-bordered-false', 'card-bordered-true'));
}

export default updateBoard;