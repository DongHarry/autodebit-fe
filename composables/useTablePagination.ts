import {ref, computed, type ComputedRef} from 'vue'
import { usePagination } from 'vue-request'
import { get, isEmpty } from 'lodash'
import {ComputedRefImpl} from "@vue/reactivity";

interface UseTablePaginationOptions {
  apiGetList: (params: object) => Promise<any>
  initialPageSize?: number
  initialPage?: number
  columns?: object[]|ComputedRef<any>|any
}

export function useTablePagination({
  apiGetList,
  columns = [],
  initialPageSize = 10,
  initialPage = 1,
}: UseTablePaginationOptions) {
  const filterBuffer = ref()
  const convertOrderForUrl = (sorter: any) => {
    const orders: any = {}
    if (!isEmpty(sorter)) {
      orders[sorter.field] = sorter.order.replace('end', '')
    }

    return orders
  }

  const convertCustomSearchForUrl = (filters: any) => {
    const search: any = {}

    const columnData = columns.value ? columns.value : columns

    for (const filter in filters) {
      const customerSearch = columnData.find(
        (column: any) =>
          column.dataIndex === filter && column.customFilterDropdown,
      )

      if (customerSearch && filters[filter]) {
        search[filter] = filters[filter][0]
        continue
      }

      search[filter] = filters[filter]
    }
    return search
  }

  const { data, loading, run, total, current, pageSize } = usePagination(
    apiGetList,
    {
      defaultParams: [{ page: initialPage, per_page: initialPageSize }],
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'per_page',
        totalKey: 'data.data.total',
      },
    },
  )

  const dataSource = computed(() => get(data, 'value.data.data.data'))

  const pagination = computed(() => {
    return {
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
      showSizeChanger: true,
    }
  })

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    const newParams = {
      page: newPagination.current,
      per_page: newPagination.pageSize,
      orders: convertOrderForUrl(sorter),
    }

    const filterConverted = convertCustomSearchForUrl(filters)
    filterBuffer.value = { ...newParams, ...filterConverted }
    run(filterBuffer.value)
  }

  const reload = () => {
    run(filterBuffer.value)
  }

  return {
    dataSource,
    pagination,
    loading,
    handleTableChange,
    reload,
  }
}
