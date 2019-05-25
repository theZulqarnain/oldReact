import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from "redux-form";
import authReducer from './auth_reducer';
import main from './main'
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import {RESET} from '../actions/types';
const AppReducer = combineReducers({
    form: reduxFormReducer,
    auth: authReducer,
    Main:main,
    StepOneReducer:StepOne,
    StepTwoReducer:StepTwo,
    StepThreeReducer:StepThree,

})

const rootReducer = (state, action) => {
    if (action.type === RESET) {
        // console.log('reset action inside root');
        state = undefined
    }

    return AppReducer(state, action)
}

export default rootReducer;