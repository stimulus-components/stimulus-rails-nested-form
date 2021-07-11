import { Application } from 'stimulus'
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
        <template data-nested-form-target="template" data-model-template="todo">
          <div class="nested-form-wrapper" data-new-record="true">
            <label for="NEW_RECORD">New todo</label>
          </div>
        </template>

        <template data-nested-form-target="template" data-model-template="note">
          <div class="nested-form-wrapper" data-new-record="true">
            <label for="NEW_RECORD">New note</label>
          </div>
        </template>

        <div>
          <label>Your todo</label>
        </div>

       <div id="nested-form-target-todo" data-nested-form-target="target" data-model-target="todo"></div>
       <button type="button" data-action="nested-form#add" data-model="todo" class="nested-form-action">Add todo</button>

        <div>
          <label>Your note</label>
        </div>

       <div id="nested-form-target-note" data-nested-form-target="target" data-model-target="note"></div>

       <button type="button" data-action="nested-form#add" data-model="note" class="nested-form-action">Add note</button>
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

  it('should toggle with many nested forms', (): void => {
    const todoButton: HTMLButtonElement = document.querySelector('[data-model="todo"]')
    const todoTarget: HTMLElement = document.querySelector('#nested-form-target-todo')
    const noteButton: HTMLButtonElement = document.querySelector('[data-model="note"]')
    const noteTarget: HTMLElement = document.querySelector('#nested-form-target-note')

    expect(todoTarget.previousElementSibling.innerHTML).toContain('Your todo')
    todoButton.click()
    expect(todoTarget.previousElementSibling.innerHTML).toContain('New todo')

    expect(noteTarget.previousElementSibling.innerHTML).toContain('Your note')
    noteButton.click()
    expect(noteTarget.previousElementSibling.innerHTML).toContain('New note')
  })
})
