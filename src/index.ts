import { Controller } from '@hotwired/stimulus'

// Define the controller extending from Stimulus Controller
export default class extends Controller {
  static values = {
    wrapperSelector: String,
    target: String,
    template: String,
    recordPlaceholder: String
  }

  // Function to handle the addition of a new nested form
  add(e: Event) {
    e.preventDefault()

    // Retrieve the template and target selectors from values
    const templateSelector = this.templateValue || 'template';
    const targetSelector = this.targetValue || 'target';

    // Use the selectors to find the actual elements in the DOM
    const templateElement = this.element.querySelector(`[data-${this.identifier}-target='${templateSelector}']`);
    const targetElement = this.element.querySelector(`[data-${this.identifier}-target='${targetSelector}']`);

    if (templateElement) {
      // Generate a unique ID
      const uniqueId = new Date().getTime().toString();

      // Replace the placeholder in the template content and insert it before the target element
      const content = templateElement.innerHTML.replace(new RegExp(this.recordPlaceholderValue || 'NEW_RECORD', 'g'), uniqueId);
      targetElement?.insertAdjacentHTML('beforebegin', content);
    }
  }

  // Function to handle the removal of a nested form
  remove(e: Event) {
    e.preventDefault()

    // Retrieve the wrapper selector from values
    const wrapperSelector = this.wrapperSelectorValue || '.nested-form-wrapper';

    // Find the closest wrapper to the event's target
    const wrapper = (event.target as Element).closest(wrapperSelector);
    if (wrapper?.dataset.newRecord === 'true') {
      wrapper.remove();
    } else {
      wrapper.style.display = 'none';
      // Mark the record for destruction on submit
      const input = wrapper.querySelector("input[name*='_destroy']");
      if (input) input.value = '1';
    }
  }
}
