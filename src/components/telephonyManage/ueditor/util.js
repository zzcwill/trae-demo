import zhenceImg from "./image/zhen.png";
import shiwuImg from "./image/shi.png";

export const zhence_html = `<p></p><h3 class="__zhence-cut-line" contenteditable="false"><img src="${zhenceImg}" alt="" class="img" contenteditable="false"><p class="text" contenteditable="false">政策依据</p></h3><p></p>`

export const shiwu_html = `<p></p><h3 class="__shiwu-cut-line" contenteditable="false"><img src="${shiwuImg}" alt="" class="img" contenteditable="false"><p class="text" contenteditable="false">实务处理</p></h3><p></p>`


/** 调试数据*/
// 政策在前
const test = '<p>dsdsd</p><p><br/></p>' +
  '<h3 class="__zhence-cut-line" contenteditable="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAydJREFUWAntll9IU1Ecx7e52cRlDKoX50sgSdRDVETgS5Gke4mIFlFaTTaFSCIoCnvuIXsqktS5QelLf0DqQYOigqCXjAiigp4qKyxsUktibuvz05243p253elTeeB3f+f3/3t+59xzr822NP73DtitNqCnp8dlt9tvZjKZBvhL+P62trb3VvMo/7wAYrGYO5VK+ZSj4hQ8kk6nOyn+g/ly9CNlZWXHlV1xYj8B7JeS83EtAFZ5gYATkEsXSPHHoVBoR19f3w1A7M3jk8J2NRwOd+Cf1vmIzmE29Pb2NqM7Bf2ERggehh4xt8EnRGZ6G56WeVYeFzvjidJR/CvyMUC2z1jyPJwa/S7RkSgA+vsyj0ajNclkUvb5BTq/6GTQhX5YP6CHKLibmHbsr8QWiUQ2sg3P0TcidotON3QAPFnHz+YAktVQLGe/0a8x+zocjm8AkIVUmm1GWQfAaDfPayl2yaxciFwUAI/H8z0ej3cUKsSqc7pWKKYoAIFAQA7k5ULJSrHnvAWlJFlIzL8FYHBw0MslVm+lI4vagUQicYDiZ6wAKOoQFpuQV/Qo7/0mulAXDAbfEKe96o35Fq0D3HzrSbwZEGCwnzQWmW++aAD4QgYNhZq5vlcZ5LzTkrZAVsmKV1O0mk9xdfazfUhVwe7m23GFa/su3RhD/uh2u8daWloSykdxyx0gmYPE1yj+hSSjFL8D70ZvXvE+dOL3AP52ampqnLOxXRVW3DIAVpTmi3cYXvTNiO+E0+ncyQ/KQ1VYccsAJDALooO7v1Mlmod/wL++tbX1qc6nJAAqEf8D55mfVbKZy8rZ+234vTbblKwDIB8eGStn2fxPiuQcLBXB3ldWVFTIn1HeoXsL7uF9kOBbHJpnFMhoooc5B+oMbNHYlWrZ5OTkBoRRpTDznA6Q+DpOXdAKqBEgTRqSS2dmYDMCGEIZgsZmrTabya7Uf3kOALFwWk+Xl5dX8Y7X6sjlcp0Tv4GBgSo6tBZ6h18TcXugiNfrrUN3EZckZAQoYXNGwbt6jrdJYIu2UqjB5/N1+f3+3yaz/Myum56epqlh+cVfGtoO/AFCNzjf3YKPlAAAAABJRU5ErkJggg==" alt="" class="img" contenteditable="false"/><p class="text" contenteditable="false">政策依据</p></h3>' +
  '<p>dsd</p><p>ds</p>' +
  '<h3 class="__shiwu-cut-line" contenteditable="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA31JREFUWAntlk1IVFEUx51PxIEaohaGu4woLBdWSBFUizaFUYuSFuZ8aYuKQIIWLdpnFmSQXyNI0SJokVSrFlb2AWGWZmQEhUJliLPoYxrGmX5neHd4c+dN72nQJi9czjn/+z8f79z77ntlZUvjf++Aq1QDent7azKZTAfr9cyKUrw/4dls9pfL5RplnonFYg+tuJYF9PX1rZ6fn39NgADOj3H8YeVsh+Hvx79epNfr3RKJRF7qPl4dEJsnj+EUdLvde6n8rhXHKdbV1bWRIl7wQKfwCel+bh0Qm+QbEOloNHrPan0hWGtr6xjxPuIjMYuGZQdgeag6w8yKR09Pz27ECtGdDI/HMxEOhycUlzhpdI+yzbJUAXkO52FdOp2+nwccKGzhe2jVDqhltgXwJJMU0cAeOu4AicecJBeObQHGNgw6DbhQnuUhXGgQOz6H8BscmUXDtgNFHosA/H5/I+dIDmLRcFRAd3f3PrZilfLmiWa5HwbVW6Jw3nkf2DbsNcgUvPGWlpbRUCj0TnF0aVtAf3//2lQqNUiwAl+K2gSQO2ysuXhVTyLPMlcKUfHhvcFsoxDLO8X2DBjV7+CJDprmTrlgjEQuktwg4SXsXHLB1QBfj34HzgmFmaVtB4RMskdmJ7PORyuGfdiM6TpFyDfnAl0aYutemddtO2Am6zp7Xsmlc17HS9g+CokbxeQpf1UAURqZy/LRDIWtyh0Y5GVmm1oneV08Hq9TtkjbLcDJTZuP8qS5m5Av5DBtfCrOBK9jXVQ1nqBUgNUir1RVVZ2empq6rRZF8jZKAc8VZlsA+1ZNwLhyQJf/g+2GvVzhhnyGPEdhx4LB4MXp6emb2HvMHB6goGO2W8DrM4lTLXOXzPLy8gOmgF9MuqjyzQ+TvD2RSFyn2AZtXcwCH9sOiId+cgUzxhAyogxDdszNzR1B36zhOZM/owdmvFQHkpA8crOZybru8/mkxW91HNsyOfg17pUPZn6pAkZon/xAHDeTdZ1gUmiUPS84iTrPsGfYPtmigiEXRNEYGBgIJJPJUYqoJngCQsFPKfhPsENcUCPizC13DNFpFC2QPmb5S9rPL96wvmDZgaampu+BQGArydsJOs78bJ4E+cSBlCJyg4N6lQTyet1i5nH8vzI7+RrWWCUXZ8sOyMJih3FuKkmaam5unqGAzGJjLfn9kw78BsoiWFsMd05DAAAAAElFTkSuQmCC" alt="" class="img" contenteditable="false"/><p class="text" contenteditable="false">实务处理</p></h3>' +
  '<p>dssddsd</p>'

// 实务在前
const test1 = '<p>发的发的</p>' +
  '<h3 class="__shiwu-cut-line" contenteditable="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA31JREFUWAntlk1IVFEUx51PxIEaohaGu4woLBdWSBFUizaFUYuSFuZ8aYuKQIIWLdpnFmSQXyNI0SJokVSrFlb2AWGWZmQEhUJliLPoYxrGmX5neHd4c+dN72nQJi9czjn/+z8f79z77ntlZUvjf++Aq1QDent7azKZTAfr9cyKUrw/4dls9pfL5RplnonFYg+tuJYF9PX1rZ6fn39NgADOj3H8YeVsh+Hvx79epNfr3RKJRF7qPl4dEJsnj+EUdLvde6n8rhXHKdbV1bWRIl7wQKfwCel+bh0Qm+QbEOloNHrPan0hWGtr6xjxPuIjMYuGZQdgeag6w8yKR09Pz27ECtGdDI/HMxEOhycUlzhpdI+yzbJUAXkO52FdOp2+nwccKGzhe2jVDqhltgXwJJMU0cAeOu4AicecJBeObQHGNgw6DbhQnuUhXGgQOz6H8BscmUXDtgNFHosA/H5/I+dIDmLRcFRAd3f3PrZilfLmiWa5HwbVW6Jw3nkf2DbsNcgUvPGWlpbRUCj0TnF0aVtAf3//2lQqNUiwAl+K2gSQO2ysuXhVTyLPMlcKUfHhvcFsoxDLO8X2DBjV7+CJDprmTrlgjEQuktwg4SXsXHLB1QBfj34HzgmFmaVtB4RMskdmJ7PORyuGfdiM6TpFyDfnAl0aYutemddtO2Am6zp7Xsmlc17HS9g+CokbxeQpf1UAURqZy/LRDIWtyh0Y5GVmm1oneV08Hq9TtkjbLcDJTZuP8qS5m5Av5DBtfCrOBK9jXVQ1nqBUgNUir1RVVZ2empq6rRZF8jZKAc8VZlsA+1ZNwLhyQJf/g+2GvVzhhnyGPEdhx4LB4MXp6emb2HvMHB6goGO2W8DrM4lTLXOXzPLy8gOmgF9MuqjyzQ+TvD2RSFyn2AZtXcwCH9sOiId+cgUzxhAyogxDdszNzR1B36zhOZM/owdmvFQHkpA8crOZybru8/mkxW91HNsyOfg17pUPZn6pAkZon/xAHDeTdZ1gUmiUPS84iTrPsGfYPtmigiEXRNEYGBgIJJPJUYqoJngCQsFPKfhPsENcUCPizC13DNFpFC2QPmb5S9rPL96wvmDZgaampu+BQGArydsJOs78bJ4E+cSBlCJyg4N6lQTyet1i5nH8vzI7+RrWWCUXZ8sOyMJih3FuKkmaam5unqGAzGJjLfn9kw78BsoiWFsMd05DAAAAAElFTkSuQmCC" alt="" class="img" contenteditable="false"/><p class="text" contenteditable="false">实务处理</p></h3>' +
  '<p>发的发的</p><p><br/></p>' +
  '<h3 class="__zhence-cut-line" contenteditable="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAydJREFUWAntll9IU1Ecx7e52cRlDKoX50sgSdRDVETgS5Gke4mIFlFaTTaFSCIoCnvuIXsqktS5QelLf0DqQYOigqCXjAiigp4qKyxsUktibuvz05243p253elTeeB3f+f3/3t+59xzr822NP73DtitNqCnp8dlt9tvZjKZBvhL+P62trb3VvMo/7wAYrGYO5VK+ZSj4hQ8kk6nOyn+g/ly9CNlZWXHlV1xYj8B7JeS83EtAFZ5gYATkEsXSPHHoVBoR19f3w1A7M3jk8J2NRwOd+Cf1vmIzmE29Pb2NqM7Bf2ERggehh4xt8EnRGZ6G56WeVYeFzvjidJR/CvyMUC2z1jyPJwa/S7RkSgA+vsyj0ajNclkUvb5BTq/6GTQhX5YP6CHKLibmHbsr8QWiUQ2sg3P0TcidotON3QAPFnHz+YAktVQLGe/0a8x+zocjm8AkIVUmm1GWQfAaDfPayl2yaxciFwUAI/H8z0ej3cUKsSqc7pWKKYoAIFAQA7k5ULJSrHnvAWlJFlIzL8FYHBw0MslVm+lI4vagUQicYDiZ6wAKOoQFpuQV/Qo7/0mulAXDAbfEKe96o35Fq0D3HzrSbwZEGCwnzQWmW++aAD4QgYNhZq5vlcZ5LzTkrZAVsmKV1O0mk9xdfazfUhVwe7m23GFa/su3RhD/uh2u8daWloSykdxyx0gmYPE1yj+hSSjFL8D70ZvXvE+dOL3AP52ampqnLOxXRVW3DIAVpTmi3cYXvTNiO+E0+ncyQ/KQ1VYccsAJDALooO7v1Mlmod/wL++tbX1qc6nJAAqEf8D55mfVbKZy8rZ+234vTbblKwDIB8eGStn2fxPiuQcLBXB3ldWVFTIn1HeoXsL7uF9kOBbHJpnFMhoooc5B+oMbNHYlWrZ5OTkBoRRpTDznA6Q+DpOXdAKqBEgTRqSS2dmYDMCGEIZgsZmrTabya7Uf3kOALFwWk+Xl5dX8Y7X6sjlcp0Tv4GBgSo6tBZ6h18TcXugiNfrrUN3EZckZAQoYXNGwbt6jrdJYIu2UqjB5/N1+f3+3yaz/Myum56epqlh+cVfGtoO/AFCNzjf3YKPlAAAAABJRU5ErkJggg==" alt="" class="img" contenteditable="false"/><p class="text" contenteditable="false">政策依据</p></h3>' +
  '<p>发的发的发发的发的</p>'

//只有政策
const test2 = '<p>颠三倒四</p><p>颠三倒</p><h3 class="__zhence-cut-line" contenteditable="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAydJREFUWAntll9IU1Ecx7e52cRlDKoX50sgSdRDVETgS5Gke4mIFlFaTTaFSCIoCnvuIXsqktS5QelLf0DqQYOigqCXjAiigp4qKyxsUktibuvz05243p253elTeeB3f+f3/3t+59xzr822NP73DtitNqCnp8dlt9tvZjKZBvhL+P62trb3VvMo/7wAYrGYO5VK+ZSj4hQ8kk6nOyn+g/ly9CNlZWXHlV1xYj8B7JeS83EtAFZ5gYATkEsXSPHHoVBoR19f3w1A7M3jk8J2NRwOd+Cf1vmIzmE29Pb2NqM7Bf2ERggehh4xt8EnRGZ6G56WeVYeFzvjidJR/CvyMUC2z1jyPJwa/S7RkSgA+vsyj0ajNclkUvb5BTq/6GTQhX5YP6CHKLibmHbsr8QWiUQ2sg3P0TcidotON3QAPFnHz+YAktVQLGe/0a8x+zocjm8AkIVUmm1GWQfAaDfPayl2yaxciFwUAI/H8z0ej3cUKsSqc7pWKKYoAIFAQA7k5ULJSrHnvAWlJFlIzL8FYHBw0MslVm+lI4vagUQicYDiZ6wAKOoQFpuQV/Qo7/0mulAXDAbfEKe96o35Fq0D3HzrSbwZEGCwnzQWmW++aAD4QgYNhZq5vlcZ5LzTkrZAVsmKV1O0mk9xdfazfUhVwe7m23GFa/su3RhD/uh2u8daWloSykdxyx0gmYPE1yj+hSSjFL8D70ZvXvE+dOL3AP52ampqnLOxXRVW3DIAVpTmi3cYXvTNiO+E0+ncyQ/KQ1VYccsAJDALooO7v1Mlmod/wL++tbX1qc6nJAAqEf8D55mfVbKZy8rZ+234vTbblKwDIB8eGStn2fxPiuQcLBXB3ldWVFTIn1HeoXsL7uF9kOBbHJpnFMhoooc5B+oMbNHYlWrZ5OTkBoRRpTDznA6Q+DpOXdAKqBEgTRqSS2dmYDMCGEIZgsZmrTabya7Uf3kOALFwWk+Xl5dX8Y7X6sjlcp0Tv4GBgSo6tBZ6h18TcXugiNfrrUN3EZckZAQoYXNGwbt6jrdJYIu2UqjB5/N1+f3+3yaz/Myum56epqlh+cVfGtoO/AFCNzjf3YKPlAAAAABJRU5ErkJggg==" alt="" class="img" contenteditable="false"/><p class="text" contenteditable="false">政策依据</p></h3><p>颠三倒四的</p>'

// 只有实务
const test3 = '<p>发的发的发辅导费</p><p><br/></p><h3 class="__shiwu-cut-line" contenteditable="false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA31JREFUWAntlk1IVFEUx51PxIEaohaGu4woLBdWSBFUizaFUYuSFuZ8aYuKQIIWLdpnFmSQXyNI0SJokVSrFlb2AWGWZmQEhUJliLPoYxrGmX5neHd4c+dN72nQJi9czjn/+z8f79z77ntlZUvjf++Aq1QDent7azKZTAfr9cyKUrw/4dls9pfL5RplnonFYg+tuJYF9PX1rZ6fn39NgADOj3H8YeVsh+Hvx79epNfr3RKJRF7qPl4dEJsnj+EUdLvde6n8rhXHKdbV1bWRIl7wQKfwCel+bh0Qm+QbEOloNHrPan0hWGtr6xjxPuIjMYuGZQdgeag6w8yKR09Pz27ECtGdDI/HMxEOhycUlzhpdI+yzbJUAXkO52FdOp2+nwccKGzhe2jVDqhltgXwJJMU0cAeOu4AicecJBeObQHGNgw6DbhQnuUhXGgQOz6H8BscmUXDtgNFHosA/H5/I+dIDmLRcFRAd3f3PrZilfLmiWa5HwbVW6Jw3nkf2DbsNcgUvPGWlpbRUCj0TnF0aVtAf3//2lQqNUiwAl+K2gSQO2ysuXhVTyLPMlcKUfHhvcFsoxDLO8X2DBjV7+CJDprmTrlgjEQuktwg4SXsXHLB1QBfj34HzgmFmaVtB4RMskdmJ7PORyuGfdiM6TpFyDfnAl0aYutemddtO2Am6zp7Xsmlc17HS9g+CokbxeQpf1UAURqZy/LRDIWtyh0Y5GVmm1oneV08Hq9TtkjbLcDJTZuP8qS5m5Av5DBtfCrOBK9jXVQ1nqBUgNUir1RVVZ2empq6rRZF8jZKAc8VZlsA+1ZNwLhyQJf/g+2GvVzhhnyGPEdhx4LB4MXp6emb2HvMHB6goGO2W8DrM4lTLXOXzPLy8gOmgF9MuqjyzQ+TvD2RSFyn2AZtXcwCH9sOiId+cgUzxhAyogxDdszNzR1B36zhOZM/owdmvFQHkpA8crOZybru8/mkxW91HNsyOfg17pUPZn6pAkZon/xAHDeTdZ1gUmiUPS84iTrPsGfYPtmigiEXRNEYGBgIJJPJUYqoJngCQsFPKfhPsENcUCPizC13DNFpFC2QPmb5S9rPL96wvmDZgaampu+BQGArydsJOs78bJ4E+cSBlCJyg4N6lQTyet1i5nH8vzI7+RrWWCUXZ8sOyMJih3FuKkmaam5unqGAzGJjLfn9kw78BsoiWFsMd05DAAAAAElFTkSuQmCC" alt="" class="img" contenteditable="false"/><p class="text" contenteditable="false">实务处理</p></h3><p>发的发的法定</p>'

/**
 * @desc 将富文本中的内容拆分为 回答 政策 实务
 *  逻辑  正则提取 政策 实务 分割标志， 根据标志拆分字符串 ，然后拿到相应数据
 *  政策 实务 的位置关系不同，处理方式不同，代码中有注释
 *
 * */
export function parseHtml(html) {
  const zhenceFlag = '__zhence-cut-line'
  const shiwuFlag = '__shiwu-cut-line'
  const zhenceIndex = html.indexOf(zhenceFlag)
  const shiwuIndex = html.indexOf(shiwuFlag)
  let result = {
    reply: '',
    policyBasis: '',//政策
    practice: '',//实务
  }
  let policyBasisReg = /<h3 class="__zhence-cut-line"(?:(?!<\/h3>).)*<\/h3>/
  let practiceReg = /<h3 class="__shiwu-cut-line"(?:(?!<\/h3>).)*<\/h3>/
  const policyBasisMatch = html.match(policyBasisReg)
  const practiceMatch = html.match(practiceReg)
  const policyBasisStr = policyBasisMatch ? policyBasisMatch[0] : ''
  const practiceStr = practiceMatch ? practiceMatch[0] : ''
  if (zhenceIndex >= 0 || shiwuIndex >= 0) {
    if (policyBasisMatch && practiceMatch) { // 政策 实务都有
      if (zhenceIndex <= shiwuIndex) { // 政策在前
        let a1 = html.split(policyBasisStr)
        result.reply = a1[0]
        let a2 = a1[1].split(practiceStr)
        result.policyBasis = a2[0]
        result.practice = a2[1]
      } else { //实务在前
        let a1 = html.split(practiceStr)
        result.reply = a1[0]
        let a2 = a1[1].split(policyBasisStr)
        result.practice = a2[0]
        result.policyBasis = a2[1]
      }
    } else if (policyBasisMatch && !practiceMatch) { // 只有政策
      let a1 = html.split(policyBasisStr)
      result.reply = a1[0]
      result.policyBasis = a1[1]
    } else if (!policyBasisMatch && practiceMatch) { // 只有实务
      let a1 = html.split(practiceMatch)
      result.reply = a1[0]
      result.practice = a1[1]
    }
  } else {
    result.reply = html
  }
  return result
}

export function genHtml({reply = '', policyBasis, practice,}) {
  let result = reply
  if (policyBasis) {
    result = result + zhence_html.replace(/<p><\/p>/g,'') + policyBasis
  }
  if (practice) {
    result = result + shiwu_html.replace(/<p><\/p>/g,'') + practice
  }
  return result
}

export function clearImage(html) {
  let clearImage = /<img[^>]*>/g
  return html.replace(clearImage, '')
}
