import {
  QUIZ_CREATION_CHANGE_TAB,
  QUIZ_CREATION_OPEN_PREVIEW,
  QUIZ_CREATION_CLOSE_PREVIEW
} from '../variables/constants/QuizCreationConstants'

export function changeTab(value) {
  return ({
    type: QUIZ_CREATION_CHANGE_TAB,
    value,
  })
}
export function openPreview() {
  return {
    type: QUIZ_CREATION_OPEN_PREVIEW
  }
}
export function closePreview() {
  return {
    type: QUIZ_CREATION_CLOSE_PREVIEW
  }
}
