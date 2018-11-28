/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type AddPayrollLogVariables = {
  logCsvString: string;
};

export type AddPayrollLogMutation = {
  __typename?: "Mutation";

  addPayrollLog: AddPayrollLogAddPayrollLog;
};

export type AddPayrollLogAddPayrollLog = {
  __typename?: "PayrollLog";

  id: string;
};

export type GetPayrollReportsVariables = {};

export type GetPayrollReportsQuery = {
  __typename?: "Query";

  payrollReports: GetPayrollReportsPayrollReports[];
};

export type GetPayrollReportsPayrollReports = {
  __typename?: "PayrollReport";

  employee: number;

  year: number;

  month: number;

  isFirstHalf: boolean;

  amountPaid: number;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const AddPayrollLogDocument = gql`
  mutation AddPayrollLog($logCsvString: String!) {
    addPayrollLog(logCsvString: $logCsvString) {
      id
    }
  }
`;
export class AddPayrollLogComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<AddPayrollLogMutation, AddPayrollLogVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<AddPayrollLogMutation, AddPayrollLogVariables>
        mutation={AddPayrollLogDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddPayrollLogProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddPayrollLogMutation, AddPayrollLogVariables>
> &
  TChildProps;
export type AddPayrollLogMutationFn = ReactApollo.MutationFn<
  AddPayrollLogMutation,
  AddPayrollLogVariables
>;
export function AddPayrollLogHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddPayrollLogMutation,
        AddPayrollLogVariables,
        AddPayrollLogProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddPayrollLogMutation,
    AddPayrollLogVariables,
    AddPayrollLogProps<TChildProps>
  >(AddPayrollLogDocument, operationOptions);
}
export const GetPayrollReportsDocument = gql`
  query GetPayrollReports {
    payrollReports {
      employee
      year
      month
      isFirstHalf
      amountPaid
    }
  }
`;
export class GetPayrollReportsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetPayrollReportsQuery, GetPayrollReportsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetPayrollReportsQuery, GetPayrollReportsVariables>
        query={GetPayrollReportsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetPayrollReportsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetPayrollReportsQuery, GetPayrollReportsVariables>
> &
  TChildProps;
export function GetPayrollReportsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetPayrollReportsQuery,
        GetPayrollReportsVariables,
        GetPayrollReportsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetPayrollReportsQuery,
    GetPayrollReportsVariables,
    GetPayrollReportsProps<TChildProps>
  >(GetPayrollReportsDocument, operationOptions);
}
