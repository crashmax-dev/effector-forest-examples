import { createEvent, createStore, sample } from 'effector'
import { using, h } from 'forest'
import './style.css'

const app = document.querySelector<HTMLElement>('#app')!

using(app, () => {
  const $title = createStore('hello')

  const changed = createEvent<Event>()
  const submited = createEvent<MouseEvent>()

  $title.on(changed, (state, event) => {
    return (event.target as HTMLInputElement).value
  })

  sample({
    source: $title,
    clock: changed,
    fn: (title) => console.log('title:', title)
  })

  sample({
    source: $title,
    clock: submited,
    fn: (title) => alert(title)
  })

  h('div', () => {
    h('h1', { text: $title })
    h('input', {
      attr: { type: 'text', value: $title },
      handler: { input: changed }
    })
    h('button', {
      text: 'Submit',
      handler: { click: submited },
      visible: $title.map((title) => title.length >= 10)
    })
  })
})
