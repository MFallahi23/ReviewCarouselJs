// Third project of Mouhcine's Fallahi Js Portfolio
// Review Carousel
//------------------------------------------------------------------//

//----------------------//
// Data                 //
//--------------------- //
const DATA = [
  {
    id: 0,
    rate: 4,
    review:
      "The staff was great. The receptionists were very helpful and answered all our questions. The room was clean and bright, and the room service was always on time. Will be coming back! Thank you so much",
    user: "John",
    date: "October 10 2023",
  },
  {
    id: 1,
    rate: 3,
    review:
      "My husband and I went for dinner in restaurant X and really enjoyed the atmosphere. The food was fresh and delicious, and the best part was that the chef sent us a dessert they had created that day. We were delighted",
    user: "Max",
    date: "September 29 2023",
  },
  {
    id: 2,
    rate: 5,
    review:
      "I got a pair of boots from store X and I’m very satisfied. They are high-quality and worth the money. The store also offered free shipping at that price so that’s a plus!",
    user: "Elon",
    date: "August 15 2023",
  },
  {
    id: 3,
    rate: 4,
    review:
      "The tool X has really automated some of our company’s processes. We now spend less time doing manual work. It’s making [problem] very easy for us. Thanks to its scheduling feature, we don’t need staff to work outside of business hours",
    user: "Albert",
    date: "November 1 2023",
  },
];
//----------------------//
// Dom Elements         //
//--------------------- //
const slidesContainer = document.querySelector(".review--carousel");
const prevButton = document.querySelector(".left-arrow");
const nextButton = document.querySelector(".right-arrow");
const dotContainer = document.querySelector(".review--carousel--dots");

//----------------------//
// Functions            //
//--------------------- //

//------------------------------------------------//
// Generate UI
//------------------------------------------------//

const generateSlideText = (id, rate, review, user, date) => {
  const slideProto = `
  <!-- Contains inline style -->
  <div class="carousel__stars flex" id="${id}" style="--gap: 0.2rem">
    <div class="carousel__stars__item star ${
      rate - 1 >= 0 ? "checked" : ""
    }"></div>
    <div class="carousel__stars__item star ${
      rate - 2 >= 0 ? "checked" : ""
    }"></div>
    <div class="carousel__stars__item star ${
      rate - 3 >= 0 ? "checked" : ""
    }"></div>
    <div class="carousel__stars__item star ${
      rate - 4 >= 0 ? "checked" : ""
    }"></div>
    <div class="carousel__stars__item star ${
      rate - 5 >= 0 ? "checked" : ""
    }"></div>
  </div>
  <p class="carousel--text-review">
    "${review}"
  </p>
  <h3 class="carousel-author">${user}</h3>
  <p class="carousel--date">${date}</p>`;
  return slideProto;
};
//------------------------------------------------//
// Replace params by the values in the DATA array
//------------------------------------------------//
const textForSlides = (index) => {
  return generateSlideText(...Object.values(DATA[index]));
};
//------------------------------------------------//
// Generating slides and appending to slidesContainer, as well as dots and appending them to dotContainer
//------------------------------------------------//
const generateSlides = () => {
  for (let i = 0; i < DATA.length; i++) {
    // Slide
    const dot = document.createElement("a");
    dot.classList.add("dot");

    dotContainer.appendChild(dot);
    const slide = document.createElement("div");
    slide.classList.add("review--carousel--slide");
    slide.classList.add("flex");
    slide.innerHTML = textForSlides(i);
    slidesContainer.appendChild(slide);
  }
};
// Calling the function
generateSlides();

//------------------------------------------------//
// Make the UI functional
//------------------------------------------------//
//------------------------------------------------//
// Now let select the generated slides and dots
// DOM 2
//------------------------------------------------//
const slides = document.querySelectorAll(".review--carousel--slide");
const dots = document.querySelectorAll(".dot");

//------------------------------------------------//
// Note:
// Same as .offsetWith :
// slidesContainer.getBoundingClientRect().width
//------------------------------------------------//

//------------------------------------------------//
// Updating the slide Width
//------------------------------------------------//

let slideWidth;
const updateSlideWidth = () => {
  slideWidth = slides[0].offsetWidth;
  console.log(slideWidth);
};
// Initial set
updateSlideWidth();
//------------------------------------------------//
// Updating when resizing the window
//------------------------------------------------//
window.addEventListener("resize", () => {
  updateSlideWidth();
});
let activeSlide = 0;
const maxSlides = slides.length - 1;

//------------------------------------------------//
// update Dots functions
//------------------------------------------------//
const updateDots = () => {
  dots.forEach((dot, index) => {
    if (index === activeSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};
// Initial set
updateDots();
//------------------------------------------------//
// Go to slide function
//------------------------------------------------//
const goToSlide = (slideIndex) => {
  if (slideIndex < 0) {
    return;
  }

  let newScroll = slideIndex * slideWidth;
  window.addEventListener("resize", () => {
    updateSlideWidth();
    newScroll = slideIndex * slideWidth;
  });
  slidesContainer.scrollTo({ left: newScroll, behavior: "smooth" });
  activeSlide = slideIndex;
  updateDots();
};

//------------------------------------------------//
// Setting up the infinite Loop
//------------------------------------------------//
const infiniteLoop = () => {
  let theLoop;
  const loopingThroughSlides = () => {
    let nextSlide = activeSlide + 1;
    if (nextSlide > maxSlides) {
      nextSlide = 0;
    }
    goToSlide(nextSlide);
  };

  return {
    start() {
      this.stop();
      // to clear any previous setinterval
      theLoop = setInterval(loopingThroughSlides, 5000);
    },
    stop() {
      clearInterval(theLoop);
    },
  };
};
const Loop = infiniteLoop();
// Starting the loop
Loop.start();

//------------------------------------------------//
// Setting the functionality by clicking into one of the dots
//------------------------------------------------//
dots.forEach((dot) => {
  dot.addEventListener("click", (event) => {
    if (event.target.classList.contains("dot")) {
      const dotIndex = Array.from(dots).indexOf(event.target);
      goToSlide(dotIndex);
      Loop.stop();
      // A setTimout to let the user read the content at least 10s
      setTimeout(() => Loop.start(), 10000);
    }
  });
});
//------------------------------------------------//
// That's all !
//------------------------------------------------//
