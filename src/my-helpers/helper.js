import {Notify} from 'quasar'

export function notifyWarning(message) {
  Notify.create({
    message: message,
    color: 'negative',
    textColor: 'white',
    position: 'top',
    icon: 'warning'
  })
}

export function notifySuccess(message) {
  Notify.create({
    message: message,
    color: 'positive',
    textColor: 'white',
    position: 'top',
    icon: 'cloud_done',
  })
}



