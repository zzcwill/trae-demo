import {useRef} from "react";

const useFormQueryNoChangeParams = (defaultParams = {}) => {
    const params = useRef()
    const trigger = useRef()
    const flag = useRef()
    return [
        () => {
            flag.current = true
            if (trigger.current) {
                trigger.current()
            }
        },
        ({context}) => {
            trigger.current = context.trigger
            return {
                onFormWillQuery(payload, next) {
                    params.current = {
                        filters: context.filters,
                        pagination: context.pagination,
                        sorter: context.sorter
                    }
                    return next(payload)
                },
                onFormSubmitQuery(payload, next) {
                    if (flag.current) {
                        flag.current = false
                        context.setPagination(Object.assign({}, params.current.pagination))
                        context.setSorter(Object.assign({}, params.current.sorter))
                        context.setFilters(Object.assign({}, params.current.filters))
                        return next(payload)
                    } else {
                        return next(payload)
                    }
                }
            }
        }
    ]
}

export default useFormQueryNoChangeParams
