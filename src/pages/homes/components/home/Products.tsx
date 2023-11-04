import rocket from '@/images/bx-rocket.png'
import charging from '@/images/bxs-battery-charging.png'
import bluetooth from '@/images/bx-bluetooth.png'

export default function Products() {
    return (
        <section className="functions-container section grid">
            <div className="function-content">
                <h2 className="function-title section-title">
                    Our <span className="section-span">Functions</span>
                </h2>
                <p className="function-description">
                    PlayStation Wireless Controller Series 2
                </p>
                <div className="card-content">
                    <div className="card">
                        <img
                            className="icone-animation"
                            src={rocket}
                            alt="icone de foguete azul"
                        />
                        <h3>VELOCITY</h3>
                        <div className="line-function" />
                        <div className="circle-function" />
                    </div>
                    <div className="card">
                        <img
                            className="icone-animation"
                            src={charging}
                            alt="icone de bateria de celular azul"
                        />
                        <h3>DURABLE</h3>
                        <div className="line-function" />
                        <div className="circle-function" />
                    </div>
                    <div className="card">
                        <img
                            className="icone-animation"
                            src={bluetooth}
                            alt="icone do Bluetooth azul"
                        />
                        <h3>bluetooth</h3>
                        <div className="line-function" />
                        <div className="circle-function" />
                    </div>
                </div>
            </div>
        </section>

    )
}
