import searchWidgetHelpers from '../../share/components/shFormControlsGenerateHelper'

export const equipmentSearchFieldsOrder = ['distributor', 'factory', 'equipment', 'lubricantPoint']
export const equipmentSearchFieldHelpersMap = {
  distributor: {
    name: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'distributor' },
  },
  factory: {
    name: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'factory' },
    taxPayerId: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入纳税人识别编号', clearable: true }, parentNode: 'factory' },
    yingkeFactoryNo: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入赢客编码', clearable: true }, parentNode: 'factory' },
    totalOilVolume: { helper: searchWidgetHelpers.numberRange, parentNode: 'factory' },
    domain: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'factory' },
    mainEquipmentType: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'factory' },
    status: { helper: searchWidgetHelpers.enumRadio, parentNode: 'factory' },
    createdDate: { helper: searchWidgetHelpers.dateRange, parentNode: 'factory' },
  },
  equipment: {
    number: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '请输入设备编号', clearable: true }, parentNode: 'equipment' },
    unicode: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入铭牌编码', clearable: true }, parentNode: 'equipment' },
    // workshop: {helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: {placeholder: '请选择所属车间'}, parentNode: 'equipment'},
    manufacturer: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入制造商', clearable: true }, parentNode: 'equipment' },
    model: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入设备型号', clearable: true }, parentNode: 'equipment' },
    name: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'equipment' },
    createdDate: { helper: searchWidgetHelpers.dateRange, parentNode: 'equipment' },
    installDate: { helper: searchWidgetHelpers.monthRange, parentNode: 'equipment' },
    maintenanceCount: { helper: searchWidgetHelpers.numberRange, parentNode: 'equipment' },
  },
  lubricantPoint: {
    volume: { helper: searchWidgetHelpers.numberRangeWithUnit, fixedConfigs: { units: ['L', 'KG'] }, parentNode: 'lubricantPoint' },
    schedule: { helper: searchWidgetHelpers.numberRange, parentNode: 'lubricantPoint' },
    lubricantPart: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'lubricantPoint' },
    type: { helper: searchWidgetHelpers.enumSearchableCheckbox, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'lubricantPoint' },
    brand: { helper: searchWidgetHelpers.enumSearchableCheckbox, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'lubricantPoint' },
    product: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'lubricantPoint' },
    createdDate: { helper: searchWidgetHelpers.dateRange, parentNode: 'lubricantPoint' },
    nextChangeOilDate: { helper: searchWidgetHelpers.dateRange, parentNode: 'lubricantPoint' },
  },
}
export const equipmentDefaultSearchFields = [
  {
    category: 'equipment',
    name: 'name',
    configs: {
      placeholder: '设备大类',
    },
  },
  {
    category: 'equipment',
    name: 'number',
    configs: {
      placeholder: '设备编号',
    },
  },
]

export const maintainSearchFieldsOrder = ['distributor', 'factory', 'equipment', 'maintenanceRecord']
export const maintainSearchFieldHelpersMap = {
  distributor: {
    name: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'distributor' },
  },
  factory: {
    name: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'factory' },
    taxPayerId: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入纳税人识别编号', clearable: true }, parentNode: 'factory' },
    yingkeFactoryNo: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入赢客编码', clearable: true }, parentNode: 'factory' },
    domain: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'factory' },
    totalOilVolume: { helper: searchWidgetHelpers.numberRange, parentNode: 'factory' },
    mainEquipmentType: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'factory' },
    status: { helper: searchWidgetHelpers.enumRadio, parentNode: 'factory' },
    createdDate: { helper: searchWidgetHelpers.dateRange, parentNode: 'factory' },
  },
  equipment: {
    number: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'equipment' },
    unicode: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入铭牌编码', clearable: true }, parentNode: 'equipment' },
    // workshop: {helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: {placeholder: '请选择所属车间'}, parentNode: 'equipment'},
    manufacturer: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入制造商', clearable: true }, parentNode: 'equipment' },
    model: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入设备型号', clearable: true }, parentNode: 'equipment' },
    name: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'equipment' },
    createdDate: { helper: searchWidgetHelpers.dateRange, parentNode: 'equipment' },
    installDate: { helper: searchWidgetHelpers.monthRange, parentNode: 'equipment' },
  },
  maintenanceRecord: {
    comment: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入备注', clearable: true }, parentNode: 'maintenanceRecord' },
    volume: { helper: searchWidgetHelpers.numberRangeWithUnit, fixedConfigs: { units: ['L', 'KG'] }, parentNode: 'maintenanceRecord' },
    temperature: { helper: searchWidgetHelpers.numberRange, parentNode: 'maintenanceRecord' },
    pressure: { helper: searchWidgetHelpers.numberRange, parentNode: 'maintenanceRecord' },
    maintenanceType: { helper: searchWidgetHelpers.enumSearchableCheckbox, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'maintenanceRecord' },
    maintenanceContent: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'maintenanceRecord' },
    lubricantPart: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'lubricantPoint' },
    brand: { helper: searchWidgetHelpers.enumSearchableCheckbox, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'maintenanceRecord' },
    product: { helper: searchWidgetHelpers.enumSearchableRadio, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'maintenanceRecord' },
    isReachStandard: { helper: searchWidgetHelpers.enumRadio, parentNode: 'maintenanceRecord' },
    color: { helper: searchWidgetHelpers.enumRadio, parentNode: 'maintenanceRecord' },
    createdDate: { helper: searchWidgetHelpers.dateTimeRange, parentNode: 'lubricantPoint' },
    customerRecord: { helper: searchWidgetHelpers.enumRadio, fixedConfigs: { options: [{ label: '是', value: true }, { label: '否', value: false }] }, parentNode: 'maintenanceRecord' },
    createdUser: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入姓名或手机号', clearable: true }, parentNode: 'maintenanceRecord' },
    updatedUser: { helper: searchWidgetHelpers.textInput, fixedConfigs: { placeholder: '请输入姓名或手机号', clearable: true }, parentNode: 'maintenanceRecord' },
    date: { helper: searchWidgetHelpers.dateRange, parentNode: 'maintenanceRecord' },
    accessoryChanged: { helper: searchWidgetHelpers.enumRadio, parentNode: 'maintenanceRecord' },
    accessoryName: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { placeholder: '输入文字以进一步筛选', clearable: true }, parentNode: 'maintenanceRecord' },
    equipmentFault: { helper: searchWidgetHelpers.enumRadio, fixedConfigs: { options: [{ label: '是', value: true }, { label: '否', value: false }] }, parentNode: 'maintenanceRecord' },
    warning: { helper: searchWidgetHelpers.enumRadio, fixedConfigs: { options: [{ label: '是', value: true }, { label: '否', value: false }] }, parentNode: 'maintenanceRecord' },
    warningHandled: { helper: searchWidgetHelpers.enumRadio, fixedConfigs: { options: [{ label: '是', value: true }, { label: '否', value: false }] }, parentNode: 'maintenanceRecord' },
    faultDuration: { helper: searchWidgetHelpers.numberRange, parentNode: 'maintenanceRecord' },
  },
}
export const maintainDefaultSearchFields = [
  {
    category: 'equipment',
    name: 'name',
    configs: {
      placeholder: '设备大类',
    },
  },
  {
    category: 'equipment',
    name: 'number',
    configs: {
      placeholder: '设备编号',
    },
  },
  {
    category: 'maintenanceRecord',
    name: 'maintenanceType',
    configs: {
      placeholder: '维保类型',
      showTags: false,
    },
  },
  {
    category: 'maintenanceRecord',
    name: 'date',
    label: '维保日期',
  },
]
export const customMaintainDefaultSearchFields = [
  {
    category: 'equipment',
    name: 'name',
    configs: {
      placeholder: '设备大类',
    },
  },
  {
    category: 'equipment',
    name: 'number',
    configs: {
      placeholder: '设备编号',
    },
  },
  {
    category: 'maintenanceRecord',
    name: 'date',
    label: '维保日期',
  },
]

export const getOilInspectionInventoryDefaultSearchFields = ({ showKeyAccount, isViewInventoryStatistics }) => {
  return [
    {
      category: 'distributor',
      name: 'name',
      configs: {
        placeholder: showKeyAccount ? '集团名称' : '经销商',
      },
    },
    {
      category: 'oilInspection',
      name: 'keyword',
      configs: {
        placeholder: isViewInventoryStatistics ? '搜索项目名称 / GSAP Code' : '搜索项目名称 / GSAP Code / 订单编号',
        style: 'width: 300px',
      },
    },
  ]
}

export const oilInspectionInventorySearchFieldHelpersMap = {
  distributor: {
    name: { helper: searchWidgetHelpers.textAutoComplete, fixedConfigs: { clearable: true }, parentNode: 'distributor' },
  },
  oilInspection: {
    keyword: { helper: searchWidgetHelpers.textInput, fixedConfigs: { clearable: true, searchable: true }, parentNode: 'oilInspection' },
  },
}
