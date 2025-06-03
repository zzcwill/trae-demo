import React, {useEffect, useState, useRef} from 'react'
import './index.scss'
import init from 'consult-entry-sdk'
import {uForm} from 'dora'
import {Input, message} from 'dpl-react'
import TextArea from '@/components/common/textArea';
const {SchemaMarkupField: Field, SchemaMarkupForm: Form, Submit, FormButtonGroup} = uForm

export default function SdkTest(props) {
    const [ConsultEntry, setConsultEntry] = useState(null)
    const [moduleId, setModuleId] = useState('')
    const [location, setLocation] = useState('')
    const [browserType, setBrowserType] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [extra, setExtra] = useState()
    const [user, setUser] = useState()
    const [scene, setScene] = useState()
    const consultEntryRef = useRef(null)
    const envMap = {
        test: 'test',
        pre: 'pre',
        production: 'production',
        prod: 'production',
        release: 'release'
    }
    useEffect(() => {
        init(envMap[process.env.PHOENIX_BUILD_ENV] || 'test').then(data => {
            setConsultEntry(data.ConsultEntry)
        })
    }, [])

    return <div className='sdk-test'>
        <div className='form-wrap'>
            <Form inline
                  onSubmit={(e) => {
                      setModuleId(e.moduleId)
                      setLocation(e.location)
                      setBrowserType(e.browserType)
                      setSessionId(e.sessionId)
                      let extraJson = undefined
                      let userJson = undefined
                      let sceneJson = undefined
                      try {
                          if (e.extra) {
                              extraJson = JSON.parse(e.extra)
                              if (typeof extraJson === 'number') {
                                  extraJson = undefined
                                  message.error('输入的extra为非标准JSON,请检查')
                              }
                          }
                      } catch (e) {
                          extraJson = undefined
                          message.error('输入的extra为非标准JSON,请检查')
                      }
                      try {
                          if (e.user) {
                              userJson = JSON.parse(e.user)
                              if (typeof userJson === 'number') {
                                  message.error('输入的user为非标准JSON,请检查')
                                  userJson = undefined
                              }
                          }

                      } catch (e) {
                          userJson = undefined
                          message.error('输入的user为非标准JSON,请检查')
                      }
                      try {
                          if (e.scene) {
                              sceneJson = JSON.parse(e.scene)
                              if (typeof sceneJson === 'number') {
                                  message.error('输入的scene为非标准JSON,请检查')
                                  sceneJson = undefined
                              }
                          }
                      } catch (e) {
                          sceneJson = undefined
                          message.error('输入的scene为非标准JSON,请检查')
                      }
                      setExtra(extraJson)
                      setUser(userJson)
                      setScene(sceneJson)
                  }}

                  components={{TextArea}}
            >
                <Field title='模块code'
                       name='moduleId'
                       type='string'
                       x-component='Input'
                />
                <Field title='地区'
                       name='location'
                       type='string'
                       x-component='Input'
                />
                <Field title='browserType'
                       name='browserType'
                       type='string'
                       x-component='Input'
                />
                <Field title='sessionId'
                       name='sessionId'
                       type='string'
                       x-component='Input'
                />
                <Field title='scene' name='scene' type='string' x-component='TextArea' x-component-props={{rows: 4}}/>
                <Field title='user' name='user' type='string' x-component='TextArea' x-component-props={{rows: 4}}/>
                <Field title='extra' name='extra' type='string' x-component='TextArea' x-component-props={{rows: 4}}/>

                <FormButtonGroup>
                    <Submit style={{marginRight: 10}}>确定</Submit>
                </FormButtonGroup>
            </Form>
        </div>
        {ConsultEntry ? <ConsultEntry moduleCode={moduleId}
                                      location={location}
                                      browserType={browserType}
                                      ref={consultEntryRef}
                                      user={user}
                                      scene={scene}
                                      extra={extra}
                                      uc_session_id={sessionId}
        /> : null}
    </div>
}