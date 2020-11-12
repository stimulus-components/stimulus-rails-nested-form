# Stimulus Rails Nested Form

[![](https://img.shields.io/npm/dt/stimulus-rails-nested-form.svg)](https://www.npmjs.com/package/stimulus-rails-nested-form)
[![](https://img.shields.io/npm/v/stimulus-rails-nested-form.svg)](https://www.npmjs.com/package/stimulus-rails-nested-form)
[![](https://github.com/stimulus-components/stimulus-rails-nested-form/workflows/Lint/badge.svg)](https://github.com/stimulus-components/stimulus-rails-nested-form)
[![](https://github.com/stimulus-components/stimulus-rails-nested-form/workflows/Test/badge.svg)](https://github.com/stimulus-components/stimulus-rails-nested-form)
[![](https://img.shields.io/github/license/stimulus-components/stimulus-rails-nested-form.svg)](https://github.com/stimulus-components/stimulus-rails-nested-form)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c21b3ca7-40fa-4de3-aad5-56dbc343ace6/deploy-status)](https://stimulus-rails-nested-form.netlify.com)

## Getting started

A Stimulus controller to create new fields on the fly to populate your Rails relationship with `accepts_nested_attributes_for`.

[Nested attributes](https://apidock.com/rails/ActiveRecord/NestedAttributes/ClassMethods) allow you to save attributes on associated records through the parent.

## Installation

```bash
$ yarn add stimulus-rails-nested-form
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import NestedForm from "stimulus-rails-nested-form"

const application = Application.start()
application.register("nested-form", NestedForm)
```

## Usage

In your models:
```ruby
class User < ApplicationRecord
  has_many :todos
  accepts_nested_attributes_for :todos, reject_if: :all_blank, allow_destroy: true
end

class Todo < ApplicationRecord
  belongs_to :user
end
```

In your controller:
```ruby
class UsersController < ApplicationController
  def update
    if user.update(user_params)
      redirect_to users_path
    else
      render :edit
    end
  end

  private

  def user_params
    params
      .require(:user)
       .permit(
         todos_attributes: [:id, :_destroy, :description]
       )
  end
end
```

To DRY up the code, we extract the fields in a partial called `todo_form` to use it in the [template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) with a new `Todo` and in the default `fields_for`.

In your view:
```html
<%= form_with model: @user, data: { controller: 'nested-form', nested_form_wrapper_selector: '.nested-form-wrapper' } do |f| %>
  <template data-target="nested-form.template">
    <%= f.fields_for :todos, Todo.new, child_index: 'NEW_RECORD' do |todo_fields| %>
      <%= render "todo_form", f: todo_fields %>
    <% end %>
  </template>

  <%= f.fields_for :todos do |todo_fields| %>
    <%= render "todo_form", f: todo_fields %>
  <% end %>

  <!-- Inserted elements will be injected before that target. -->
  <div data-target="nested-form.target"></div>

  <button type="button" data-action="nested-form#add">
    Add todo
  </button>

  <%= f.submit 'Save todos' %>
<% end %>
```

In the `_todo_form.html.erb` partial:
```html
<div class="nested-form-wrapper" data-new-record="<%= f.object.new_record? %>">
  <%= f.label :description %>
  <%= f.text_field :description %>

  <button type="button" data-action="nested-form#remove">
    Remove todo
  </button>

  <%= f.hidden_field :_destroy %>
</div>
```

As explained in the [documentation](https://apidock.com/rails/ActionView/Helpers/FormHelper/fields_for), we need to specify the `child_index` and replace its value in JavaScript because the index needs to be unique for each fields.

## Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-nested-form-wrapper-selector` | `.nested-form-wrapper` | Selector to find the wrapper. | ✅ |

The remove feature is completely optional.

## Extending Controller

You can use inheritance to extend the functionality of any Stimulus component:

```js
import NestedForm from "stimulus-rails-nested-form"

export default class extends NestedForm {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```

These controllers will automatically have access to targets defined in the parent class.

If you override the `connect`, `disconnect` or any other methods from the parent, you'll want to call `super.method()` to make sure the parent functionality is executed.

## Development

### Project setup
```bash
$ yarn install
$ yarn dev
```

### Tests

[Jest](https://jestjs.io/) and [Puppeteer](https://github.com/puppeteer/puppeteer) are responsible to test this component:
```bash
$ yarn test
```

### Linter
[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are responsible to lint and format this component:
```bash
$ yarn lint
$ yarn format
```

## Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
