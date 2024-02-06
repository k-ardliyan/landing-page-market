const handleCarouselNavigation = (
    carousel,
    prevButton,
    nextButton,
    countPerSlide = 1
) => {
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const countCarouselItems = carouselItems.length;
    const countIndicators = countCarouselItems - countPerSlide;

    if (carouselItems[0].classList.contains('active')) {
        prevButton.classList.add('disabled');
        prevButton.setAttribute('disabled', 'true');
    }

    if (carouselItems[countCarouselItems - 1].classList.contains('active')) {
        nextButton.classList.add('disabled');
        nextButton.setAttribute('disabled', 'true');
    }

    carousel.addEventListener('slid.bs.carousel', (e) => {
        const activeItem = e.relatedTarget;

        if (activeItem.previousElementSibling) {
            prevButton.classList.remove('disabled');
            prevButton.removeAttribute('disabled');
        } else {
            prevButton.classList.add('disabled');
            prevButton.setAttribute('disabled', 'true');
        }

        if (countPerSlide !== 1) {
            if (activeItem === carouselItems[countIndicators]) {
                nextButton.classList.add('disabled');
                nextButton.setAttribute('disabled', 'true');
            } else {
                nextButton.classList.remove('disabled');
                nextButton.removeAttribute('disabled');
            }
        } else {
            if (activeItem.nextElementSibling) {
                nextButton.classList.remove('disabled');
                nextButton.removeAttribute('disabled');
            } else {
                nextButton.classList.add('disabled');
                nextButton.setAttribute('disabled', 'true');
            }
        }
    });
};

const cloneCarouselItems = (carouselItems, minPerSlide) => {
    carouselItems.forEach((el) => {
        let next = el.nextElementSibling;

        for (let i = 1; i < minPerSlide; i++) {
            if (!next) {
                next = carouselItems[0];
            }

            const cloneChild = next.cloneNode(true);
            el.appendChild(cloneChild.children[0]);

            next = next.nextElementSibling;
        }
    });
};

const DOMSectionBenefits = () => {
    const sectionBenefits = document.querySelector('section#benefits');
    const carouselBenefits = sectionBenefits.querySelector('.carousel');
    const prevButtonBenefits = sectionBenefits.querySelector(
        '.carousel-control-prev'
    );
    const nextButtonBenefits = sectionBenefits.querySelector(
        '.carousel-control-next'
    );
    handleCarouselNavigation(
        carouselBenefits,
        prevButtonBenefits,
        nextButtonBenefits
    );
};

const DOMSectionFeedbacks = () => {
    const sectionFeedback = document.querySelector('section#feedback');
    const carouselFeedback = sectionFeedback.querySelector('.carousel');
    const prevButtonFeedback = sectionFeedback.querySelector(
        '.carousel-control-prev'
    );
    const nextButtonFeedback = sectionFeedback.querySelector(
        '.carousel-control-next'
    );
    const carouselFeedbackItems =
        sectionFeedback.querySelectorAll('.carousel-item');

    let minPerSlide = 3;

    if (window.innerWidth < 768) {
        minPerSlide = 1;
    } else if (window.innerWidth < 992) {
        minPerSlide = 2;
    } else {
        minPerSlide = 3;
    }

    handleCarouselNavigation(
        carouselFeedback,
        prevButtonFeedback,
        nextButtonFeedback,
        minPerSlide
    );
    cloneCarouselItems(carouselFeedbackItems, minPerSlide);

    const carouselIndicators = carouselFeedback.querySelector(
        '.carousel-indicators'
    );

    for (let i = 0; i < carouselFeedbackItems.length - minPerSlide + 1; i++) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-target', '#carouselFeedbacks');
        button.setAttribute('data-bs-slide-to', i);
        if (i === 0) {
            button.classList.add('active');
            button.setAttribute('aria-current', 'true');
        }
        button.setAttribute('aria-label', `Slide ${i + 1}`);
        carouselIndicators.appendChild(button);

        const carouselItems =
            carouselFeedbackItems[i].querySelectorAll('.col-md-6');
        carouselItems.forEach((el) => {
            el.classList.add(`col-lg-${12 / minPerSlide}`);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    DOMSectionBenefits();
    DOMSectionFeedbacks();
});
