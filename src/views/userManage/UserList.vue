<template>
  <div class="home">
    <TableComponent
      :loading="loading"
      codetype="aaaa"
      codeTcp="bbb"
      :tableConfig="tableConfig"
      :tableData="tableData"
      @toAdd="toAdd"
      @toEdit="toEdit"
      @toDel="toDel"
      @setFilter="toSetTdata"
      @selectionChange="selectionChange"
    />
  </div>
</template>

<script>
import tableMixins from '@/components/tableMixins'
import TableComponent from '@/components/TableComponent'
import { delay } from 'q'
import { testGet1 } from '@/api/index'
import { mapGetters } from 'vuex'
import { authList } from '@/config/authConfig'
export default {
  name: 'home',
  mixins: [tableMixins],
  components: { TableComponent },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['ISLOGIN']),
    tableConfig() {
      let btnList = []
      if (authList['admin_user_add']) {
        btnList.push({
          name: 'addBtn',
          text: '新增',
          icon: 'el-icon-plus',
          style: 'primary',
          class: 'addBtn',
          func: 'toAdd'
        })
      }
      if (authList['admin_user_multidel']) {
        btnList.push({
          name: 'multiDelBtn',
          text: '批量删除',
          icon: 'el-icon-delete',
          style: 'danger',
          class: 'multiDel',
          func: 'toMultiDel'
        })
      }
      return {
        btnList,
        showFilter: authList['admin_user_department_filter'],
        filterOptions: [],
        showDatePick: authList['admin_user_timepicker']
      }
    },
    operateConfig() {
      return {
        optType: {
          toEdit: {
            event: 'toEdit',
            text: '编辑',
            type: 'primary'
          },
          toDel: {
            event: 'toDel',
            text: '删除',
            type: 'danger'
          }
        },
        optFunc: function(row) {
          let arr = []
          authList['admin_user_edit'] && arr.push('toEdit')
          if (row.status === 'offline') {
            authList['admin_user_delete'] && arr.push('toDel')
          }
          return arr
        }
      }
    }
  },
  created() {
    this.toSetTdata()
    this.toTestApi()
  },
  mounted() {
    console.log(this.ISLOGIN, '测试vuex状态')
  },
  methods: {
    async toTestApi() {
      let res = {}
      res = await testGet1({ id: 1 })
      if (res) {
        console.log(res)
      }
    },
    async toSetTdata(params) {
      let that = this
      let res = {}
      that.searchCondition = Object.assign(that.searchCondition, params)
      console.log(that.searchCondition)
      that.loading = true
      await delay(500) // 模拟请求异步延时
      res = {
        tbody: [
          { id: '810000199002137628', name: '邓磊', age: 23, address: '勐海县', status: 'offline', email: 'y.rbuuy@ndtccqms.lv', createdTime: 1560218008 },
          { id: '650000197210064188', name: '蔡刚', age: 26, address: '四方台区', status: 'online', email: 'r.ifypqovuzl@rcvfhg.ir', createdTime: 1500078008 },
          { id: '450000199109254165', name: '蔡明', age: 22, address: '其它区', status: 'online', email: 'z.rbq@uqadfyx.ee', createdTime: 1260078008 },
          { id: '440000198912192761', name: '曹明', age: 25, address: '其它区', status: 'online', email: 'h.mkmqo@dcj.ee', createdTime: 1260078008 },
          { id: '310000198807038763', name: '侯静', age: 21, address: '莱城区', status: 'offline', email: 'u.xlkda@ckoicbhk.br', createdTime: 1560078008 },
          { id: '310000198406163029', name: '谭涛', age: 29, address: '闸北区', status: 'offline', email: 'r.wyr@hmqqlafes.no', createdTime: 1500078008 },
          { id: '220000199605161598', name: '罗秀兰', age: 27, address: '其它区', status: 'online', email: 'd.eggqvlbol@crqodjvdys.nu', createdTime: 1560078008 },
          { id: '37000019810301051X', name: '黎敏', age: 27, address: '其它区', status: 'online', email: 's.unumfugq@qgeufl.om', createdTime: 1560078008 },
          { id: '440000201411267619', name: '黄强', age: 24, address: '合浦县', status: 'offline', email: 'q.ufollx@kdvgtb.al', createdTime: 1560218008 },
          { id: '440000200504038626', name: '叶艳', age: 25, address: '大渡口区', status: 'offline', email: 'h.trtiurcut@vnypp.sm', createdTime: 1560078008 }
        ],
        thead: [
          {
            prop: 'name',
            label: '用户姓名',
            minWidth: '100',
            formatType: 'link'
          },
          {
            prop: 'age',
            label: '年龄',
            sortable: 'custom',
            minWidth: '92'
          },
          {
            prop: 'address',
            label: '家庭住址',
            minWidth: '130'
          },
          {
            prop: 'status',
            label: '账号状态',
            minWidth: '100',
            formatFn: 'formatAccountStatus',
            formatType: 'dom'
          },
          {
            prop: 'email',
            label: '邮箱地址',
            minWidth: '134'
          },
          {
            prop: 'createdTime',
            label: '添加时间',
            minWidth: '128',
            formatFn: 'timeFormat'
          },
          {
            prop: 'operation',
            label: '操作',
            minWidth: '120'
          }
        ],
        pageInfo: { page: 1, size: 10, total: 135 },
        isMulti: true
      }
      that.afterListSet(res)
    },
    toDel(row) {
      console.log(`删除${row.name}`)
    },
    toAdd() {
      this.$router.push({ name: 'admin_user_add' })
    },
    toEdit(row) {
      this.$router.push({ name: 'admin_user_edit', params: { id: row.id } })
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 20px;
}
</style>
