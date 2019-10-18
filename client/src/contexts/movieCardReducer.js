import {
  VIDEO_BUTTON_CLICK,
  WATCHLIST_ICON_CLICK,
  STAR_CLICK,
  DELETE_MOVIE_RATE_CLICK,
  MODAL_OPEN,
  MODAL_CLOSE,
  MOUSE_OVER,
  MOUSE_OUT,
  CHECK_MOVIE_RATE,
  CHECK_WATCHLIST
} from "./types";

export default (state, { type, payload }) => {
  switch (type) {
    case VIDEO_BUTTON_CLICK:
      return {
        ...state,
        activeIndex: payload
      };
    case WATCHLIST_ICON_CLICK:
      return {
        ...state,
        iconClicked: payload
      };
    case STAR_CLICK:
      return {
        ...state,
        starIndex: payload
      };
    case DELETE_MOVIE_RATE_CLICK:
      return {
        ...state,
        starIndex: null
      };
    case MODAL_OPEN:
      return {
        ...state,
        modalOpen: true
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false
      };
    case MOUSE_OVER:
      return {
        ...state,
        activeIndexRate: payload,
        isHovered: true
      };
    case MOUSE_OUT:
      return {
        ...state,
        isHovered: false
      };
    case CHECK_MOVIE_RATE:
      return {
        ...state,
        starIndex: payload
      };
    case CHECK_WATCHLIST:
      return {
        ...state,
        iconClicked: payload
      };
    default:
      return state;
  }
};
