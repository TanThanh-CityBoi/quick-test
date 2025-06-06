import { AiOutlineIssuesClose } from 'react-icons/ai';
import PrimaryButton from '../button/PrimaryButton';
import BaseModal from './BaseModal';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

type ModalErrorProps = {
    showModal: boolean;
    setShowModal: Function;
    handleOk?: Function;
    handleCancel?: Function;
    buttonTitle?: string;
    message?: string;
};

const ModalError = ({ ...props }: React.AllHTMLAttributes<ReactElement> & ModalErrorProps) => {
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
                className="h-[500px] w-[600px] bg-red-500"
                handleOk={() => handleOk()}
                handleCancel={() => handleCancel()}
                disableHeader={true}
                disableToggle={true}
                footer={
                    <div className="flex justify-center py-10">
                        <PrimaryButton
                            type="button"
                            content={
                                props?.buttonTitle || commonT.t('modal.base_modal.confirm_button')
                            }
                            icon={<AiOutlineIssuesClose className="me-2 text-2xl" />}
                            className="min-w-[200px] px-8 py-4 text-xl !font-semibold"
                            background="bg-primary-500"
                            onClick={() => handleOk()}
                        />
                    </div>
                }
            >
                <div className="h-full py-10">
                    <div className="flex justify-center py-10">
                        <div className="aspect-square h-40 rounded-full bg-white p-4">
                            <img
                                alt="error.img"
                                src="/images/error-icon.webp"
                                className="h-full w-full"
                            ></img>
                        </div>
                    </div>

                    <h3 className="text-center font-semibold text-gray-100">{props?.message}</h3>
                </div>
            </BaseModal>
        </>
    );
};
export default ModalError;
