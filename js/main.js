const filterBox = document.querySelectorAll('.swiper-wrapper .swiper-slide');
const list = document.querySelector('.trend__list');
let swiper = swiperInit({
  slidesPerColumn: 2
});

function swiperInit(params) {
  return new Swiper('.gallery-thumbs', {
    spaceBetween: 30,
    slidesPerColumn: params.slidesPerColumn || 1,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerColumnFill: "row",
    updateOnWindowResize: true,
    watchSlidesVisibility: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Responsive breakpoints
    breakpoints: {
      780: {
        slidesPerView: 1
      },
      980: {
        slidesPerView: 3,

      },
      1440: {
        slidesPerView: 6
      }
    },
    on: {
      init: setBorder,
      resize: setBorder,
      slideChange: setBorder,
      transitionEnd: setBorder
    }

  });

};

window.addEventListener('resize', function(event){
  if(window.innerWidth>980) {
    setBorder();
  }
});

['click'].forEach(type => list.addEventListener(type, (event) => {
  if (event.target.tagName !== 'LI') {
    return false;
  }

  const points = document.querySelectorAll('.trend__box');
  for (let point of points) {
    point.classList.remove('trend__box--active');
  }
  event.target.classList.add('trend__box--active');

  let filterData = event.target.dataset.filter;

  let check = filterData;

  filterBox.forEach(elem => {

    if (elem.dataset.filter == check || filterData == "all") {
      elem.classList.remove('hide');

    } else {
      elem.classList.add('hide');
    }
  });

  swiper.destroy();

  if (check == "all") {
    swiper = swiperInit({
      slidesPerColumn: 2
    });
  } else {
    swiper = swiperInit({
      slidesPerColumn: 1
    });

  }

}));

function setBorder(swiper) {

console.log(window.innerWidth);

  if (window.innerWidth >=980) {

  var visibleElems = swiper.params.slidesPerView;
  var count = visibleElems;
  let desctopElem = count-1;

  if (swiper.passedParams.slidesPerColumn == 1) {
    
    console.log('сейчас видим только один ряд');

    let blocks = [...document.querySelectorAll(".swiper-slide.inner")];
    blocks.forEach((item, index) => {
      item.classList.remove('inner');
    });

    blocks = [...document.querySelectorAll(".swiper-slide.swiper-slide-visible:not(.hide)")];

    let elems = [...document.querySelectorAll('.swiper-slide:not(.hide)')];

    //даем стили для двух последних элементов
    if (elems.length>=desctopElem && blocks.length>=2) {
     blocks[blocks.length - 1].classList.add('inner');
     blocks[blocks.length - 2].classList.add('inner');
    }

    // когда 5 элементов (на декстопе) то убираем стили в 4 элемента
    if (blocks.length==count-1 && blocks.length>2) { 
      blocks[blocks.length - 2].classList.remove('inner');
    }
    
  } else {

    console.log('сейчас видим 2 ряда');

    let blocks = [...document.querySelectorAll(".swiper-slide.swiper-slide-visible:not(.hide)")];
    
    //разбиваем массив на два подмассива
    const chunk = (a, n) => [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));
    let arr = chunk(blocks, visibleElems);

    blocks.forEach((item, index) => {
      item.classList.remove('inner');
    });

    arr.forEach((item, index) => {

      if (item[item.length - 1] || item[item.length - 2] && arr[index].length>=2) {

        item[item.length - 1].classList.add('inner');
        item[item.length - 2].classList.add('inner');
      }

    });

    // если в первом ряде два элемента, а во втором - два
    //&& arr[index].length>=2
    if (arr[0].length !== arr[1].length && arr[1].length>=2) {
      let elemIndex = arr[1].length - 2;
      arr[1][elemIndex].classList.remove('inner');
    }

  }

  }


}


/*


window.addEventListener('resize', blockResize);

window.addEventListener('resize', function(){
  if (window.innerWidth <=980) {

  this.removeEventListener(setBorder);
   // setBorder=null;
  } else {
    setBorder();
  }
});

matchMedia('(max-width: 980px)').addListener('resize', e => {
if (e.matches) { setBorder(); }
});

window.addEventListener('resize', function(event){
  if(window.innerWidth>980) {
    setBorder();
  }
});*/