import * as components from './components'
import AutocompleteProvider from './autocomplete-provider'
import Spinner from './components/spinner'

_components = {...components}

delete _components.AutocompleteProvider

export default {
  name: 'vrf-vuetify'
  components
  install: (Vue) ->
    Vue::VueResourceForm.loader = Spinner
}

export {
  AutocompleteProvider
}