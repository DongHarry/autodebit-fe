import axios from '@/libs/axios'
import type { IFormContainer, IContainerDelete } from '@/interfaces/container'

export const listContainers = (params: object) =>
  axios.get('/containers', { params })

export const createContainer = (data: IFormContainer) =>
  axios.post('/containers', data)

export const updateContainer = (data: IFormContainer) =>
  axios.put(`/containers/${data.ID}`, data)

export const deleteContainer = (params: IContainerDelete) =>
  axios.delete('/containers', { params })
