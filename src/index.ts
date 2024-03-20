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

    // Generate a unique identifier that combines the current time with a random value
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Clone the template content and replace NEW_RECORD with the new uniqueId
    let content = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, uniqueId)

    // Insert the cloned and modified content before the target
    this.targetTarget.insertAdjacentHTML('beforebegin', content)

    // Adjust the attributes of the last set of fields added
    this.updateNestedAttributes(this.targetTarget.previousElementSibling, uniqueId);
  }

  remove(e: Event): void {
    e.preventDefault()

    //@ts-ignore
    const wrapper = e.target.closest(this.wrapperSelectorValue)

    if (wrapper.dataset.newRecord === 'true') {
      wrapper.remove()
    } else {
      wrapper.style.display = 'none'
      //@ts-ignore
      const input = wrapper.querySelector("input[name*='_destroy']")
      input.value = '1'
    }
  }

  updateNestedAttributes(element, uniqueId) {
    // This method recursively updates names and IDs of nested attributes
    element.querySelectorAll('input, select, textarea, label').forEach((el) => {
      const nameAttr = el.getAttribute('name');
      const idAttr = el.getAttribute('id');
      const forAttr = el.getAttribute('for');

      if (nameAttr) {
        const newName = nameAttr.replace(/\[\d+\](?=\[\w+_attributes\])/g, `[${uniqueId}]`);
        el.setAttribute('name', newName);
      }
      if (idAttr) {
        const newId = idAttr.replace(/_\d+_/g, `_${uniqueId}_`);
        el.setAttribute('id', newId);
      }
      if (forAttr && el.tagName === 'LABEL') {
        const newFor = forAttr.replace(/_\d+_/g, `_${uniqueId}_`);
        el.setAttribute('for', newFor);
      }
    });

    // Recursively update nested forms
    element.querySelectorAll('.nested-form-wrapper').forEach(nestedElement => {
      const newUniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      this.updateNestedAttributes(nestedElement, newUniqueId);
    });
  }
}
