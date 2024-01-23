document.addEventListener('DOMContentLoaded', function () {
    const carouselBenefits = document.querySelector('#carouselBenefits');
    const carouselItems = carouselBenefits.querySelectorAll('.carousel-item');
    const prevButton = carouselBenefits.querySelector('.carousel-control-prev');
    const nextButton = carouselBenefits.querySelector('.carousel-control-next');

    if (carouselItems[0].classList.contains('active')) {
        prevButton.classList.add('disabled');
        prevButton.setAttribute('disabled', 'true');
    } else if (
        carouselItems[carouselItems.length - 1].classList.contains('active')
    ) {
        nextButton.classList.add('disabled');
        nextButton.setAttribute('disabled', 'true');
    }

    carouselBenefits.addEventListener('slid.bs.carousel', function (e) {
        if (e.relatedTarget.classList.contains('active')) {
            if (e.relatedTarget.previousElementSibling) {
                prevButton.classList.remove('disabled');
                prevButton.removeAttribute('disabled');
            } else {
                prevButton.classList.add('disabled');
                prevButton.setAttribute('disabled', 'true');
            }

            if (e.relatedTarget.nextElementSibling) {
                nextButton.classList.remove('disabled');
                nextButton.removeAttribute('disabled');
            } else {
                nextButton.classList.add('disabled');
                nextButton.setAttribute('disabled', 'true');
            }
        }
    });
});
