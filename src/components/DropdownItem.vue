<!--
 * @Author: your name
 * @Date: 2021-09-19 15:30:38
 * @LastEditTime: 2021-09-19 15:48:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/components/DropdownItem.vue
-->
<template>
  <li
    class="dropdown-option"
    :class="{'is-disabled': disabled}"
  >
    <slot></slot>
  </li>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
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
