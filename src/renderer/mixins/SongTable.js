import _ from 'lodash';

export default {
  data() {
    return {
      fields: [
        { name: 'id', title: '' },
        {
          name: 'starred',
          title: '',
          formatter(value) {
            return value
              ? '<i class="is-starred iconfont icon-xindong-2"></i>'
              : '<i class="iconfont icon-xindong-1"></i>';
          }
        },
        {
          name: 'downloaded',
          title: '',
          formatter(value) {
            return value
              ? '<i class="is-downloaded iconfont icon-correct"></i>'
              : '<i class="iconfont icon-xiazai"></i>';
          }
        },
        {
          name: 'name',
          title: '音乐标题',
          sortField: 'name',
          formatter(value) {
            return `<span>${value}</span><i class="iconfont icon-more"></i>`;
          }
        },
        { name: 'singer', title: '歌手', sortField: 'singer' },
        { name: 'album', title: '专辑', sortField: 'album' },
        { name: 'duration', title: '时长', sortField: 'duration' }
      ],
      sortOrder: [],
      lastSortField: '',
      lastDirection: ''
    };
  },

  methods: {
    dataManager(sortOrder) {
      if (this.songs.length < 1) return false;

      let local = this.songs;

      if (sortOrder.length > 0) {
        const sortField = sortOrder[0].sortField;
        let direction = sortOrder[0].direction;

        if (sortField === this.lastSortField && this.lastDirection === 'desc') {
          direction = 'none';
          this.sortOrder = [];
        } else {
          local = _.orderBy(local, sortField, direction);
        }

        this.lastSortField = sortField;
        this.lastDirection = direction;
      }

      return {
        data: local
      };
    },
    handleCellClicked({ field, event }) {
      if (field.name !== 'name') return;
      if (event.target.tagName !== 'I') return;
      console.log(event.target.tagName); // eslint-disable-line
    },
    handleCellRightClicked({ data, event, field, index }) {
      console.log(data, event, field, index); // eslint-disable-line
    },
    showLoader() {},
    hideLoader() {}
  }
};
