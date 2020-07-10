import {installer, Resource} from 'vrf'
import * as components from './components'


_components = {...components}

delete _components.AutocompleteProvider

export default installer(_components)

export {
  Resource
  AutocompleteProvider
}