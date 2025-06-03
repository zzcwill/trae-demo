import zhenceImg from "./image/ico-政策内容区.png";
import shiwuImg from "./image/ico-实务内容区.png";

export const zhence_html = `<p></p><h3 class="__zhence-cut-line" contenteditable="false"><img src="${zhenceImg}" alt="" class="img" contenteditable="false"><p class="text" contenteditable="false">政策依据</p></h3><p></p>`

export const shiwu_html = `<p></p><h3 class="__shiwu-cut-line" contenteditable="false"><img src="${shiwuImg}" alt="" class="img" contenteditable="false"><p class="text" contenteditable="false">实务处理</p></h3><p></p>`

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
