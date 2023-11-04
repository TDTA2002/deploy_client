import about from '@/images/about-img.png'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <section className="about-container section grid">
            <div className="about-content">
                <div className="data-about-img">
                    <img
                        className="about-img"
                        src={about}
                        alt="imagens detalhadas do controle preto do PlayStation 4"
                    />
                </div>
                <div className="about-data">
                    <h2 className="about-home-title section-title">
                        Made with <span className="section-span">quality</span>
                    </h2>
                    <p className="about-home-description">
                        Your PlayStation controler isn't just limited to your console, with
                        integrated Bluetooth supporting iOS. Android, and PCs. We recommend
                        picking up a phone clip. though.
                    </p>
                    <ul className="about-list">
                        <li>Great. familiar in-hand feel</li>
                        <li>Works with PlayStation, iOS, Android, PC </li>
                        <li>Supports PlayStation controller clips</li>
                        <li>Easy to use for any enviromment</li>
                    </ul>
                    <div className="button-about">
                        <Link to={'/products'}>
                            Shop Now 
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}
