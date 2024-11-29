import { Pac } from './pac'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class='pacContainer'>

  </div>
`

new Pac("Lukasz","easy")