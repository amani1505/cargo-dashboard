import { createReducer, on } from '@ngrx/store';
import { AppState } from './app-state';
import { setAPIStatus } from './app.action';


export const intialState: Readonly<AppState> = {
  apiResponseMessage: '',
  apiStatus: '',
};

export const appReducer = createReducer(
    intialState,
   on(setAPIStatus,(state,{apiStatus})=>{
    return{
        ...state,
        ...apiStatus
    }
   })
)