import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  targetTarget: HTMLElement
  templateTarget: HTMLElement
  wrapperSelectorValue: string

  static targets = ['target', 'template']
  static values = {
    wrapperSelector: {
      type: String,
      default: '.nested-form-wrapper'
    }
  }

  add(e: Event) {
    e.preventDefault()

    // Generate a unique identifier based on the current time
    const uniqueId = new Date().getTime().toString()

    // Clone the template content and replace NEW_RECORD with uniqueId
    let content = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, uniqueId)

    // Insert the cloned and modified content before the target
    this.targetTarget.insertAdjacentHTML('beforebegin', content)

    // Find the last set of fields added and adjust their attributes
    const lastAddedFields = this.element.querySelector(`[data-fields-id="${uniqueId}"]`);
    if (lastAddedFields) {
      lastAddedFields.querySelectorAll('input, select, textarea').forEach((input) => {
        if (input.hasAttribute('name')) {
          const updatedName = input.getAttribute('name').replace(/\[\d+\]/, `[${uniqueId}]`);
          input.setAttribute('name', updatedName);
        }
        if (input.hasAttribute('id')) {
          const updatedId = input.getAttribute('id').replace(/_\d+/, `_${uniqueId}`);
          input.setAttribute('id', updatedId);
        }
      });

      // Update the 'for' attributes of associated labels
      lastAddedFields.querySelectorAll('label').forEach((label) => {
        if (label.hasAttribute('for')) {
          const updatedFor = label.getAttribute('for').replace(/_\d+/, `_${uniqueId}`);
          label.setAttribute('for', updatedFor);
        }
      });
    }
  }

  remove(e: Event): void {
    e.preventDefault()

    //@ts-ignore
    // Find the closest wrapper using the provided selector value
    const wrapper = e.target.closest(this.wrapperSelectorValue)

    if (wrapper.dataset.newRecord === 'true') {
      wrapper.remove() // Remove the wrapper if it's a newly added record
    } else {
      wrapper.style.display = 'none' // Hide the wrapper for existing records
      //@ts-ignore
      const input = wrapper.querySelector("input[name*='_destroy']")
      input.value = '1' // Mark the record for destruction on form submission
    }
  }
}
