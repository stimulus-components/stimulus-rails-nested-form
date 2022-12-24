import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'netlify') {
    return {}
  }

  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'StimulusRailsNestedForm',
        fileName: 'stimulus-rails-nested-form'
      },
      rollupOptions: {
        external: ['@hotwired/stimulus'],
        output: {
          globals: {
            '@hotwired/stimulus': 'Stimulus'
          }
        }
      }
    }
  }
})
