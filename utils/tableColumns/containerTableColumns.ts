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
      title: t('container.code'),
      dataIndex: 'Code',
      sorter: true,
      width: '20%',
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
      title: t('container.name'),
      dataIndex: 'PackingName',
      sorter: true,
      width: '20%',
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
      title: t('container.width'),
      dataIndex: 'Width',
      sorter: true,
      width: '20%',
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
      title: t('container.height'),
      dataIndex: 'Height',
      sorter: true,
      width: '20%',
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
      title: t('container.length'),
      dataIndex: 'Length',
      sorter: true,
      width: '20%',
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
