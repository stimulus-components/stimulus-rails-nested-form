import { Controller } from 'stimulus'

export default class extends Controller {
  targetTarget: HTMLElement
  templateTarget: HTMLElement
  wrapperSelectorValue: string
  wrapperSelector: string

  static targets = ['target', 'template']
  static values = {
    wrapperSelector: String,
    actionSelector: String
  }

  initialize (): void {
    this.wrapperSelector = this.wrapperSelectorValue || '.nested-form-wrapper'
    this.actionSelector = this.actionSelectorValue || '.nested-form-action'
  }

  add (e: Event) {
    e.preventDefault()

    const content: string = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, new Date().getTime().toString())
    this.targetTarget.insertAdjacentHTML('beforebegin', content)
  }

  remove (e: Event): void {
    e.preventDefault()

    // @ts-ignore
    const wrapper: HTMLElement = e.target.closest(this.wrapperSelector)

    if (wrapper.dataset.newRecord === 'true') {
      wrapper.remove()
    } else {
      wrapper.style.display = 'none'

      const input: HTMLInputElement = wrapper.querySelector("input[name*='_destroy']")
      input.value = '1'
    }
  }
}
