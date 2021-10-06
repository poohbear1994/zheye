<!--
 * @Author: your name
 * @Date: 2021-09-19 15:30:38
 * @LastEditTime: 2021-10-06 15:02:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/components/DropdownItem.vue
-->
<template>
  <li
    class="dropdown-option"
    :class="{'is-disabled': disabled}"
    @click="handleItemClick"
  >
    <slot></slot>
  </li>
</template>
<script>
import { defineComponent } from 'vue'
import { emitter } from './Dropdown.vue'
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    closeAfterClick: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const handleItemClick = (e) => {
      emitter.emit('dropdown-item-clicked', { e, props })
    }
    return {
      handleItemClick
    }
  }
})
</script>

<style>
  .dropdown-option.is-disabled * {
    color: #6c757d;
    pointer-events: none;
    background-color: transparent;
  }
</style>
