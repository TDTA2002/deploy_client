import blob from '@/images/blob.svg'
import about from '@/images/Controller-About-1.svg'
import about2 from '@/images/Controller-About-2.svg'
import about3 from '@/images/Controller-About-3.svg'

export default function Top() {
    return (
        <section className="control section grid">
            <div className="about-content delayMedium">
                <div className="about-data-1 ">
                    <h1 className=" about-title delayMedium">
                        PlayStation <br /> Controller
                    </h1>
                    <p className="section-description about-description delayLarge">
                        This is a Hyper trgonomic Playstation Controller <br /> Concept Hakes
                        Gaming Far Hore Comfortable
                    </p>
                    <a
                        className="button-about about-button delayLargeTopExtra"
                        href="/assets/html/produts.html"
                    >
                        Explore Produts{" "}
                    </a>
                    <img className="blob" src={blob} alt="borda do fundo" />
                </div>
                <div className="img-data-1 form-left">
                    <img
                        src={about}
                        alt="Controler do playstation 4 da cor branco"
                    />
                </div>
            </div>
            <div className="about-content-1">
                <div className="about-data-1 data-2">
                    <h1 className="section-title about-title-1">
                        Powerful <span className="section-span">Game</span> Controller
                    </h1>
                    <p className="section-description about-description-1">
                        Playstation Elite Wireless Controller Series 2
                    </p>
                    <a className="button-power " href="/assets/html/produts.html">
                        Explore Produts <i className="uil uil-arrow-right btn" />
                    </a>
                </div>
                <div className="img-data-1">
                    <img
                        className="control-about-2"
                        src={about2}
                        alt="Controler do playstation 4 da cor preta"
                    />
                </div>
            </div>
            <div className="about-content-1">
                <div className="img-data-1 delayMedium">
                    <img
                        src={about3}
                        alt="Controler do playstation 4 da cor branco"
                    />
                </div>
                <div className="about-data-1 ">
                    <h1 className="section-title about-title-1 delaySmallBottom">
                        <span className="section-span">Game</span> play best on Playstation
                    </h1>
                    <p className="section-description about-description-1 delayMediumBottom">
                        Playstation Elite Wireless Controller Series 2
                    </p>
                    <a
                        className="button-power delayLargeBottom"
                        href=""
                    >
                        Explore Produts <i className="uil uil-arrow-right btn" />
                    </a>
                </div>
            </div>
        </section>

    )
}
