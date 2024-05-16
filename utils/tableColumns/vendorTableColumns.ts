import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type { IVendor } from '~/interfaces/vendor'
import { formatDateTime } from '~/utils/datetime'

export const createColumns = (searchInput: any) => {
  const { t } = useI18n()

  const columns = computed( () => [
    {
      title: '',
      dataIndex: 'action',
      width: 50,
    },

    {
      title: t('vendor.code'),
      dataIndex: 'customer_code',
      sorter: true,
      width: 250,
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },
    {
      title: t('vendor.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      width: 250,
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },
    {
      title: t('common.short_name'),
      dataIndex: 'short_name',
      width: 250,
      sorter: true,
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },
    {
      title: t('common.address'),
      dataIndex: 'address',
      width: 250,
      sorter: true,
    },

    {
      title: t('common.country'),
      dataIndex: 'country',
      customRender: ({ record }: { record: IVendor }) => record.country.name,
      width: 250,
      sorter: true,
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },
    {
      title: t('common.province'),
      dataIndex: 'province',
      customRender: ({ record }: { record: IVendor }) => record.province.name,
      width: 250,
      sorter: true,
    },

    {
      title: t('common.phone_number'),
      dataIndex: 'phone_number',
      width: 250,
      sorter: true,
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },

    {
      title: t('common.creator'),
      dataIndex: 'creator_name',
      width: 250,
      sorter: true,
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },

    {
      title: t('common.created_at'),
      dataIndex: 'created_at',
      customRender: ({ record }: { record: IVendor }) =>
          formatDateTime(record.created_at),
      width: 250,
      sorter: true,
    },
    {
      title: t('common.editor'),
      dataIndex: 'editor_name',
      width: 250,
      sorter: true,
      customFilterDropdown: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },

    {
      title: t('common.updated_at'),
      dataIndex: 'created_at',
      customRender: ({ record }: { record: IVendor }) =>
          formatDateTime(record.updated_at),
      width: 250,
      sorter: true,
    }
  ])

  return columns
}
