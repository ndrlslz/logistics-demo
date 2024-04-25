import { MessageBox } from 'element-ui'

export const promptUploadResult = ({ result, onError, itemName = '数据', itemUnit = '条' }) => {
  const { message, status } = generateUploadResultMessageAndStatus(result, itemName, itemUnit)
  MessageBox.confirm(`<div id="selectNode" style="color: #ffd500;text-align: center;">${message}</div>`, '', {
    cancelButtonText: '下载错误列表',
    showCancelButton: result.failedRowCount > 0,
    confirmButtonText: '我知道了',
    showConfirmButton: result.failedRowCount === 0,
    dangerouslyUseHTMLString: true,
    closeOnClickModal: false,
    type: status,
  }).catch(onError || (() => {
  }))
}

const generateUploadResultMessageAndStatus = (result, itemName, itemUnit) => {
  let message = ''
  const {
    failedRowCount,
    createdCount,
    updatedCount,
    totalCount,
  } = result
  if (totalCount === 0) {
    message = '上传表格为空数据表格，请补充有效数据后重新上传'
  } else {
    if (createdCount > 0) {
      message += `新增 ${createdCount} ${itemUnit}${itemName}`
    }
    if (updatedCount > 0) {
      message += `${createdCount > 0 ? '<br/>' : ''}修改 ${updatedCount} ${itemUnit}${itemName}`
    }
    if (failedRowCount > 0) {
      message += `<br/>导入失败 ${failedRowCount} 行<span style="color: #fff;margin: 8px 0 0 0;text-align: left;">请下载错误列表，并根据列表中最后一列的错误提示进行更正后再重新导入</span>`
    }
  }
  const status = (failedRowCount === 0 && totalCount > 0) ? 'success' : 'warning'
  return { message, status }
}
