import PrimaryButton from '../button/PrimaryButton';
import BaseModal from './BaseModal';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import SecondaryButton from '../button/SecondaryButton';

type LogoutModalProps = {
    showModal: boolean;
    setShowModal: Function;
    handleOk?: Function;
    handleCancel?: Function;
    buttonTitle?: string;
    message?: string;
};

const LogoutModal = ({ ...props }: React.AllHTMLAttributes<ReactElement> & LogoutModalProps) => {
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

    return (
        <>
            <BaseModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                className="bg-primary-200 h-[500px] w-[600px]"
                handleOk={() => handleOk()}
                handleCancel={() => handleCancel()}
                disableHeader={true}
                disableToggle={true}
                footer={
                    <div className="flex justify-center gap-x-4 pb-10">
                        <PrimaryButton
                            type="button"
                            content={commonT.t('button.logout_title')}
                            className="min-w-[200px] px-8 py-4 text-xl !font-semibold"
                            background="bg-red-400"
                            onClick={() => handleOk()}
                        />

                        <SecondaryButton
                            type="button"
                            content={commonT.t('button.cancel_title')}
                            className="min-w-[200px] px-8 py-4 text-xl !font-semibold"
                            background="bg-white"
                            onClick={() => handleOk()}
                        />
                    </div>
                }
            >
                <div className="flex h-full flex-col justify-center gap-4 py-10">
                    <div className="flex justify-center">
                        <div className="aspect-square h-40 rounded-full bg-white p-4">
                            <img
                                alt="error.img"
                                src="/images/error-icon.webp"
                                className="h-full w-full"
                            ></img>
                        </div>
                    </div>
                    <div className="px-20">
                        <h4 className="mb-2">Mã Thiết Bị</h4>
                        <input
                            type="text"
                            onChange={() => {}}
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        ></input>
                    </div>
                </div>
            </BaseModal>
        </>
    );
};
export default LogoutModal;
