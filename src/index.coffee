import {installer, Resource} from 'vrf'
import * as components from './components'
import AutocompleteProvider from './autocomplete-provider'


_components = {...components}

delete _components.AutocompleteProvider

export default installer(_components)

export {
  Resource
  AutocompleteProvider
}