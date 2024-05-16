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
      title: t('location.code'),
      dataIndex: 'Code',
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
      title: t('location.name'),
      dataIndex: 'Location',
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
      title: t('common.address'),
      dataIndex: 'Address',
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
      title: t('common.country'),
      dataIndex: 'country',
      customRender: ({ record }: { record: any }) => record?.country?.name,
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
      customRender: ({ record }: { record: any }) => record?.province?.name,
      width: 280,
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
      title: t('common.district'),
      dataIndex: 'district',
      customRender: ({ record }: { record: any }) => record?.district?.name,
      width: 320,
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
      title: t('common.longitude'),
      dataIndex: 'Lng',
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
      title: t('common.latitude'),
      dataIndex: 'Lat',
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
      title: t('location.address_type'),
      dataIndex: 'type',
      customRender: ({ record }: { record: any }) => record?.type?.name,
      width: 300,
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
      title: t('user.creator'),
      dataIndex: 'creator_name',
      width: 2250,
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
      width: 950,
      sorter: true,
    },
  ]
}
