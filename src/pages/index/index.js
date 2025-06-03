import React, { Suspense, useMemo, useEffect, lazy, Component } from 'react'
import { Loading } from 'dpl-react'
import { getCurrentUser } from "@/utils/getPermission";
import { useStoreActions } from 'easy-peasy'
import renderRoute from '../../router'
import './index.scss'

function Main() { 
  const setUserInfo = useStoreActions((actions) => {
		return actions.commonUserInfo.setUserInfo
	})

	useEffect(() => {
		getCurrentUser().then((data) => {
			if (data.id) {
				setUserInfo(data)
				sessionStorage.setItem('__userInfo', JSON.stringify(data))
			}
		})
	}, [])

  return (
    <div className="index-layout">
      <div className="index-layout-box">
        <div className="right-content">
          <Suspense fallback={<Loading text="加载中" visible={true} />}>
            {renderRoute()}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
export default class Index extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      return true;
    }
    return false;
  }

  render() {
    return <Main />;
  }
}
