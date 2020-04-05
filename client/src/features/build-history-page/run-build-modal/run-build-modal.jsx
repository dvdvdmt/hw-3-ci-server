import React from 'react';
import {Button} from '../../../components/button/button.jsx';
import {Modal} from '../../../components/modal/modal.jsx';

export function RunBuildModal({closePortal}) {
  return (
    <Modal closeModal={closePortal}>
      <form data-test="run-build-form">
        This is more advanced Portal. It handles its own state.{' '}
        <Button htmlType="button" onClick={closePortal}>
          Close me!
        </Button>
        , hit ESC or click outside of me.
      </form>
    </Modal>
  );
}
