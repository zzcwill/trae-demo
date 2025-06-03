import React, { useEffect, useRef, useState, useCallback } from "react";
import "./index.scss";
import { uForm } from "dora";
import Api from "@/request/api-olhelpmanage";
import { get, post, postFile } from "@/request/request";
import { Button, message } from "dpl-react";
import EvaluateType from "./evaluateType";
import FeedbackComponent, {
    feedbackRulesFunc,
    submitType,
} from "@/components/servicesManage/feedback";
import { LifeCycleTypes } from "@/const/config";
import { setDefaultValue, setYNBooleanValue } from "@/utils";

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
    FormSlot,
} = uForm;
const actions = createFormActions();
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};
export default function (props) {
    const [detail, setDetail] = useState(null);
    const feedbackRef = useRef(null);
    const feedbackDataRef = useRef({});

    const getDetail = async function () {
        const data = await get({ url: Api.globalFeedbackDetail });
        if (data.success) {
            console.log('data.data', data.data);
            if(data.data.indicatorSet) {
                const indicatorSet = data.data.indicatorSet
                if (data.data.indicatorSet.evaluation) {
                    data.data.indicatorSet.evaluation.evaluationOrder =
                        data.data.indicatorSet.evaluation.evaluationOrder || 0;
                    data.data.indicatorSet.evaluation.evaluationEnable =
                        data.data.indicatorSet.evaluation.evaluationEnable === "Y";
                    data.data.indicatorSet.evaluation.userInfoEnable =
                        data.data.indicatorSet.evaluation.userInfoEnable === "Y";
                    data.data.indicatorSet.evaluation.dissatisfiedReasonEnable =
                        data.data.indicatorSet.evaluation
                            .dissatisfiedReasonEnable === "Y";
                    data.data.indicatorSet.evaluation.dissatisfiedReasonMultipleEnable =
                        data.data.indicatorSet.evaluation
                            .dissatisfiedReasonMultipleEnable === "Y";
                    data.data.indicatorSet.evaluation.dissatisfiedReasonOptionList =
                        Array.isArray(
                            data.data.indicatorSet.evaluation
                                .dissatisfiedReasonOptionList
                        ) &&
                        data.data.indicatorSet.evaluation
                            .dissatisfiedReasonOptionList.length > 0
                            ? data.data.indicatorSet.evaluation
                                  .dissatisfiedReasonOptionList
                            : [""];
                    // setDefaultValue(indicatorSet, 'evaluation.feedbackDefaultOption', '1');
                    setDefaultValue(indicatorSet, 'evaluation.userInfoRequired', true);
                    setDefaultValue(indicatorSet, 'evaluation.dissatisfiedReasonRequired', true);

                    if (!data.data.indicatorSet.evaluation.feedbackOptionList) {
                      data.data.indicatorSet.evaluation.feedbackOptionList = []
                    }
                    if (!data.data.indicatorSet.evaluation.feedbackOptionConfigList) {
                      data.data.indicatorSet.evaluation.feedbackOptionConfigList = []
                    }
                    if (!data.data.indicatorSet.evaluation.feedbackCollectionOptionList) {
                      data.data.indicatorSet.evaluation.feedbackCollectionOptionList = []
                    }
                }
                if (data.data.indicatorSet.solution) {
                    data.data.indicatorSet.solution.solutionEnable =
                        data.data.indicatorSet.solution.solutionEnable === "Y";
                    data.data.indicatorSet.solution.solutionOrder =
                        data.data.indicatorSet.solution.solutionOrder || 0;
                    // setDefaultValue(indicatorSet, 'solution.solvedDefaultOption', '1');
                    // 采集未解决用户信息
                    setDefaultValue(indicatorSet, 'solution.unsolvedUserInfo.userInfoEnable', false);
                    setDefaultValue(indicatorSet, 'solution.unsolvedUserInfo.userInfoOptionList', ['0', '1']);
                    setDefaultValue(indicatorSet, 'solution.unsolvedUserInfo.userInfoRequired', true);
                    setDefaultValue(indicatorSet, 'solution.unsolvedUserInfo.userInfoTip', '');
                    // 采集未解决原因
                    setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonEnable', false);
                    setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonMultipleEnable', true);
                    setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonRequired', true);
                    setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonTip', '');
                    setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonOptionList', ['']);


                    if (!data.data.indicatorSet.solution.solutionOptionList) {
                      data.data.indicatorSet.solution.solutionOptionList = []
                    }
                    if (!data.data.indicatorSet.solution.solutionOptionConfigList) {
                      data.data.indicatorSet.solution.solutionOptionConfigList = []
                    }
                    if (!data.data.indicatorSet.solution.solutionCollectionOptionList) {
                      data.data.indicatorSet.solution.solutionCollectionOptionList = []
                    }                    
                }
                if (data.data.indicatorSet.score) {
                    data.data.indicatorSet.score.scoreEnable =
                        data.data.indicatorSet.score.scoreEnable === "Y";
                    data.data.indicatorSet.score.scoreOrder =
                        data.data.indicatorSet.score.scoreOrder || 0;
                }
                const defaultQuestionList = [{
                    questionTip: '',
                    multipleEnable: 'Y',
                    solutionOptionRequired: 'N',
                    questionOptionList: ['']
                }]
                if(indicatorSet.customQuestion) {
                    data.data.indicatorSet.customQuestion.customQuestionEnable =
                    indicatorSet.customQuestion.customQuestionEnable === "Y";
                    if(!indicatorSet.customQuestion.questionList || indicatorSet.customQuestion.questionList.length == 0){
                        data.data.indicatorSet.customQuestion.questionList = defaultQuestionList
                    }
                }else {
                    data.data.indicatorSet.customQuestion = {//初始值
                        customQuestionEnable: false,
                        customQuestionOrder: 0,
                        displayNum: 1,
                        questionList: defaultQuestionList ,
                    }
                }


                // 不满意未解决信息采集项-start
                const initEvaluationAndSolutionCollection = {
                  collectionEnable: false,
                  order: 0,
                  evaluationAndSolutionUserInfoCollection: {
                    userInfoEnable: false,
                    userInfoOptionList: [],
                    userInfoRequired: true,
                    userInfoTip: ""
                  },
                  evaluationAndSolutionReasonCollection: {
                    reasonEnable: false,
                    reasonMultipleEnable: true,
                    reasonRequired: true,
                    reasonTip: "",
                    reasonOptionList: ['']
                  }                  
                }

                const { evaluationAndSolutionCollection } = data.data.indicatorSet; 
                if (!evaluationAndSolutionCollection) {
                  data.data.indicatorSet.evaluationAndSolutionCollection = initEvaluationAndSolutionCollection;
                } else {
                  let evaluationAndSolutionUserInfoCollection = evaluationAndSolutionCollection.evaluationAndSolutionUserInfoCollection;

                  if (!evaluationAndSolutionUserInfoCollection) {
                    evaluationAndSolutionUserInfoCollection = {
                      userInfoEnable: '',
                      userInfoOptionList: [],
                      userInfoRequired: '',
                      userInfoTip: ''
                    }                
                  }
    
                  let evaluationAndSolutionReasonCollection = evaluationAndSolutionCollection.evaluationAndSolutionReasonCollection
                  if (!evaluationAndSolutionReasonCollection) {
                    evaluationAndSolutionReasonCollection = {
                      reasonEnable: false,
                      reasonMultipleEnable: true,
                      reasonRequired: true,
                      reasonTip: '',
                      reasonOptionList: []
                    }
                  }

                  data.data.indicatorSet.evaluationAndSolutionCollection = {
                    collectionEnable: evaluationAndSolutionCollection.collectionEnable === 'Y',
                    order: evaluationAndSolutionCollection.order || 0,
                    evaluationAndSolutionUserInfoCollection: {
                      userInfoEnable: evaluationAndSolutionUserInfoCollection.userInfoEnable === 'Y',
                      userInfoOptionList: evaluationAndSolutionUserInfoCollection.userInfoOptionList,
                      userInfoRequired: evaluationAndSolutionUserInfoCollection.userInfoRequired !== 'N',
                      userInfoTip: evaluationAndSolutionUserInfoCollection.userInfoTip
                    },
                    evaluationAndSolutionReasonCollection: {
                      reasonEnable: evaluationAndSolutionReasonCollection.reasonEnable === 'Y',
                      reasonMultipleEnable: evaluationAndSolutionReasonCollection.reasonMultipleEnable !== 'N',
                      reasonRequired: evaluationAndSolutionReasonCollection.reasonRequired !== 'N',
                      reasonTip: evaluationAndSolutionReasonCollection.reasonTip,
                      reasonOptionList: (
                        evaluationAndSolutionReasonCollection.reasonOptionList 
                        && evaluationAndSolutionReasonCollection.reasonOptionList.length === 0 
                        ? ['']
                        : evaluationAndSolutionReasonCollection.reasonOptionList
                      ),
                    }                
                  }
                } 
                // 不满意未解决信息采集项-end         
            }


            let feedbackTypeOptionList = [];
            if (data.data.applicationSet.feedbackTypeOptionList) {
              feedbackTypeOptionList = data.data.applicationSet.feedbackTypeOptionList
            }
            data.data.applicationSet._evaluateType = {
                feedbackTypeOptionList,  
                visitorSendNum: data.data.applicationSet.visitorSendNum,
                agentSendNum: data.data.applicationSet.agentSendNum,
            };

            console.info('getDetail', data.data);
            setDetail(data.data);
        } else {
            message.error("获取满意度配置失败");
        }
    };

    // 校验
    const feedbackRules = async (value) => {
        const res = await feedbackRef.current.submit();
        const result = feedbackRulesFunc(value, res);
        if (result.type === submitType.error) {
            return result.data;
        } else {
            let data = {};
            if (Array.isArray(result.data)) {
                result.data.forEach((resultData) => {
                    if (resultData.data) {
                        Object.assign(data, resultData.data);
                    }
                });
            }
            feedbackDataRef.current = data;
        }
    };
    const setComponentRef = (el) => {
        feedbackRef.current = el.current;
    };
    const submit = function () {
        actions.submit().then(async ({ values }) => {
            if (values.indicatorSet.evaluation) {
                Object.assign(
                    values.indicatorSet.evaluation,
                    feedbackDataRef.current.evaluation
                );
                values.indicatorSet.evaluation.userInfoEnable = values
                    .indicatorSet.evaluation.userInfoEnable
                    ? "Y"
                    : "N";
                values.indicatorSet.evaluation.dissatisfiedReasonEnable = values
                    .indicatorSet.evaluation.dissatisfiedReasonEnable
                    ? "Y"
                    : "N";
                values.indicatorSet.evaluation.dissatisfiedReasonMultipleEnable =
                    values.indicatorSet.evaluation
                        .dissatisfiedReasonMultipleEnable
                        ? "Y"
                        : "N";
                values.indicatorSet.evaluation.evaluationEnable = values
                    .indicatorSet.evaluation.evaluationEnable
                    ? "Y"
                    : "N";
                values.indicatorSet.evaluation.feedbackDefaultOption = values.indicatorSet.evaluation.feedbackDefaultOption?.[0];
            }
            if (values.indicatorSet.score) {
                Object.assign(
                    values.indicatorSet.score,
                    feedbackDataRef.current.score
                );
                values.indicatorSet.score.scoreEnable = values.indicatorSet
                    .score.scoreEnable
                    ? "Y"
                    : "N";
            }
            if (values.indicatorSet.solution) {
                Object.assign(
                    values.indicatorSet.solution,
                    feedbackDataRef.current.solution
                );
                values.indicatorSet.solution.solutionEnable = values
                    .indicatorSet.solution.solutionEnable
                    ? "Y"
                    : "N";
                values.indicatorSet.solution.solvedDefaultOption = values.indicatorSet.solution.solvedDefaultOption?.[0];
            }
            if (values.indicatorSet.customQuestion) {
                // debugger
                delete feedbackDataRef.current.customQuestion.displayNum
                Object.assign(
                    values.indicatorSet.customQuestion,
                    feedbackDataRef.current.customQuestion
                );
                values.indicatorSet.customQuestion.customQuestionEnable = values
                    .indicatorSet.customQuestion.customQuestionEnable
                    ? "Y"
                    : "N";
                if(!values.indicatorSet.customQuestion.customQuestionEnable) {
                    values.indicatorSet.customQuestion.questionList = []
                }
            }
            values.applicationSet = {
                ...values.applicationSet,
                ...values.applicationSet._evaluateType,
            };
            setYNBooleanValue(values.indicatorSet, 'evaluation.userInfoRequired');
            setYNBooleanValue(values.indicatorSet, 'evaluation.dissatisfiedReasonRequired');
            setYNBooleanValue(values.indicatorSet, 'solution.unsolvedUserInfo.userInfoEnable');
            setYNBooleanValue(values.indicatorSet, 'solution.unsolvedUserInfo.userInfoRequired');
            setYNBooleanValue(values.indicatorSet, 'solution.unsolvedReason.unsolvedReasonEnable');
            setYNBooleanValue(values.indicatorSet, 'solution.unsolvedReason.unsolvedReasonMultipleEnable');
            setYNBooleanValue(values.indicatorSet, 'solution.unsolvedReason.unsolvedReasonRequired');
            
            delete values.applicationSet._evaluateType;

            // 不满意未解决信息采集项-start
            if (values.indicatorSet.evaluationAndSolutionCollection) {
              Object.assign(
                values.indicatorSet.evaluationAndSolutionCollection,
                feedbackDataRef.current.evaluationAndSolutionCollection
              );
            }
            setYNBooleanValue(values.indicatorSet, 'evaluationAndSolutionCollection.collectionEnable');
            setYNBooleanValue(values.indicatorSet, 'evaluationAndSolutionCollection.evaluationAndSolutionUserInfoCollection.userInfoEnable');
            setYNBooleanValue(values.indicatorSet, 'evaluationAndSolutionCollection.evaluationAndSolutionUserInfoCollection.userInfoRequired');
            setYNBooleanValue(values.indicatorSet, 'evaluationAndSolutionCollection.evaluationAndSolutionReasonCollection.reasonEnable');
            setYNBooleanValue(values.indicatorSet, 'evaluationAndSolutionCollection.evaluationAndSolutionReasonCollection.reasonMultipleEnable');
            setYNBooleanValue(values.indicatorSet, 'evaluationAndSolutionCollection.evaluationAndSolutionReasonCollection.reasonRequired');
            // 不满意未解决信息采集项-end         

            console.info('submit_data', values);
            const data = await post({
                url: Api.globalFeedbackSave,
                data: values,
            });
            if (data.success) {
                message.success("保存成功");
            } else {
                message.error(data.message);
            }
        });
    };
    useEffect(() => {
        getDetail();
    }, []);
    return (
        <div className="feed-back">
            {detail ? (
                <SchemaForm
                    actions={actions}
                    initialValues={detail}
                    components={{ EvaluateType, FeedbackComponent }}
                >
                    <FormSlot>
                        <div className="box-title">指标设置</div>
                    </FormSlot>
                    <Field
                        type="Object"
                        name="indicatorSet"
                        x-component="FeedbackComponent"
                        x-props={{
                            setComponentRef,
                            isShowDiff: true,
                        }}
                        x-rules={feedbackRules}
                    />
                    <FormSlot>
                        <div className="box-line"></div>
                        <div className="box-title">应用设置</div>
                    </FormSlot>
                    <Field type="object" name="applicationSet">
                        <Field
                            type="object"
                            name="_evaluateType"
                            x-component="EvaluateType"
                            title="评价方式"
                            {...formItemLayout}
                            x-rules={(value) => {
                                if (
                                    value.feedbackTypeOptionList.indexOf("1") >=
                                    0
                                ) {
                                    if (
                                        !value.visitorSendNum ||
                                        !value.agentSendNum
                                    ) {
                                        return {
                                            message:
                                                "访客发送条数和客服发送条数必填",
                                            type: "error",
                                        };
                                    }
                                }
                            }}
                        />
                        <Field
                            type="string"
                            name="feedbackResultOptionList"
                            x-component="CheckboxGroup"
                            title="评价结果"
                            {...formItemLayout}
                            x-component-props={{
                                options: [
                                    {
                                        label: "在客服对话窗口内容显示访客评价",
                                        value: "1",
                                    },
                                    {
                                        label: "访客评价不满意时弹窗提醒客服",
                                        value: "2",
                                    },
                                    {
                                        label: "近30天有不满意评价时提醒客服",
                                        value: "3",
                                    },
                                ],
                                direction: "vertical",
                            }}
                        />
                    </Field>
                    <div className="btn-group">
                        <Button type="primary" onClick={submit}>
                            提交
                        </Button>
                    </div>
                </SchemaForm>
            ) : null}
        </div>
    );
}
