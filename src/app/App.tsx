import React from "react";
import { PlayerCommunicationBlock } from "widgets/PlayerCommunicationBlock";
import i18next from "i18next";
import global_en from "./localization/en.json";
import global_uk from "./localization/uk.json";
import global_ru from "./localization/ru.json"
import { I18nextProvider } from "react-i18next";

const App = () => {
    i18next.init({
        interpolation: {escapeValue: false},
        lng: "en",
        resources: {
            "en": {
                global: global_en
            },
            "ru": {
                global: global_ru
            },
            "uk": {
                global: global_uk
            }
        } 
    })

    return (
        <div>
            <I18nextProvider i18n={i18next}>
                <PlayerCommunicationBlock />
            </I18nextProvider>
        </div>
    );
}

export default App;