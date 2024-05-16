import { useI18n } from 'vue-i18n'

export const createColumns = (searchInput: any) => {
  const { t } = useI18n()

  return [
    {
      title: '',
      dataIndex: 'action',
      width: '50px',
    },
    {
      title: t('transport_type.code'),
      dataIndex: 'code',
      key: 'code',
      sorter: true,
      customFilterDropdown: true,
      width: '25%',
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },
    {
      title: t('transport_type.name'),
      dataIndex: 'name',
      key: 'name',
      customFilterDropdown: true,
      sorter: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
      width: '25%',
    },
    {
      title: t('transport_type.type'),
      dataIndex: 'type',
      filters: [
        { text: 'FCL', value: 'FCL' },
        { text: 'LCL', value: 'LCL' },
      ],
      sorter: true,
      width: '25%',
    },
    {
      title: t('transport_type.note'),
      dataIndex: 'note',
      key: 'note',
      customFilterDropdown: true,
      sorter: true,
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
      width: '25%',
    },
  ]
}
