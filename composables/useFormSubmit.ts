import _mapValues from 'lodash/mapValues'

interface useFormSubmitOptions {
  formRef: any
  apiSubmit: Function
  formState: object
  emit?: Function
  callbackSuccess?: Function
}

const validateError = 422
const allServerErrorStatus = [402, 401, 503, 500, 404, 422, 400]

export function useFormSubmit({
  formRef,
  apiSubmit,
  formState,
  emit,
  callbackSuccess,
}: useFormSubmitOptions) {
  const loading = ref(false)
  const serverErrors = ref<any>({})
  const serverErrorMessage = ref()
  const apiSubmitBuffer = ref(apiSubmit)

  const collectServerError = (errors: any) => {
    return _mapValues(errors, '0')
  }

  const handleError = (error: any) => {
    if (error.data.status_code === validateError) {
      serverErrors.value = collectServerError(error.data.data)
      return
    }

    throw new Error('Error when submit')
  }

  const submit = async () => {
    try {
      loading.value = true

      if (formRef.value) {
        await formRef.value.validate()
      }

      const { data: response } = await apiSubmitBuffer.value(toRaw(formState))

      if (response.status_code === validateError) {
        handleError(response)
      }

      if (emit && !allServerErrorStatus.includes(response.status_code)) {
        emit('saved', response.data)
      }

      if (callbackSuccess) {
        callbackSuccess()
      }

      return response
    } catch (err: any) {
      if (allServerErrorStatus.includes(err.data.status_code)) {
        handleError(err)
      }
    } finally {
      loading.value = false
    }
  }

  const changeApiSubmit = (apiSubmitChange: Function) => {
    apiSubmitBuffer.value = apiSubmitChange
  }

  const fieldChange = (inputName: string) => {
    serverErrors.value[inputName] = null
  }

  const resetForm = () => {
    formRef.value.resetFields()
    serverErrorMessage.value = null
    serverErrors.value = {}
  }

  return {
    loading,
    serverErrors,
    submit,
    changeApiSubmit,
    fieldChange,
    resetForm,
  }
}
