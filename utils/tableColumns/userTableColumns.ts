import { useI18n } from 'vue-i18n'
import type { IRoleFilter } from '~/interfaces/role'

export const createColumns = (searchInput: any, roles: IRoleFilter[]) => {
  const { t } = useI18n()

  return [
    {
      title: '',
      dataIndex: 'action',
      width: '50px',
    },
    {
      title: t('user.name'),
      dataIndex: 'name',
      sorter: true,
      customFilterDropdown: true,
      width: '16%',
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
    },
    {
      title: t('user.email'),
      dataIndex: 'email',
      key: 'email',
      customFilterDropdown: true,
      sorter: true,
      functionSearchSever: 'searchEmail',
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput?.value.focus()
          }, 100)
        }
      },
      width: '16%',
    },
    {
      title: t('user.role'),
      dataIndex: 'role',
      sorter: true,
      width: '16%',
      filters: roles,
    },
    {
      title: t('user.status'),
      dataIndex: 'status',
      filters: [
        { text: 'Không hoạt động', value: '0' },
        { text: 'Hoạt động', value: '1' },
      ],
      sorter: true,
      width: '16%',
    },
    {
      title: t('user.created_at'),
      dataIndex: 'created_at',
      sorter: true,
      width: '16%',
    },
    {
      title: t('user.creator'),
      dataIndex: 'creator_name',
      sorter: true,
      width: '16%',
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
