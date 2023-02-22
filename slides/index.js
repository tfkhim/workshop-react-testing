import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm'
import RevealNotes from 'reveal.js/plugin/notes/notes.esm'

import 'reveal.js/dist/reset.css'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
import 'reveal.js/plugin/highlight/monokai.css'
import './styles.css'

Reveal.initialize({
  hash: true,
  plugins: [Markdown, RevealHighlight, RevealNotes],
})
