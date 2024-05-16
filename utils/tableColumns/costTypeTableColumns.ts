import { useI18n } from 'vue-i18n'
import { type ICostGroupFilter } from '~/interfaces/costGroup'

export const createColumns = (
  searchInput: any,
  costGroups: ICostGroupFilter[],
) => {
  const { t } = useI18n()

  return [
    {
      title: '',
      dataIndex: 'action',
      width: 50,
    },

    {
      title: t('cost_type.code'),
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
      title: t('cost_type.name'),
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
      title: t('cost_type.cost_group_name'),
      dataIndex: 'cost_group_name',
      key: 'cost_group',
      sorter: true,
      width: 250,
      filters: costGroups,
    },
  ]
}
