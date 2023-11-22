import { createAction, props } from '@ngrx/store';
import { Institute } from './institute';

//  CREATE
export const invokeSaveNewInstituteAPI = createAction(
  '[Institute API] Invoke save new Institute  api',
  props<{ newInstitute: any }>()
);

export const saveInstituteAPISuccess = createAction(
  '[Institute API] save new Institute API Success',
  props<{ newInstitute: any }>()
);

//  READ
export const invokeInstituteAPI = createAction(
  '[Institute API] Invoke Fetch Institute API'
);

export const InstituteFetchAPISuccess = createAction(
  '[Institute API] Fetch Institute API Success',
  props<{ allInstitutes: Institute[] }>()
);

// UPDATE
export const invokeUpdateInstituteAPI = createAction(
  '[Institute API] Inovke update Institute api',
  props<{ updateInstitute: any }>()
);

export const updateInstituteAPISucess = createAction(
  '[Institute API] update  Institute success',
  props<{ updateInstitute: any }>()
);

// DELETE
export const invokeDeleteInstituteAPI = createAction(
  '[Institute API] Inovke delete Institute api',
  props<{ id: string }>()
);

export const deleteInstituteAPISuccess = createAction(
  '[Institute API] deleted Institute api success',
  props<{ id: string }>()
);
