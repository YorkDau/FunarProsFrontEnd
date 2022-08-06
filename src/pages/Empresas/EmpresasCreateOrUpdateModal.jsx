import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Dialog, DialogContent } from '@mui/material';
import React from 'react';

function EmpresasCreateOrUpdateModal() {
  const modal = useModal();
  return (
    <Dialog
      fullScreen={false}
      maxWidth="lg"
      fullWidth={false}
      open={modal.visible}
      onClose={() => modal.hide()}
    >
      <DialogContent>
        <div>Crear empresas </div>
      </DialogContent>
    </Dialog>
  );
}

export default NiceModal.create(EmpresasCreateOrUpdateModal);