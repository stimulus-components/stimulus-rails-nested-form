import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['destroy']

  remove (e) {
    e.preventDefault()

    if (this.persisted) {
      this.destroyTarget.value = 1
      if (this.data.has('classes')) {
        this.element.classList.add(...this.classes)
      } else {
        this.element.style.display = 'none'
      }
    } else {
      this.element.remove()
    }
  }

  get persisted () {
    return this.data.has('persisted') && this.data.get('persisted') === 'true'
  }

  get classes () {
    return this.data.get('classes').split(' ')
  }
}
