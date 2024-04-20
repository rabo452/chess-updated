import { store } from "app/store";
import i18next from "i18next";
import { FC } from "react";
import { I18nextProvider } from "react-i18next";
import global_en from "app/localization/en.json";
import global_uk from "app/localization/uk.json";
import global_ru from "app/localization/ru.json";
import { Provider } from "react-redux";

export const AppProvider: FC<{readonly children: JSX.Element}> = ({children}) => {
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
        <I18nextProvider i18n={i18next}>
            <Provider store={store}>
                {children}
            </Provider>
        </I18nextProvider>
    )
}