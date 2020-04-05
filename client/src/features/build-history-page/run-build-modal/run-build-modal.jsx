import './run-build-modal.scss';
import React from 'react';
import {Button} from '../../../components/button/button.jsx';
import {FormInput} from '../../../components/form/form.jsx';
import {Modal} from '../../../components/modal/modal.jsx';

export function RunBuildModal({closePortal}) {
  return (
    <Modal closeModal={closePortal}>
      <form data-test="run-build-form" className="RunBuildForm">
        <h2 className="RunBuildForm-Header">New build</h2>
        <div className="Form-Group">
          <label className="RunBuildForm-Description">
            Enter the commit hash which you want to build.
          </label>
          <FormInput
            id="repo-name"
            name="repoName"
            data-test="repoName"
            type="text"
            placeholder="Commit hash"
            defaultValue={settings.repoName}
            required
          />
        </div>
        <div className="Form-Group Form-Group_buttons">
          <Button htmlType="submit" type="primary" data-test="run-build-button">
            Run build
          </Button>
          <Button htmlType="button" onClick={closePortal} data-test="close-modal-button">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
