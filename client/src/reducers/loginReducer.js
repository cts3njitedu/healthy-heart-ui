import { LOGIN_FORM_CHANGE, LOGIN_FORM_VALIDATION_FINISH, API_GET_LOGIN_PAGE_START, API_GET_LOGIN_PAGE_FAILURE, RESTRUCTURE_PAGE, LOGIN_FORM_SUBMIT_BEGIN, API_POST_LOGIN_PAGE_START, API_POST_LOGIN_PAGE_FAILURE, API_POST_LOGIN_PAGE_SUCCESS } from "../actions/loginAction";

const initialState = {
  page: {
    errors: [],
    sections: [],
    validations: [],
    fields: []
  },
  loading: false,
  error: null,
  submitting: false,
  pageTemplate: {},
  submitError: null,
  submitted: false
};

export default function loginFormReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case LOGIN_FORM_SUBMIT_BEGIN: 
      return {
        ...state,
        submitting: true
      }
    case API_GET_LOGIN_PAGE_START:
      return {
        page:{},
        loading: true,
        error: null,
        submitting:false
      }
    case API_POST_LOGIN_PAGE_START: 
      return {
        ...state,
        submitting: true
      }
    case API_GET_LOGIN_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        page: {},
        error: action.payload.error,
      }
    case API_POST_LOGIN_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        page: {
          ...state.page,
          errors: [...state.page.errors, action.payload.error.page.errors]
        },
        submitError: null,
        submitting: false
      }
    case API_POST_LOGIN_PAGE_SUCCESS:
      return {
        ...state,
        submitted: true,
        submitting: false
      }
    case RESTRUCTURE_PAGE: 
      return {
        ...state,
        loading: false,
        submitting: false,
        page: action.payload.page,
        pageTemplate: action.payload.pageTemplate ,
        submitError: null,
        submitted: false
      }
    case LOGIN_FORM_CHANGE:
      return {
        ...state,
        page: {
          ...state.page,
          errors: [],
          fields: state.page.fields.map((field) => {
            if (field.id !== action.payload.field.id) {
                return field;
            }
            return {
              ...field,
              value: action.payload.field.value
            }
          })
        }
      }
    case LOGIN_FORM_VALIDATION_FINISH:
      return {
        ...state,
        page: {
          ...state.page,
          errors: [],
          fields: state.page.fields.map((field) => {
            if (field.id in action.payload.errorFields) {
              return {
                ...field,
                errors: action.payload.errorFields[field.id]
              }
            } else {
              return field;
            }
          })
        }
      }
    default:
      // ALWAYS have a default case in a reducer
      return {
        page: {},
        loading: false,
        error: null,
        submitting: false,
        pageTemplate: {},
        submitError: null,
        submitted: false
      }
  }
}