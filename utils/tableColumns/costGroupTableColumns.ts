import { useI18n } from 'vue-i18n'

export const createColumns = (searchInput: any) => {
  const { t } = useI18n()

  return [
    {
      title: '',
      dataIndex: 'action',
      width: 50,
    },

    {
      title: t('cost_group.code'),
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
      title: t('cost_group.name'),
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
  ]
}
