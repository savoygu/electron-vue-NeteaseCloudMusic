<template>
  <vuetable v-bind="$attrs" v-on="$listeners" :api-mode="false" :css="css">
    <!-- <template class="vuetable-td-id" slot="id-slot" slot-scope="props">
      <slot name="id-slot" v-bind="props"></slot>
    </template>
    <template class="vuetable-td-name" slot="name-slot" slot-scope="props">
      <slot name="name-slot" v-bind="props"></slot>
    </template>-->
    <template v-for="slotName in slotColumns" :slot="slotName" slot-scope="props">
      <slot :name="slotName" v-bind="props"></slot>
    </template>
  </vuetable>
</template>

<script>
import Vuetable from 'vuetable-2';

export default {
  name: 'VeTable',

  components: {
    Vuetable
  },

  props: {
    slotColumns: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      css: {
        tableWrapper: 've-table-wrapper',
        tableHeaderClass: 've-table__header',
        tableBodyClass: 've-table__body',
        tableClass: 've-table',
        // loadingClass: '',
        ascendingIcon: 'iconfont icon-chevronup',
        descendingIcon: 'iconfont icon-chevrondown',
        // ascendingClass: '',
        // descendingClass: '',
        sortableIcon: 'iconfont icon-ArtboardCopy',
        // detailRowClass: '',
        // handleIcon: '',
        renderIcon(classes) {
          return `<i class="${classes.join(' ')}"></span>`;
        }
      }
    };
  }
};
</script>

<style lang="scss">
@include b(ve-table) {
  @include e(header) {
    //body
  }

  @include e(body) {
    th,
    td {
      height: 36px;
      line-height: 36px;
      padding: 0 6px;
    }

    thead {
      th {
        color: $--color-text-third !important;

        &:hover {
          background-color: $--color-text-fifth;

          .iconfont {
            display: block;
          }
        }
      }

      .iconfont {
        display: none;
        float: right;
        margin-right: 4px;
        font-size: 10px;
      }
    }

    tbody {
      tr:nth-child(2n -1) {
        background-color: rgba(238, 238, 238, 0.3);
      }

      tr:hover {
        background-color: $--color-text-fifth;
      }
    }
  }
}
</style>