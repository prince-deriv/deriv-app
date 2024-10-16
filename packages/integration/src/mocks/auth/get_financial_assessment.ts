import { Context } from 'Utils/mocks/mocks';

export default function mock_get_financial_assessment(context: Context) {
    if ('get_financial_assessment' in context.request && context.request.get_financial_assessment === 1) {
        context.response = {
            echo_req: {
                get_financial_assessment: 1,
                req_id: context.req_id,
            },
            get_financial_assessment: {},
            msg_type: 'get_financial_assessment',
            req_id: context.req_id,
        };
    }
}
