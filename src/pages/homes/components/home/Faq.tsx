import { useEffect } from 'react';

export default function Faq() {
    useEffect(() => {
        const faqItems = document.querySelectorAll('.faq-page');

        function toggleFaqItem(this: any) {
            this.classList.toggle('active');
            const body = this.nextElementSibling;
            if (body.style.display === 'block') {
                body.style.display = 'none';
            } else {
                body.style.display = 'block';
            }
        }

        faqItems.forEach((faqItem) => {
            faqItem.addEventListener('click', toggleFaqItem.bind(faqItem));
        });

        return () => {
            faqItems.forEach((faqItem) => {
                faqItem.removeEventListener('click', toggleFaqItem);
            });
        };
    }, []);

    return (
        <section className="faq faq-container section grid" id="faq">
            <h5 className="sub-title">SECURELY BUY AND TRACK</h5>
            <h2 className="faq-title section-title">
                Frequenly Asked <span className="section-span">Question</span>
            </h2>
            <p className="faq-description">
                We know you have some questions in mind, we have tried to list the most
                important ones.
            </p>
            <div className="faq-content">
                <div className="faq-one">
                    <hr className="hr-line" />
                    <h1 className="faq-page">What form of payment do you accept?</h1>
                    <div className="faq-body">
                        <p>
                            Take full control of every game using the smartest controller design
                            we've ever created. <br />
                            With responsive triggers, refined controls, textured grips
                        </p>
                    </div>
                </div>
                <hr className="hr-line" />
                <div className="faq-two">
                    <h1 className="faq-page">How can I get in touch?</h1>
                    <div className="faq-body">
                        <p>
                            Take full control of every game using the smartest controller design
                            we've ever created. <br />
                            With responsive triggers, refined controls, textured grips
                        </p>
                    </div>
                </div>
                <hr className="hr-line" />
                <div className="faq-three">
                    <h1 className="faq-page">Do you have any discounts?</h1>
                    <div className="faq-body">
                        <p>
                            Take full control of every game using the smartest controller design
                            we've ever created. <br />
                            With responsive triggers, refined controls, textured grips
                        </p>
                    </div>
                </div>
                <hr className="hr-line" />
                <div className="faq-three">
                    <h1 className="faq-page">What guarantee do I have?</h1>
                    <div className="faq-body">
                        <p>
                            Take full control of every game using the smartest controller design
                            we've ever created. <br />
                            With responsive triggers, refined controls, textured grips
                        </p>
                    </div>
                </div>
                <hr className="hr-line" />
                <div className="faq-three">
                    <h1 className="faq-page">Can I pay in installments?</h1>
                    <div className="faq-body">
                        <p>
                            Take full control of every game using the smartest controller design
                            we've ever created. <br />
                            With responsive triggers, refined controls, textured grips
                        </p>
                    </div>
                </div>
                <hr className="hr-line" />
            </div>
        </section>

    )
}
