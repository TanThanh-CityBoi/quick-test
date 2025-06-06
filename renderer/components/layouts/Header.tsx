import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateModalPayload, IPC_MESSAGE, LOCALES, ModalType } from '@nextron-app/common';

const Header = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language || LOCALES.vi);

    const changeLang = (lang: string) => {
        setLang(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <div className="py-auto flex h-full items-center justify-between px-6 py-2 shadow-md">
            <div
                className="relative aspect-video h-20 px-2"
                onDoubleClick={() => {
                    window.ipc.send(IPC_MESSAGE.CREATE_MODAL, {
                        type: ModalType.LOGOUT,
                    } as CreateModalPayload);
                }}
            >
                <img
                    className="absolute h-full w-full"
                    src="/images/logo-2.png"
                    alt="core-vision.img"
                ></img>
            </div>

            <div className="relative flex items-center justify-center rounded-xl border border-gray-300 bg-white p-1">
                <button
                    className={`flex items-center px-3 py-1.5 ${
                        lang == LOCALES.vi ? 'rounded-lg bg-transparent' : ''
                    }`}
                    onClick={() => changeLang(LOCALES.vi)}
                >
                    <Image alt="icon-vi.png" src="/icons/vi.png" width={20} height={20}></Image>
                </button>
                <button
                    className={`flex items-center px-3 py-1.5 ${
                        lang == LOCALES.en ? 'rounded-lg bg-transparent' : ''
                    }`}
                    onClick={() => changeLang(LOCALES.en)}
                >
                    <Image alt="icon-vi.png" src="/icons/en.png" width={20} height={20}></Image>
                </button>

                <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full p-1">
                    <div
                        className={`bg-transparent ${lang === LOCALES.en ? 'lang-show' : 'lang-hide'}`}
                        onClick={() => changeLang(LOCALES.vi)}
                    ></div>
                    <div className="h-full w-1/2 rounded-lg bg-gray-600 opacity-20"></div>
                    <div
                        className={`bg-transparent ${lang === LOCALES.vi ? 'lang-show' : 'lang-hide'}`}
                        onClick={() => changeLang(LOCALES.en)}
                    ></div>
                </div>
            </div>
        </div>
    );
};
export default Header;
