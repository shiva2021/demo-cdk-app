import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { TestCdkAppStack } from "../lib/test-cdk-app-stack";

// example test. To run these tests, uncomment this file along with the
// example resource in lib/test-cdk-app-stack.ts
test("SQS Queue Created", () => {
    const app = new cdk.App();

    const testCdkAppStack = new TestCdkAppStack(app, "TestCdkAppStack");

    const template = Template.fromStack(testCdkAppStack);

    template.hasResourceProperties("AWS::Lambda::Function", {
        Handler: "index.handler",
        Runtime: "nodejs16.x",
      });

    template.resourceCountIs("AWS::Lambda::Function", 2);
});


/** 
By setting the logRetention prop for our lambda function, 
we created a custom CloudFormation resource.

The custom resource is responsible for:

1. creating a log group for the function, if one doesn't already exist
2. updating the log retention period to the specified number of days

If we look at the resources, our stack has provisioned, 
we can see that there are 2 lambda functions - 
ours and a custom resource, automatically created for us by CDK
*/