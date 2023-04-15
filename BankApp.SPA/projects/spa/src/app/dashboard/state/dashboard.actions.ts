import { createAction, props } from '@ngrx/store';
import { DownloadConfirmationSuccessProps } from './props/download-confirmation-success.props';
import { DownloadConfirmationProps } from './props/download-confirmation.props';

export const DashboardActions = {
  init: createAction(
    '[Dashboard] Init'
  ),
  downloadConfirmation: createAction(
    '[Dashboard] Download confirmation',
    props<DownloadConfirmationProps>()
  ),
  downloadConfirmationSuccess: createAction(
    '[Dashboard] Download confirmation success',
    props<DownloadConfirmationSuccessProps>()
  ),
  downloadConfirmationFail: createAction(
    '[Dashboard] Download confirmation fail'
  ),
};
