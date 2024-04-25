import { Controller } from "@hotwired/stimulus"

export default class RailsNestedForm extends Controller {
  targetTarget: HTMLElement
  templateTarget: HTMLElement
  templateTargets: HTMLElement[]
  wrapperSelectorValue: string

  static targets = ["target", "template"]
  static values = {
    wrapperSelector: {
      type: String,
      default: ".nested-form-wrapper",
    },
  }

  add(e: Event): void {
    e.preventDefault()

    const templateTarget = this.resolveTemplate(e.target as HTMLElement)

    const content: string = templateTarget.innerHTML.replace(/NEW_RECORD/g, new Date().getTime().toString())
    this.targetTarget.insertAdjacentHTML("beforebegin", content)

    const event = new CustomEvent("rails-nested-form:add", { bubbles: true })
    this.element.dispatchEvent(event)
  }

  remove(e: Event): void {
    e.preventDefault()

    // @ts-ignore
    const wrapper: HTMLElement = e.target.closest(this.wrapperSelectorValue)

    if (wrapper.dataset.newRecord === "true") {
      wrapper.remove()
    } else {
      wrapper.style.display = "none"

      const input: HTMLInputElement = wrapper.querySelector("input[name*='_destroy']")
      input.value = "1"
    }

    const event = new CustomEvent("rails-nested-form:remove", { bubbles: true })
    this.element.dispatchEvent(event)
  }

  private resolveTemplate(element: HTMLElement): string {
    if (element.dataset.templateName) {
      return this.templateTargets.find((templateTarget: HTMLEelement): boolean => (
        templateTarget.dataset.templateName === element.dataset.templateName
      ))
    }

    return this.templateTarget
  }
}
