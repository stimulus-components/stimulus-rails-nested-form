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

describe('#nestedForm tables', (): void => {
  beforeEach((): void => {
    startStimulus()

    document.body.innerHTML = `
      <form data-controller="nested-form" data-nested-form-position-value="beforeend">
        <template data-nested-form-target="template">
          <tr class="nested-form-wrapper" data-new-record="true">
            <td>New todo</td>
          </div>
        </template>

        <table>
          <thead>
            <tr>
              <th>Todo</th>
            </tr>
          </thead>
          <tbody data-nested-form-target="target">
            <tr>
              <td>Your todo</td>
            </tr>
          </tbody>
        </table>

        <button type="button" data-action="nested-form#add">Add todo</button>
      </form>
    `
  })

  it('should add new todo to end of table body', (): void => {
    const target: HTMLElement = document.querySelector("[data-nested-form-target='target']")
    const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form#add']")

    // @ts-ignore
    expect(target.lastElementChild.innerHTML.trim()).toContain('<td>Your todo</td>')

    addButton.click()

    expect(target.lastElementChild.innerHTML).toContain('<td>New todo</td>')
  })
})
