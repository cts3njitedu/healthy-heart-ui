import { FORM_CHANGE } from "../actions/formAction";

const initialState = {
    page: {
      sections: [],
      validations: [],
      fields: []
    },
    loading: false,
    error: null
};



export default function formReducer(state, action) {
    console.log(action);
    switch(action.type) {  
      case FORM_CHANGE:
        return {
            ...state,
            page: {
                ...state.page,
                fields: state.page.fields.map((field, index) => {
                    if (field.id === action.payload.field.id) {
                        return {
                            ...field,
                            value: field.value
                        }

                    }
                })
            }
        }
      default:
        // ALWAYS have a default case in a reducer
        return {
          page: {},
          loading: false,
          error: null
        }
    }
  }
