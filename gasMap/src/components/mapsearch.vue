<template>
    <div class="mapsearch">

    </div>
</template>
<style>
.xxconatiner {
  position: relative;
  padding: 60px 10px
}
.tip {
    background-color: #ddf;
    color: #333;
    border: 1px solid silver;
    box-shadow: 3px 4px 3px 0px silver;
    display: inline-block;

    border-radius: 5px;
    overflow: hidden;
    line-height: 20px;
    z-index: 99;
}
.tip input {
    height: 25px;
    border: 0;
    padding-left: 5px;
    width: 280px;
    border-radius: 3px;
    outline: none;
}
</style>

<template>
<div class="xxconatiner">
  <custom-search @select="select">
  </custom-search>
</div>
</template>

<script>
const customSearch = VueAMap.createCustomComponent({
  template: `<div class="tip">
    <input class="custom-componet-input" :id="id" />
  </div>`,
  data() {
    return {
      id: `custom-componet-input-${Math.random()}`
    }
  },
  contextReady(_options) {
    const options = {
      ..._options,
      input: this.id
    }
    AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'], () => {
      const autocomplete = new AMap.Autocomplete(options)
      AMap.event.addListener(autocomplete, 'select', (e) => {
        this.$emit('select', e.poi)
      })
      this.$amapComponent = autocomplete
    })
  }
})
module.exports = {
  components: {customSearch},
  methods: {
    select(poi) {
      console.log(poi)
    }
  }
}
</script>
</script>
<style scoped>

</style>
