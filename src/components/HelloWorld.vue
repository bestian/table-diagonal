<template>
  <div id="vm" v-cloak>
        <div class="container">
            <h3 class="text-center">HTML表格對角線產生器</h3>
            <div class="row pt-2">
                <div class="col-12 px-2 pb-2">
                    <div class="form-inline justify-content-center">
                        <label for="colTitle" class="mb-1 mr-sm-1">欄標題</label>
                        <input type="text" id="colTitle" v-model="colTitle" class="form-control mb-1 mr-sm-1"
                            placeholder="欄標題" />
                        <label for="rowTitle" class="mb-1 mr-sm-1">列標題</label>
                        <input type="text" id="rowTitle" v-model="rowTitle" class="form-control mb-1 mr-sm-1"
                            placeholder="列標題" />
                    </div>
                    <fieldset class="form-inline justify-content-center">
                        <label class="mb-1 mr-sm-1">方向：</label>
                        <div class="form-check mb-1 mr-sm-1" v-for="direction in directions" :key="direction.value">
                            <input class="form-check-input" type="checkbox" :id="'direction-' + direction.value"
                                :value="direction.value" v-model="selectedDirections">
                            <label class="form-check-label" :for="'direction-' + direction.value">
                                {{ direction.name }}
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div class="col-lg border p-2">
                    <h5>範例表格</h5>
                    <div ref="sampleTableWrapper">
                        <table class="diagonal">
                            <thead v-if="showTop">
                                <tr>
                                    <th class="top-left" v-if="selectedDirections.includes('top-left')">
                                        <div class="col-title">{{ colTitle }}</div>
                                        <div class="row-title">{{ rowTitle }}</div>
                                    </th>
                                    <th v-else-if="showLeft"></th>

                                    <th v-for="seq in ['一', '二', '三']" :key="seq">星期{{ seq }}</th>

                                    <th class="top-right" v-if="selectedDirections.includes('top-right')">
                                        <div class="col-title">{{ colTitle }}</div>
                                        <div class="row-title">{{ rowTitle }}</div>
                                    </th>
                                    <th v-else-if="showRight"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x, i) in ['一', '二', '三']" :key="i">
                                    <td v-if="showLeft">第{{ x }}節</td>
                                    <td v-for="(y, j) in ['一', '二', '三']" :key="j">{{ subjects[i * 3 + j] }}</td>
                                    <td v-if="showRight">第{{ x }}節</td>
                                </tr>
                            </tbody>
                            <tfoot v-if="showBottom">
                                <tr>
                                    <th class="bottom-left" v-if="selectedDirections.includes('bottom-left')">
                                        <div class="row-title">{{ rowTitle }}</div>
                                        <div class="col-title">{{ colTitle }}</div>
                                    </th>
                                    <th v-else-if="showLeft"></th>

                                    <th v-for="seq in ['一', '二', '三']" :key="seq">星期{{ seq }}</th>

                                    <th class="bottom-right" v-if="selectedDirections.includes('bottom-right')">
                                        <div class="row-title">{{ rowTitle }}</div>
                                        <div class="col-title">{{ colTitle }}</div>
                                    </th>
                                    <th v-else-if="showRight"></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="col-lg border p-2">
                    <h5>範例HTML</h5>
                    <textarea class="form-control" rows="17" :value="sampleHtml"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data() {
    return {
      borderColor: '#cccccc',
      backgroundColor: '#f3f3f3',
      color: '#333333',
      colTitle: '星期',
      rowTitle: '節次',
      directions: [
          { name: '左上', value: 'top-left' },
          { name: '右上', value: 'top-right' },
          { name: '左下', value: 'bottom-left' },
          { name: '右下', value: 'bottom-right' }
      ],
      selectedDirections: ['top-left'],
      subjects: ['國文', '英文', '數學', '自然', '歷史', '地理', '公民', '體育', '音樂'],
      sampleHtml: ''
    }
  },
  computed: {
    showTop: function () {
        return this.selectedDirections.includes('top-left') || this.selectedDirections.includes('top-right');
    },

    showBottom: function () {
        return this.selectedDirections.includes('bottom-left') || this.selectedDirections.includes('bottom-right');
    },

    showLeft: function () {
        return this.selectedDirections.includes('top-left') || this.selectedDirections.includes('bottom-left');
    },

    showRight: function () {
        return this.selectedDirections.includes('top-right') || this.selectedDirections.includes('bottom-right');
    }
  },
  methods: {
    updateSampleHtml: function () {
        var self = this;

        this.$nextTick(function () {
            var sampleHtml = self.$refs.sampleTableWrapper.innerHTML.innerHTML.replace(/<!---->/g, '').replace(/ data.*?="">/g, '>');
            self.sampleHtml = sampleHtml;
        });
    },
    debounced_updateSampleHtml: function () {
        var self = this;
        this.$nextTick(function () {
        var sampleHtml = self.$refs.sampleTableWrapper.innerHTML.replace(/<!---->/g, '').replace(/ data.*?="">/g, '>');
            self.sampleHtml = sampleHtml + `<style>
table.diagonal {
    width: 100%;
    border-collapse: collapse;
}

table.diagonal th,
table.diagonal td {
    border: 1px solid #cccccc;
    background: #f3f3f3;
    color: #333333;
    text-align: center;
    padding: 5px;
}

table.diagonal th.top-left {
    background: linear-gradient(to top right,
            #f3f3f3 49.5%, #cccccc 49.5%, #cccccc 50.5%,
            #f3f3f3 50.5%);
}

table.diagonal th.top-left>.col-title {
    text-align: right;
}

table.diagonal th.top-left>.row-title {
    text-align: left;
}
</style>`
        });
    }
  },
  mounted: function () {
    var self = this;
    
    var sampleHtml = self.$refs.sampleTableWrapper.innerHTML.replace(/<!---->/g, '').replace(/ data.*?="">/g, '>');
    self.sampleHtml = sampleHtml + `<style>
table.diagonal {
    width: 100%;
    border-collapse: collapse;
}

table.diagonal th,
table.diagonal td {
    border: 1px solid #cccccc;
    background: #f3f3f3;
    color: #333333;
    text-align: center;
    padding: 5px;
}

table.diagonal th.top-left {
    background: linear-gradient(to top right,
            #f3f3f3 49.5%, #cccccc 49.5%, #cccccc 50.5%,
            #f3f3f3 50.5%);
}

table.diagonal th.top-left>.col-title {
    text-align: right;
}

table.diagonal th.top-left>.row-title {
    text-align: left;
}
</style>`;
  },
  watch: {
    borderColor: function () { this.updateSampleHtml(); },
    backgroundColor: function () { this.updateSampleHtml(); },
    color: function () { this.updateSampleHtml(); },
    colTitle: function () { this.debounced_updateSampleHtml(); },
    rowTitle: function () { this.debounced_updateSampleHtml(); },
    selectedDirections: function () { this.updateSampleHtml(); }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table.diagonal {
    width: 100%;
    border-collapse: collapse;
}

table.diagonal th,
table.diagonal td {
    border: 1px solid #cccccc;
    background: #f3f3f3;
    color: #333333;
    text-align: center;
    padding: 5px;
}

table.diagonal th.top-left {
    background: linear-gradient(to top right,
            #f3f3f3 49.5%, #cccccc 49.5%, #cccccc 50.5%,
            #f3f3f3 50.5%);
}

table.diagonal th.top-left>.col-title {
    text-align: right;
}

table.diagonal th.top-left>.row-title {
    text-align: left;
}

</style>