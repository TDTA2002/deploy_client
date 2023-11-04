import { useEffect } from 'react'
import './home.scss'
import About from './About'
import Top from './Top'
import Faq from './Faq'
import ScrollReveal from 'scrollreveal';
import sony from '@/images/sony.png'
import controller from '@/images/controller.png'

export default function HomeContent() {
    useEffect(() => {
        // ========== SCROLL TOP ========= //
        const scrollTop = ScrollReveal({
            origin: 'top',
            distance: '50px',
            duration: 2000,
        });

        scrollTop.reveal('.delaySmall', { delay: 300 });
        scrollTop.reveal('.delayMedium', { delay: 500 });
        scrollTop.reveal('.delayLarge', { delay: 700 });
        scrollTop.reveal('.delayLargeTopExtra', { delay: 900 });

        // ========== SCROLL BOTTOM ========= //
        const scrollBottom = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 2200,
        });

        scrollBottom.reveal('.delaySmallBottom', { delay: 300 });
        scrollBottom.reveal('.delayMediumBottom', { delay: 500 });
        scrollBottom.reveal('.delayLargeBottom', { delay: 700 });
        scrollBottom.reveal('.delayLargeBottomExtra', { delay: 900 });

        // ========== SCROLL LEFT ========= //
        const scrollLeft = ScrollReveal({
            origin: 'left',
            distance: '50px',
            duration: 2000,
        });

        scrollLeft.reveal('.home-data-img, .sony-left, .about-img, .contact-button, .form-left, .control-about-2', {
            delay: 550,
        });

        // ========== SCROLL RIGHT ========= //
        const scrollRight = ScrollReveal({
            origin: 'left',
            distance: '-20px',
            duration: 2200,
        });

        scrollRight.reveal('.sony-right, .about-data, .contact-title, .form-right, .data-2', { delay: 550 });

        // ========== BUTTON SCROLL TOP ========= //
        const backTopButton = document.querySelector('.scrollup');
        function backToTop() {
            if (window.scrollY >= 550) {
                backTopButton?.classList.add('show');
            } else {
                backTopButton?.classList.remove('show');
            }
        }

        window.addEventListener('scroll', function () {
            backToTop();
        });
    }, []);
    return (
        <>
            <section className="home-container section grid" id="home">
                <div className="home-content">
                    <div className="home-data">
                        <h1 className="home-titulo section-title delaySmall">
                            PlayStation <br />
                            <span className="controller section-span"> Controller</span>
                        </h1>
                        <p className="home-description delayMedium">
                            This is a Hyper Ergonimic PLAYSTATION Controller <br /> Concept Makes
                            Gaming Far More Comfortable
                        </p>
                        <div className="home-button">
                            <a className="btn-about-more delayLarge">
                                About More
                            </a>
                            <a
                                className="btn-explore delayLargeTopExtra"
                                href="assets/html/produts.html"
                            >
                                Explore Produts <i className="uil uil-arrow-right" />
                            </a>
                        </div>
                        <div className="sony">
                            <img
                                className="sony-left"
                                src={sony}
                                alt="imagem do nome sony"
                            />
                            <img
                                className="sony-right"
                                src={sony}
                                alt="imagem do nome sony"
                            />
                            <img
                                className="sony-left"
                                src={sony}
                                alt="imagem do nome sony"
                            />
                            <img
                                className="sony-right"
                                src={sony}
                                alt="imagem do nome sony"
                            />
                        </div>
                    </div>
                    <div className="home-data-img ">
                        <img
                            className="home-img desktop"
                            src={controller}
                            alt="controle do PlayStation 4 da cor preta, versão desktop"
                        />
                        <span className="controle superior delayLargeTopExtra">
                            Compatible with <br /> Controller <div className="line1" />
                            <div className="circle1" />
                        </span>
                        <span className="controle inferior delayLargeBottomExtra">
                            Made of High <br /> Quality Silicone<div className="line2"></div>
                            <div className="circle2" />
                        </span>
                    </div>
                </div>
            </section>
            <About />
            {/* <Products /> */}
            <Top />
            <Faq />
        </>


    )
}
