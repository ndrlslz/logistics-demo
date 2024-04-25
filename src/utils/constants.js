export const IOT_TOOLBOX_TOKEN_KEY = 'iot-toolbox-token'

export const SECRET = 'secret'

const DISTRIBUTOR_STYLE = {
  name: 'large',
}
const FACTORY_STYLE = {
  name: 'large',
  createdDate: 'small',
  domain: 'small',
  address: 'large',
  factoryContacts: 'large',
  status: 'small',
}
const EQUIPMENT_STYLE = {
  name: 'large',
  createdDate: 'small',
  installDate: 'small',
}
const LUBRICANT_POINT_STYLE = {
  lubricantPart: 'large',
  type: 'small',
  product: 'large',
  schedule: 'special',
}
const MAINTENANCE_RECORD_STYLE = {
  maintenanceType: 'small',
  createdDate: 'small',
  date: 'small',
  product: 'large',
  temperature: 'small',
  isReachStandard: 'small',
  color: 'small',
  pressure: 'small',
}

export const EQUIPMENT_SCHEMAS_SORT = ['distributor', 'factory', 'equipment', 'lubricantPoint']
export const EQUIPMENT_SCHEMAS_ORDER = {
  distributor: ['name'],
  factory: [
    'name', 'createdDate', 'domain', 'address',
    'factoryContacts', 'mainEquipmentType', 'totalOilVolume',
    'defaultRoleForNewUser', 'status', 'comment',
    'businessRegistrationName', 'taxPayerId', 'yingkeFactoryName', 'yingkeFactoryNo',
  ],
  equipment: [
    'name', 'number', 'workshop', 'createdDate',
    'unicode', 'installDate', 'manufacturer', 'model',
    'description', 'maintenanceCount',
  ],
  lubricantPoint: [
    'lubricantPart', 'nickname', 'createdDate', 'volume',
    'type', 'brand', 'product', 'schedule', 'latestChangeOilDate',
    'nextChangeOilDate', 'filterType', 'remark',
  ],
}
export const EQUIPMENT_FIX_HEADER = {
  distributor: { name: true },
  factory: {
    name: true,
  },
  equipment: {
    name: true,
    number: true,
  },
  lubricantPoint: {
    lubricantPart: true,
    volume: true,
    type: true,
    brand: true,
    product: true,
  },
}
export const EQUIPMENT_STYLE_CLASS = {
  distributor: DISTRIBUTOR_STYLE,
  factory: FACTORY_STYLE,
  equipment: EQUIPMENT_STYLE,
  lubricantPoint: LUBRICANT_POINT_STYLE,
}

export const SHELL_EQUIPMENT_STORAGE_HEADER = 'SHELL_EQUIPMENT_STORAGE_HEADER'

export const MAINTENANCE_SCHEMAS_SORT = ['distributor', 'factory', 'equipment', 'maintenanceRecord']
export const MAINTENANCE_SCHEMAS_ORDER = {
  distributor: ['name'],
  factory: [
    'name', 'createdDate', 'domain', 'address',
    'factoryContacts', 'mainEquipmentType', 'totalOilVolume',
    'defaultRoleForNewUser', 'status', 'comment',
    'businessRegistrationName', 'taxPayerId', 'yingkeFactoryName', 'yingkeFactoryNo',
  ],
  equipment: [
    'name', 'number', 'workshop', 'createdDate',
    'unicode', 'installDate', 'manufacturer', 'model',
    'description',
  ],
  maintenanceRecord: [
    'maintenanceType', 'maintenanceContent', 'createdUser', 'createdDate', 'customerRecord', 'updatedUser', 'updateDate', 'date', 'warning', 'warningHandled',
    'lubricantPart', 'brand', 'product', 'volume',
    'temperature', 'isReachStandard', 'pressure',
    'equipmentFault', 'faultPosition', 'faultDuration', 'faultReason',
    'accessoryChanged', 'accessoryName', 'accessoryAmount', 'accessoryPrice',
    'oilStatus', 'color', 'cst', 'tan', 'fe', 'cleanliness', 'moisture', 'customMetricOne', 'customMetricTwo', 'customMetricThree', 'serviceValue',
    'comment', 'result',
  ],
}

export const MAINTENANCE_FIX_HEADER = {
  distributor: { name: true },
  factory: {
    name: true,
  },
  equipment: {
    name: true,
    number: true,
  },
  maintenanceRecord: {
    maintenanceType: true,
    date: true,
    lubricantPart: true,
    brand: true,
    product: true,
    volume: true,
    comment: true,
  },
}

export const MAINTENANCE_STYLE_CLASS = {
  distributor: DISTRIBUTOR_STYLE,
  factory: FACTORY_STYLE,
  equipment: EQUIPMENT_STYLE,
  maintenanceRecord: MAINTENANCE_RECORD_STYLE,
}
export const SHELL_MAINTENANCE_STORAGE_HEADER = 'SHELL_MAINTENANCE_STORAGE_HEADER'

export const SHELL_CUSTOM_MAINTENANCE_STORAGE_HEADER = 'SHELL_CUSTOM_MAINTENANCE_STORAGE_HEADER'

export const APPROVAL_STATUS = {
  NOT_APPROVAL: 'NOT_APPROVAL',
  APPROVAL_SENT: 'APPROVAL_SENT',
  APPROVAL_PERMIT: 'APPROVAL_PERMIT',
  APPROVAL_REFUSE: 'APPROVAL_REFUSE',
  PERMIT: ' PERMIT',
  NOT_PERMIT: 'NOT_PERMIT',
}

export const APPROVAL_HISTORY_STATUS = {
  COMMIT: '提交审核',
  CANCEL: '撤回',
  REFUSE: '拒绝通过',
  PERMIT: '审核通过',
}

export const MAINTENANCE_RECORD_SHOW_LIST = [
  'createdUser',
  'createdDate',
  'customerRecord',
  'updatedUser',
  'date',
  'warning',
  'warningHandled',
]

export const MAINTENANCE_RECORD = 'maintenanceRecord'

export const DEFAULT_LIST_PAGE_SIZE = 10

export const ONSITE_SERVICE_LIST_PAGE_SIZE = 12

export const LUBE_EQUIPMENT_LIST_PAGE_SIZE = 12

export const DEVICE_OPTIONS = [{
  value: 'name',
  label: '数采设备编号',
}, {
  value: 'templateName',
  label: '网关配置模板',
}, {
  value: 'supplierName',
  label: '传感器供应商',
}]

export const DEVICE_STATUS_ENUM = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
}

export const DEVICE_STATUS = {
  [DEVICE_STATUS_ENUM.ONLINE]: {
    value: DEVICE_STATUS_ENUM.ONLINE,
    label: '在线',
  },
  [DEVICE_STATUS_ENUM.OFFLINE]: {
    value: DEVICE_STATUS_ENUM.OFFLINE,
    label: '离线',
  },
}

export const DEVICE_UPGRADE_STATUS = {
  SUCCESS: '升级成功',
  FAILURE: '升级失败',
  PROCESSING: '升级中',
}

export const GATEWAY_BURN_PROGRESS_ENUM = {
  NOT_BURN: 'NOT_BURN',
  WAIT_BURN: 'WAIT_BURN',
  BURNED: 'BURNED',
}

export const GATEWAY_BURN_PROGRESS = {
  [GATEWAY_BURN_PROGRESS_ENUM.NOT_BURN]: {
    value: GATEWAY_BURN_PROGRESS_ENUM.NOT_BURN,
    label: '未烧录',
  },
  [GATEWAY_BURN_PROGRESS_ENUM.WAIT_BURN]: {
    value: GATEWAY_BURN_PROGRESS_ENUM.WAIT_BURN,
    label: '等待烧录',
  },
  [GATEWAY_BURN_PROGRESS_ENUM.BURNED]: {
    value: GATEWAY_BURN_PROGRESS_ENUM.BURNED,
    label: '已烧录',
  },
}

export const DEVICE_TYPE_ENUM = {
  GATEWAY: 'GATEWAY',
  DTU: 'DTU',
  CLOUD: 'CLOUD',
}

export const DEVICE_TYPE = {
  [DEVICE_TYPE_ENUM.GATEWAY]: { value: DEVICE_TYPE_ENUM.GATEWAY, label: '网关' },
  [DEVICE_TYPE_ENUM.DTU]: { value: DEVICE_TYPE_ENUM.DTU, label: 'DTU' },
  [DEVICE_TYPE_ENUM.CLOUD]: { value: DEVICE_TYPE_ENUM.CLOUD, label: '云端对接' },
}

export const FOURG_CARD_TYPE_ENUM = {
  TELECOM: 'TELECOM',
  CMCC: 'CMCC',
  UNICOM: 'UNICOM',
}

export const FOURG_CARD_TYPE = {
  [FOURG_CARD_TYPE_ENUM.TELECOM]: {
    value: FOURG_CARD_TYPE_ENUM.TELECOM,
    label: '电信',
  },
  [FOURG_CARD_TYPE_ENUM.CMCC]: {
    value: FOURG_CARD_TYPE_ENUM.CMCC,
    label: '移动',
  },
  [FOURG_CARD_TYPE_ENUM.UNICOM]: {
    value: FOURG_CARD_TYPE_ENUM.UNICOM,
    label: '联通',
  },
}

export const CONNECT_TYPE_ENUM = {
  WIRE: 'WIRE',
  WIFI: 'WIFI',
  FOURG: 'FOURG',
  LORA: 'LORA',
}

export const CONNECT_TYPE = {
  [CONNECT_TYPE_ENUM.WIRE]: {
    value: CONNECT_TYPE_ENUM.WIRE,
    label: '有线',
  },
  [CONNECT_TYPE_ENUM.WIFI]: {
    value: CONNECT_TYPE_ENUM.WIFI,
    label: 'Wifi',
  },
  [CONNECT_TYPE_ENUM.FOURG]: {
    value: CONNECT_TYPE_ENUM.FOURG,
    label: '4G',
  },
  [CONNECT_TYPE_ENUM.LORA]: {
    value: CONNECT_TYPE_ENUM.LORA,
    label: 'Lora',
  },
}

export const ACCEPTANCE_STATUS_TYPES = {
  ACCEPTED: 'ACCEPTED',
  PROCESSING: 'PROCESSING',
  COMMISSIONING: 'COMMISSIONING',
  PENDING: 'PENDING',
}

export const ACCEPTANCE_STATUS_LABEL = {
  [ACCEPTANCE_STATUS_TYPES.ACCEPTED]: '已验收',
  [ACCEPTANCE_STATUS_TYPES.PROCESSING]: '处理中',
  [ACCEPTANCE_STATUS_TYPES.COMMISSIONING]: '调试中',
  [ACCEPTANCE_STATUS_TYPES.PENDING]: '待处理',
}

export const ACCEPTANCE_STATUS_COLORS = {
  [ACCEPTANCE_STATUS_LABEL.ACCEPTED]: '#42CB83',
  [ACCEPTANCE_STATUS_LABEL.PROCESSING]: '#DF3F2A',
  [ACCEPTANCE_STATUS_LABEL.PENDING]: '#ffa600',
  [ACCEPTANCE_STATUS_LABEL.COMMISSIONING]: '#4B7FF0',
}

export const MAX_WIDTH_OF_ELLIPSIS = '300px'

export const COL_SPAN = 10

export const PLACEHOLDER_WITH_DISTRIBUTOR = '搜索经销商/工厂'

export const UPGRADING_TEMPLATE_DATA = {
  id: '模版ID',
  name: '模版名称',
  createdAt: '创建时间',
  command: '命令',
  upgradeDevices: '网关名称',
  comments: '备注',
}
