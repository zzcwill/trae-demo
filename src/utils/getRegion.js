const regionParamCodes = {
  province: "xzqh_province",
  city: "xzqh_city",
  area: "xzqh_county"
}
const regionUrlPath = "//sisp.17win.com/apiweb/sisp/1/xzqh/getXzqhFile?code="
const regionUrlSuffix = "_url"
let provincePromise = null
let cityPromise = null
let areaPromise = null
export default function (type = 'province') {
  if (type === 'province' && provincePromise) {
    return provincePromise
  }
  if (type === 'city' && cityPromise) {
    return cityPromise
  }
  if (type === 'area' && areaPromise) {
    return areaPromise
  }

  if (type === 'province') {
    provincePromise = getPromise()
    return provincePromise
  }
  if (type === 'city') {
    cityPromise = getPromise()
    return cityPromise
  }
  if (type === 'area') {
    areaPromise = getPromise()
    return areaPromise
  }
  function getPromise() {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script')
      script.src = regionUrlPath + regionParamCodes[type] + regionUrlSuffix
      script.onload = () => {
        resolve(window[regionParamCodes[type]])
      }
      script.onerror = () => {
        reject()
      }
      document.head.appendChild(script)
    })
  }
}
