import { createAction, props } from '@ngrx/store';
import { Room } from './room';

// CREATE
export const invokeSaveRoomAPI = createAction(
  '[Room API] Invoke save new Room API',
  props<{ newRoom: any }>()
);

export const saveRoomAPISuccess = createAction(
  '[Room API] save new Room API Success',
  props<{ newRoom: any }>()
);

//  READ
export const invokeRoomAPI = createAction(
  '[Room Type API] Invoke Fetch Room API'
);

export const roomFetchAPISuccess = createAction(
  '[Room API] Fetch Room API Success',
  props<{ allRooms: Room[] }>()
);
