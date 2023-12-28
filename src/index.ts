import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  targetTarget: HTMLElement
  templateTarget: HTMLElement
  wrapperSelectorValue: string
  positionValue: InsertPosition

  static targets = ['target', 'template']
  static values = {
    wrapperSelector: {
      type: String,
      default: '.nested-form-wrapper'
    },
    position: {
      type: String,
      default: 'beforebegin'
    }
  }

  add (e: Event) {
    e.preventDefault()

    const content: string = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, new Date().getTime().toString())
    this.targetTarget.insertAdjacentHTML(this.positionValue, content)
  }

  remove (e: Event): void {
    e.preventDefault()

    // @ts-ignore
    const wrapper: HTMLElement = e.target.closest(this.wrapperSelectorValue)

    if (wrapper.dataset.newRecord === 'true') {
      wrapper.remove()
    } else {
      wrapper.style.display = 'none'

      const input: HTMLInputElement = wrapper.querySelector("input[name*='_destroy']")
      input.value = '1'
    }
  }
}
