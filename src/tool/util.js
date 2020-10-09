/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
export const promisifyTimeout = timer =>
  new Promise(resolve => {
    setTimeout(resolve, timer)
  })

export const smallImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const globalPointToLocalSvg = (svg, element, x, y) => {
  const pt = svg.createSVGPoint()
  pt.x = x
  pt.y = y
  return pt.matrixTransform(element.getScreenCTM().inverse())
}

export const localPointToGlobalInverseSvg = (svg, element, x, y) => {
  const pt = svg.createSVGPoint()
  pt.x = x
  pt.y = y
  return pt.matrixTransform(svg.getScreenCTM().inverse().multiply(element.getScreenCTM()).inverse())
}

/**
 * @param {SVGElement} element - Element to get the bounding box for
 * @param {boolean} [withoutTransforms=false] - If true, transforms will not be calculated
 * @param {SVGElement} [toElement] - Element to calculate bounding box relative to
 * @returns {SVGRect} Coordinates and dimensions of the real bounding box
 */
export const getSvgElementBounding = (element, withoutTransforms, toElement) => {
  const svg = element.ownerSVGElement

  if (!svg) {
    return { x: 0, y: 0, width: 0, height: 0 }
  }

  if (withoutTransforms) {
    return element.getBBox()
  }

  const p = svg.createSVGPoint()
  const r = element.getBBox()

  const matrix = (toElement || svg).getScreenCTM().inverse().multiply(element.getScreenCTM())

  p.x = r.x
  p.y = r.y
  const a = p.matrixTransform(matrix)

  p.x = r.x + r.width
  p.y = r.y
  const b = p.matrixTransform(matrix)

  p.x = r.x + r.width
  p.y = r.y + r.height
  const c = p.matrixTransform(matrix)

  p.x = r.x
  p.y = r.y + r.height
  const d = p.matrixTransform(matrix)

  const minX = Math.min(a.x, b.x, c.x, d.x)
  const maxX = Math.max(a.x, b.x, c.x, d.x)
  const minY = Math.min(a.y, b.y, c.y, d.y)
  const maxY = Math.max(a.y, b.y, c.y, d.y)

  const width = maxX - minX
  const height = maxY - minY

  return {
    x: minX,
    y: minY,
    width,
    height,
    cx: minX + width / 2,
    cy: minY + height / 2,
  }
}

// 时间格式化，秒转中文 时分秒
export const timeFormat = seconds => {
  const H = Math.floor(seconds / 3600)
  const M = Math.floor((seconds - H * 3600) / 60)
  const S = Math.floor(seconds % 60)
  let time = ''
  H > 0 && (time += `${H}时`)
  M > 0 && (time += `${M}分`)
  S > 0 && (time += `${S}秒`)
  return time
}

// 日期格式化
export const dateFormat = (date, formatStr) => {
  let str = formatStr
  const Week = ['日', '一', '二', '三', '四', '五', '六']
  str = str.replace(/yyyy|YYYY/, date.getFullYear())
  str = str.replace(/yy|YY/, date.getYear() % 100 > 9 ? (date.getYear() % 100).toString() : `0${date.getYear() % 100}`)
  str = str.replace(/MM|mm/, date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : `0${date.getMonth() + 1}`)
  str = str.replace(/M|m/g, date.getMonth() + 1)
  str = str.replace(/w|W/g, Week[date.getDay()])
  str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : `0${date.getDate()}`)
  str = str.replace(/d|D/g, date.getDate())
  str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : `0${date.getHours()}`)
  str = str.replace(/h|H/g, date.getHours())
  str = str.replace(/ii/, date.getMinutes() > 9 ? date.getMinutes().toString() : `0${date.getMinutes()}`)
  str = str.replace(/i/g, date.getMinutes())
  str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : `0${date.getSeconds()}`)
  str = str.replace(/s|S/g, date.getSeconds())
  return str
}

// 时间格式化，微妙转 时分秒
export const timeFormatToDay = secondus => {
  if (!secondus) {
    return ''
  }
  const seconds = Math.floor(secondus / 1000000)
  const H = Math.floor(seconds / 3600)
  const M = Math.floor((seconds - H * 3600) / 60)
  const S = Math.floor(seconds % 60)
  let time = ''
  ;(H > 0 && (time += `${H}: `)) || (time += '00: ')
  ;(M > 0 && M < 10 && (time += `0${M}: `)) || (M > 10 && (time += `${M}: `)) || (time += '00: ')
  ;(S > 0 && S < 10 && (time += `0${S}`)) || (S > 10 && (time += S)) || (time += '00')
  return time
}

export const localPointToGlobalSvg = (svg, element, x, y) => {
  const pt = svg.createSVGPoint()
  pt.x = x
  pt.y = y
  // svg.getScreenCTM().inverse().multiply(element.getScreenCTM());
  return pt.matrixTransform(svg.getScreenCTM().inverse().multiply(element.getScreenCTM()))

  /* const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(element.getScreenCTM()); */
}
/*
export const localsPointToGlobalSvg = (svg, element, x, y, inverse?) => {
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  let ctm = svg.getScreenCTM().inverse();
  for (let el of element) {
    ctm = ctm.multiply(el.getScreenCTM());
  }
  if(inverse){
    ctm = ctm.inverse();
  }
  return pt.matrixTransform(ctm);

  /!*const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(element.getScreenCTM());*!/
}; */

export function getSheetValue(r) {
  if (typeof r === 'number') {
    return r
  }
  return typeof r === 'string' ? r.trim() : ''
}

export const menuMapper = menus =>
  menus.map(i => {
    if (i.level === 1) {
      i.level = '000'
    }
    if (i.level === 2) {
      i.level = '001'
    }
    return {
      ...i,
      id: String(i.id),
      parentId: String(i.parentId),
      level: String(i.level),
      icon: i.logo,
      showOrder: Number(i.orderNum),
      sysCode: i.code,
    }
  })

export const getCursorResizeable = (pt, mpt) => {
  switch (true) {
    case pt.x > mpt.x && pt.y > mpt.y:
      return 'se-resize'
    case pt.x > mpt.x && pt.y === mpt.y:
      return 'e-resize'
    case pt.x > mpt.x && pt.y < mpt.y:
      return 'ne-resize'
    case pt.x === mpt.x && pt.y < mpt.y:
      return 'n-resize'
    case pt.x < mpt.x && pt.y < mpt.y:
      return 'nw-resize'
    case pt.x < mpt.x && pt.y === mpt.y:
      return 'w-resize'
    case pt.x < mpt.x && pt.y > mpt.y:
      return 'sw-resize'
    case pt.x === mpt.x && pt.y > mpt.y:
      return 's-resize'
    default:
      return 'nwse-resize'
  }
}

export const formatFileSize = (size, justKB) => {
  let localSize = ''
  if (size > 1024 * 1024 * 1024 && !justKB) {
    localSize = `${(Math.round((size * 100) / (1024 * 1024 * 1024)) / 100).toString()}GB`
  } else if (size > 1024 * 1024 && !justKB) {
    localSize = `${(Math.round((size * 100) / (1024 * 1024)) / 100).toString()}MB`
  } else {
    localSize = `${(Math.round((size * 100) / 1024) / 100).toString()}KB`
  }
  return localSize
}

export const formatBFileSize = text => {
  let size
  if (text < 0.1 * 1024) {
    size = `${text.toFixed(2)}B`
  } else if (text < 0.1 * 1024 * 1024) {
    size = `${(text / 1024).toFixed(2)}KB`
  } else if (text < 0.1 * 1024 * 1024 * 1024) {
    size = `${(text / (1024 * 1024)).toFixed(2)}MB`
  } else if (text < 0.1 * 1024 * 1024 * 1024 * 1024 * 10) {
    size = `${(text / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }
  return size
}

// export const getMenu = (id, constantRoute) => {
//   const authMenus = []
//   constantRoute.forEach(item => {
//     if (item.meta === undefined || item.meta.role.includes(id)) {
//       authMenus.push(item)
//       if (item.children) {
//         const childArr = []
//         item.children.forEach(childItem => {
//           if (childItem.meta === undefined || childItem.meta.role.includes(id)) {
//             childArr.push(childItem)
//           }
//         })
//         authMenus[authMenus.length - 1].children = [...childArr]
//       }
//     }
//   })
//   return authMenus
// }

export const getMenu = (id, constantRoute) => {
  const authMenus = []
  constantRoute.forEach(item => {
    if (item.meta === undefined || item.meta.role.includes(id)) {
      authMenus.push(item)
      if (item.children) {
        const childArr = []
        item.children.forEach(childItem => {
          if (childItem.meta === undefined || childItem.meta.role.includes(id)) {
            childArr.push(childItem)
            if (childItem.children) {
              const grandchildArr = []
              childItem.children.forEach(grandchildItem => {
                if (grandchildItem.meta === undefined || grandchildItem.meta.role.includes(id)) {
                  grandchildArr.push(grandchildItem)
                }
              })
              childArr[childArr.length - 1].children = [...grandchildArr]
            }
          }
        })
        authMenus[authMenus.length - 1].children = [...childArr]
      }
    }
  })
  return authMenus
}

export const convertObjectToArray = object => {
  const keys = Object.keys(object)
  return keys.map(key => ({
    key,
    label: object[key],
  }))
}

export const formatAreasTreeData = (data, deep = 2) => {
  const treeData = []
  data.forEach(item => {
    const obj = {
      title: item.areaName,
      key: item.id,
      value: item.id,
    }
    if (item.childAreas && item.childAreas.length > 0) {
      obj.children = []
      item.childAreas.forEach((child, index) => {
        const childObj = {
          title: child.areaName,
          key: child.id,
          value: child.id,
        }
        obj.children.push(childObj)
        if (child.childAreas && child.childAreas.length > 0 && deep === 3) {
          obj.children[index].children = []
          child.childAreas.forEach(grandchild => {
            const grandchildObj = {
              title: grandchild.areaName,
              key: grandchild.id,
              value: grandchild.id,
            }
            obj.children[index].children.push(grandchildObj)
          })
        }
      })
    }
    treeData.push(obj)
  })
  return treeData
}

export const formatDeviceList = records =>
  records.map(item => ({
    key: item.id,
    label: item.deviceName,
  }))

export const formatCompanyList = records =>
  records.map(item => ({
    key: item.id,
    label: item.firmName,
  }))

export default {}
