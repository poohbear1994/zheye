/*
 * @Author: your name
 * @Date: 2021-10-04 13:24:30
 * @LastEditTime: 2021-10-04 13:56:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/helper.ts
 */
import { ColumnProps } from './store'
export function generateFitUrl (column: ColumnProps, width: number, height: number) {
  if (column.avatar) {
    column.avatar.fitUrl = column.avatar.url + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
  } else {
    column.avatar = {
      fitUrl: require('@/assets/column.png')
    }
  }
}

interface CheckCondition {
  format?: string[];
  size?: number;
}
type ErrorType = 'size' | 'format' | null
export function beforeUploadCheck (file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidSize && isValidFormat,
    error
  }
}
