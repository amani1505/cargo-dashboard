import { createAction, props } from '@ngrx/store';
import { RoomType } from './room-type';


// CREATE
export const invokeSaveRoomTypeAPI = createAction(
  '[Room Type API] Invoke save new Room Type api',
  props<{ newRoomType: any }>()
);

export const saveRoomTypeAPISuccess = createAction(
  '[Room Type API] save new Room Type API Success',
  props<{ newRoomType: any }>()
);

//  READ
export const invokeRoomTypeAPI = createAction(
  '[Room Type API] Invoke Fetch Room Type API'
);

export const roomTypeFetchAPISuccess = createAction(
  '[Room Type API] Fetch Room Types  API Success',
  props<{ allRoomTypes: RoomType[] }>()
);
