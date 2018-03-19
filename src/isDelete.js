const isDelete = (strOld, strNew) => {
  const arrOld = strOld.split("")
  const arrNew = strNew.split("")
  let [indexLeft, indexRight] = [null, null]

  if (strOld === strNew || strOld.length < strNew.length) {
    return false
  } else if (strOld.indexOf(strNew) >= 0) {
    return true
  } else {
    for (let i = 0; i < arrNew.length; i++) {
      if (arrNew[i] !== arrOld[i]) {
        //记录左遍历第一次不相等字符的index
        indexLeft = i
        break
      }
    }

    for (let i = 1; i <= arrNew.length; i++) {
      if (arrNew[arrNew.length-i] !== arrOld[arrOld.length-i]) {
        //记录右遍历第一次不相等字符的index
        indexRight = arrNew.length-i
        break
      }
    }

    return(indexRight - indexLeft < 0 )
  }
}

export default isDelete
