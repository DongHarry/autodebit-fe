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
      title: t('package_unit.code'),
      dataIndex: 'Code',
      key: 'code',
      sorter: true,
      customFilterDropdown: true,
      width: '50%',
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },
    {
      title: t('package_unit.name'),
      dataIndex: 'Name',
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
      width: '50%',
    },
  ]
}
