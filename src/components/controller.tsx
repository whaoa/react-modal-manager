import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { createId } from '../core/utils';
import { createModalManager } from '../core/manager';
import { useManagerModal } from '../hooks/manager';

import type { ReactNode, RefAttributes } from 'react';
import type { ManagedModalComponent, ModalInstance } from '../core/types';

export interface ModalControllerRef<P = unknown> {
  open: (props?: Partial<P>) => ModalInstance;
  close: (payload?: any) => void;
}

export type ModalControllerProps<P = unknown> = Partial<P> & {
  modal: ManagedModalComponent<P>;
};

function useModalId() {
  const [modalId] = useState(createId);
  return modalId;
}

function createUnremovableModalManager() {
  const mm = createModalManager();
  mm.remove = mm.close;
  return mm;
}

function useModalManager() {
  const [mm] = useState(createUnremovableModalManager);
  return mm;
}

export const ModalController = forwardRef<ModalControllerRef, ModalControllerProps>(
  (props, ref) => {
    const { modal: Modal, ...otherProps } = props;

    const modalId = useModalId();
    const modalManager = useModalManager();

    const modalState = useManagerModal(modalManager, modalId) || null;

    useImperativeHandle(ref, () => ({
      open(args) {
        return modalManager.open(Modal, (args || null) as any, { modalId });
      },
      close(payload) {
        modalManager.close(modalId, payload);
      },
    }), [Modal, modalId, modalManager]);

    return (
      <Modal {...(otherProps as any)} modalManager={modalManager} modalState={modalState} />
    );
  },
) as <P>(props: ModalControllerProps<P> & RefAttributes<ModalControllerRef<P>>) => ReactNode;
