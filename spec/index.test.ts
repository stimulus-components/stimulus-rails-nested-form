/**
 * @jest-environment jsdom
 */

import { Application } from "@hotwired/stimulus"
import RailsNestedForm from "../src/index"

const startStimulus = (): void => {
  const application = Application.start()
  application.register("nested-form", RailsNestedForm)
}

describe("#nestedForm", (): void => {
  beforeEach((): void => {
    startStimulus()

    document.body.innerHTML = `
      <form data-controller="nested-form">
        <template data-nested-form-target="template">
          <div class="nested-form-wrapper" data-new-record="true">
            <label for="NEW_RECORD">New todo</label>
          </div>
        </template>

        <template data-nested-form-target="template" data-template-name="todo_with_deadline">
          <div class="nested-form-wrapper" data-new-record="true">
            <label for="NEW_RECORD">New todo with deadline</label>
          </div>
        </template>

        <div>
          <label>Your todo</label>
        </div>

        <div data-nested-form-target="target"></div>

        <button type="button" data-action="nested-form#add" data-template-name="todo_with_deadline">Add todo</button>
      </form>
    `
  })

  it("should create new todo", (): void => {
    const target: HTMLElement = document.querySelector("[data-nested-form-target='target']")
    const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form#add']")

    expect(target.previousElementSibling.innerHTML).toContain("Your todo")

    addButton.click()

    expect(target.previousElementSibling.innerHTML).toContain("New todo")
  })

  it("should create new todo with custom template", (): void => {
    const target: HTMLElement = document.querySelector("[data-nested-form-target='target']")
    const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form#add'][data-template-name='todo_with_deadline']")

    expect(target.previousElementSibling.innerHTML).toContain("Your todo")

    addButton.click()

    expect(target.previousElementSibling.innerHTML).toContain("New todo with deadline")
  })

  it("should dispatch events", (): void => {
    const controllerElement: HTMLButtonElement = document.querySelector("[data-controller='nested-form']")
    const addButton: HTMLButtonElement = document.querySelector("[data-action='nested-form#add']")

    // @ts-ignore
    jest.spyOn(global, "CustomEvent").mockImplementation((type: string, eventInit?: any) => ({ type, eventInit }))
    const mockDispatchEvent = jest.spyOn(controllerElement, "dispatchEvent").mockImplementation(() => true)

    addButton.click()

    expect(mockDispatchEvent).toHaveBeenCalledWith({
      type: "rails-nested-form:add",
      eventInit: {
        bubbles: true,
      },
    })
  })
})
