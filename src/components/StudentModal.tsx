import React from 'react';
import { Modal } from 'native-base';

interface Props {
    modalIsShown: boolean;
    onCloseModal: () => void;
    header: string;
    children: React.ReactNode
}

export function StudentModal({ modalIsShown, onCloseModal, header, children }: Props) {
    return (
        <Modal isOpen={modalIsShown} onClose={onCloseModal}>
            <Modal.Content size="sm">
                <Modal.CloseButton />
                <Modal.Header>{header}</Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}