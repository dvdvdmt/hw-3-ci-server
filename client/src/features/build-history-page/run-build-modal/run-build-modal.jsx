import './run-build-modal.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../../../components/button/button.jsx';
import {FormInput} from '../../../components/form/form.jsx';
import {Modal} from '../../../components/modal/modal.jsx';
import {buildsSelector, loadBuilds, loadBuildsStart, runBuild} from '../../../store/builds.js';
import {getFormValuesAsObject} from '../../../utils/form.js';

export function RunBuildModal({closePortal}) {
  const dispatch = useDispatch();
  const builds = useSelector(buildsSelector);
  return (
    <Modal closeModal={closePortal}>
      <form data-test="run-build-form" className="RunBuildForm" onSubmit={onSubmitHandler}>
        <h2 className="RunBuildForm-Header">New build</h2>
        <div className="Form-Group">
          <label className="RunBuildForm-Description" htmlFor="commitHash">
            Enter the commit hash which you want to build.
          </label>
          <FormInput
            id="commitHash"
            name="commitHash"
            data-test="commit-hash"
            type="text"
            placeholder="Commit hash"
            defaultValue={settings.repoName}
            required
          />
        </div>
        <div className="Form-Group Form-Group_buttons">
          <Button htmlType="submit" type="primary" data-test="run-build-submit">
            Run build
          </Button>
          <Button
            htmlType="button"
            onClick={closePortal}
            data-test="close-modal-button"
            disabled={builds.runByHash.isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );

  function onSubmitHandler(event) {
    event.preventDefault();
    const formValues = getFormValuesAsObject(event.target);
    dispatch(runBuild(formValues.commitHash)).then(() => {
      closePortal();
      dispatch(loadBuildsStart());
      setTimeout(() => {
        dispatch(loadBuilds());
      }, 1000);
    });
  }
}
