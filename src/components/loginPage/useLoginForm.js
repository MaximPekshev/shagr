import { useReducer } from "react";

const DEFAULT_STATE = {
    email: "",
    pin: "",
};

const SET_EMAIL_ACTION = "setEmail";
const SET_PIN_ACTION = "setPin";
const CLEAR_ACTION = "clear";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_EMAIL_ACTION:
            return { ...state, email: action.payload };
        case SET_PIN_ACTION:
            return { ...state, pin: action.payload };
        case CLEAR_ACTION:
            return DEFAULT_STATE;
        default:
            return state;
    }
};

export const useLoginForm = () => {
    const [form, dispatch] = useReducer(reducer, DEFAULT_STATE);
    
    const setEmail = (email) => {
        dispatch({ type: SET_EMAIL_ACTION, payload: email });
    };
    const setPin = (pin) => {
        dispatch({ type: SET_PIN_ACTION, payload: pin });
    };
    const clearForm = () => {
        dispatch({ type: CLEAR_ACTION });
    };
    return {
        form,
        setEmail,
        setPin,
        clearForm,
    };
};
