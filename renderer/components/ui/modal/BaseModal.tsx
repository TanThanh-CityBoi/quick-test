import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

type ModalProps = {
    showModal: Boolean;
    setShowModal: Function;
    //
    header?: ReactElement;
    disableHeader?: Boolean;
    //
    toggleButton?: ReactElement;
    disableToggle?: Boolean;
    //
    disableClose?: Boolean;
    closeButton?: Boolean;
    //
    footer?: ReactElement;
    disableFooter?: Boolean;
    //
    body?: ReactElement;
    //
    modalTitle?: string;
    modalContent?: string;
    //
    handleCancel?: Function;
    handleOk?: Function;
};
const BaseModal = ({
    showModal = false,
    disableHeader = false,
    disableToggle = false,
    disableClose = false,
    disableFooter = false,
    ...props
}: React.AllHTMLAttributes<ReactElement> & ModalProps) => {
    const commonT = useTranslation('common');
    const handleCancel = () => {
        if (props?.handleCancel) {
            props.handleCancel();
            return;
        }
        props.setShowModal(false);
    };
    const handleOk = () => {
        if (props?.handleOk) {
            props.handleOk();
            return;
        }
        props.setShowModal(false);
    };
    //
    const ToggleButton = () => {
        return (
            !disableToggle ||
            (props?.toggleButton && (
                <button
                    className="active:bg-primary-700 bg-primary-600 mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={() => props.setShowModal(true)}
                >
                    {commonT.t('modal.base_modal.toggle_button_content')}
                </button>
            ))
        );
    };

    const Header = () => {
        return (
            !disableHeader &&
            (props.header || (
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                    <h3 className="text-3xl font-semibold">
                        {props?.modalTitle || commonT.t('modal.base_modal.modal_title')}
                    </h3>
                    {!disableClose && (
                        <button
                            className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                            onClick={() => props.setShowModal(false)}
                        >
                            <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    )}
                </div>
            ))
        );
    };

    const Footer = () => {
        return (
            !disableFooter &&
            (props.footer || (
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                    <button
                        className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-black outline-none transition-all duration-150 ease-linear focus:outline-none"
                        type="button"
                        onClick={() => handleCancel()}
                    >
                        {commonT.t('modal.base_modal.cancel_button')}
                    </button>
                    <button
                        className="bg-primary-600 mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                        type="button"
                        onClick={() => handleOk()}
                    >
                        {commonT.t('modal.base_modal.confirm_button')}
                    </button>
                </div>
            ))
        );
    };

    const ModalContent = () => {
        return (
            <div className="h-full">
                {props?.children || (
                    <div className="relative flex-auto p-6">
                        <p className="text-blueGray-500 my-4 text-lg leading-relaxed">
                            {props?.modalContent || commonT.t('modal.base_modal.modal_content')}
                        </p>
                    </div>
                )}
            </div>
        );
    };

    //
    return (
        <>
            <ToggleButton></ToggleButton>
            {showModal ? (
                <>
                    <div
                        className={`modal-show fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-transparent outline-none focus:outline-none`}
                    >
                        <div className={`relative mx-auto my-6 w-auto max-w-3xl bg-transparent`}>
                            <div
                                className={`relative flex flex-col rounded-lg border-0 p-1 shadow-lg outline-none focus:outline-none ${props?.className ? props.className : ''}
                                `}
                            >
                                <Header></Header>
                                <ModalContent></ModalContent>
                                <Footer></Footer>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
        </>
    );
};

export default BaseModal;
