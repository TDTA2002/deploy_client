import { useState } from 'react';
import './scss/dropdown.scss';

export default function ToggleLanguage() {
    const [language] = useState(localStorage.getItem("locales") === "en" ? "English" : "Viet Nam")
    function changeLanguage(lang: string) {
        localStorage.setItem("locales", lang);
        window.location.reload();
    }
    return (
        <div className="dropdown toggle-language">
            <a
                className="dropdown-toggle"
                href="#"
                id="Dropdown"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
            >
                {language === "English" ? <i className="flag-united-kingdom flag m-0" /> : <i className="flag-vietnam flag" />} {language}
            </a>
            <ul className="dropdown-menu toggle-language-menu" aria-labelledby="Dropdown" style={{ zIndex: "100000" }}>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => changeLanguage("en")}>
                        <i className="flag-united-kingdom flag" />
                        En {language === "English" ? <i className="fa fa-check text-success ms-2" /> : <></>}
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => changeLanguage("vi")}>
                        <i className="flag-vietnam flag" />
                        Vi {language === "Viet Nam" ? <i className="fa fa-check text-success ms-2" /> : <></>}
                    </a>
                </li>
            </ul>
        </div>

    )
}