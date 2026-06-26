// header/footer
function slideDown(element) {
    element.style.display = 'block';
}

function slideUp(element) {
    element.style.display = 'none';
}

function initHeader() {
    document.querySelectorAll('.gnb > li').forEach((item) => {
        const submenu = item.querySelector('.snb');

        item.addEventListener('mouseenter', () => {
            document.querySelectorAll('.snb').forEach(slideUp);
            if (submenu) slideDown(submenu);
        });

        item.addEventListener('mouseleave', () => {
            document.querySelectorAll('.snb').forEach(slideUp);
        });
    });

    const dim = document.querySelector('.dim');
    const sideMenu = document.querySelector('.hamSideMenu');
    const ham = document.querySelector('.ham');
    const close = document.querySelector('.close');

    const openMenu = () => {
        dim.classList.add('on');
        sideMenu.classList.add('on');
    };

    const closeMenu = () => {
        dim.classList.remove('on');
        sideMenu.classList.remove('on');
    };

    ham.addEventListener('click', openMenu);
    dim.addEventListener('click', closeMenu);
    close.addEventListener('click', closeMenu);

    document.querySelectorAll('.hamGnb > li > a').forEach((link) => {
        link.addEventListener('click', (e) => {
            const submenu = link.parentElement.querySelector('.hamSnb');

            if (!submenu) return;

            e.preventDefault();
            document.querySelectorAll('.hamSnb').forEach((item) => {
                if (item !== submenu) slideUp(item);
            });
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        });
    });
}

initHeader();

// FAQ accordion
document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const currentItem = question.closest('.faq-item');

        document.querySelectorAll('.faq-item').forEach((item) => {
            if (item !== currentItem) {
                item.classList.remove('active');
            }
        });

        currentItem.classList.toggle('active');
    });
});
