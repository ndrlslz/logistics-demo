import { formatTimestamp } from '@/share/utils/help'

export const transformFactory = (factory) => {
  if (!factory) return {}
  return {
    ...factory,
    createdDate: formatTimestamp(factory.createdDate),
    address: factory.address.address,
    factoryContacts: factory.factoryContacts.map(contact => {
      return `${contact.name}${contact.phoneNumber}`
    }).join('，'),
  }
}

export const transformEquipment = (equipment) => {
  if (!equipment) return {}
  return {
    ...equipment,
    createdDate: formatTimestamp(equipment.createdDate),
    installDate: formatTimestamp(equipment.installDate, 'YYYY.MM'),
  }
}

export const transformLubricantPoint = (lubricantPoint) => {
  if (!lubricantPoint) return {}
  return {
    ...lubricantPoint,
    latestChangeOilDate: formatTimestamp(lubricantPoint.latestChangeOilDate),
    nextChangeOilDate: formatTimestamp(lubricantPoint.nextChangeOilDate),
    createdDate: formatTimestamp(lubricantPoint.createdDate),
    volume: lubricantPoint.volume.volume + lubricantPoint.volume.unit,
  }
}

export const transformMaintenance = (maintenance) => {
  if (!maintenance) return {}
  return {
    ...maintenance,
    createdDate: formatTimestamp(maintenance.createdDate, 'YYYY.MM.DD HH:mm'),
    updateDate: formatTimestamp(maintenance.updateDate, 'YYYY.MM.DD HH:mm'),
    date: formatTimestamp(maintenance.date),
    volume: maintenance.volume ? maintenance.volume.volume + maintenance.volume.unit : '',
  }
}

export const transformMaintenances = list => list.map(item => {
  item.factory = transformFactory(item.factory)
  item.equipment = transformEquipment(item.equipment)
  item.maintenanceRecord = transformMaintenance(item.maintenanceRecord)
  return item
})

export const transformCustomMaintenance = (maintenance) => {
  if (!maintenance) return {}
  const fieldMap = {}
  maintenance.fields.forEach(field => {
    fieldMap[field.id] = field.value
  })
  return {
    ...transformMaintenance(maintenance),
    fields: fieldMap,
  }
}

export const transformCustomMaintenances = list => list.map(item => {
  item.factory = transformFactory(item.factory)
  item.equipment = transformEquipment(item.equipment)
  item.maintenanceRecord = transformCustomMaintenance(item.maintenanceRecord)
  return item
})
