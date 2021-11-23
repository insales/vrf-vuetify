
<script lang="coffee">

import Spinner from './spinner'

export default {
  vrfParent: 'form'
  render: (h) ->
    return @$slots.default[0] if @pathService && @$slots.default

    formChild =
      if @auto && @$fetching || !@$resource
        [h(Spinner, null) ]
        # [
        #   h('v-progress-circular', props: { size: 70, width: 7, indeterminat: true}, class: { 'vrf-progress': true})
        # ]
      else
        @$slots.default || @$scopedSlots.default()
    
    h('form', on: { submit: (e) -> e.preventDefault() }, formChild)
}

</script>

<style lang="css">
.vrf-progress{
  display: block !important;
  margin: 0 auto !important;

}
</style>