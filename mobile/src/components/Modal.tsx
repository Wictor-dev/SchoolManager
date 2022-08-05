import React from 'react';
import { Modal as NativeBaseModal } from 'native-base';

interface Props {
    modalIsShown: boolean;
    onCloseModal: () => void;
    header: string;
    children: React.ReactNode
}

export function Modal({ modalIsShown, onCloseModal, header, children }: Props) {
    return (
        <NativeBaseModal isOpen={modalIsShown} onClose={onCloseModal}>
            <NativeBaseModal.Content size="sm">
                <NativeBaseModal.CloseButton />
                <NativeBaseModal.Header>{header}</NativeBaseModal.Header>
                <NativeBaseModal.Body>
                    {children}
                </NativeBaseModal.Body>
            </NativeBaseModal.Content>
        </NativeBaseModal>
    );
}