import { useI18n } from 'vue-i18n'
import { CARRIER_TYPE } from '@/constants/carrier'

export const createColumns = (searchInput: any) => {
  const { t } = useI18n()

  return [
    {
      title: '',
      dataIndex: 'action',
      width: 50,
    },

    {
      title: t('carrier.code'),
      dataIndex: 'code',
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
      title: t('carrier.name'),
      dataIndex: 'name',
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
      title: t('carrier.address'),
      dataIndex: 'address',
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
      title: t('carrier.type'),
      dataIndex: 'type',
      customRender: ({ record }: { record: any }) => {
        if (record.type === CARRIER_TYPE.TRAIN) {
          return t('carrier.train')
        }

        return t('carrier.airplane')
      },
      sorter: true,
      width: 250,
      filters: [
        { text: t('carrier.train'), value: CARRIER_TYPE.TRAIN },
        { text: t('carrier.airplane'), value: CARRIER_TYPE.AIRPLANE },
      ],
    },
  ]
}
