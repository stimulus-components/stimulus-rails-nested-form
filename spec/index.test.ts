/**
 * @jest-environment jsdom
 */

import { Application } from '@hotwired/stimulus'
import NestedForm from '../src/index'

const startStimulus = (): void => {
  const application = Application.start()
  application.register('nested-form', NestedForm)
}

describe('#nestedForm', (): void => {
  beforeEach((): void => {
    startStimulus()

    document.body.innerHTML = `
      <form data-controller="nested-form">
        <template data-nested-form-target="template">
          <div class="nested-form-wrapper" data-new-record="true">
            <label for="NEW_RECORD">New todo</label>
          </div>
        </template>

        <div>
          <label>Your todo</label>
        </div>

        <div data-nested-form-target="target"></div>

        <button type="button" data-action="nested-form#add">Add todo</button>
      </form>
    `
  })

  it('should create new todo', (): void => {
    const target: HTMLElement = document.querySelector("[data-nested-form-target='target']")
    const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form#add']")

    expect(target.previousElementSibling.innerHTML).toContain('Your todo')

    addButton.click()

    expect(target.previousElementSibling.innerHTML).toContain('New todo')
  })
})
