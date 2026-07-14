import * as core from "@actions/core";
import axios, { AxiosRequestConfig } from "axios";

export async function run(): Promise<void> {
  try {
    const apiKey = core.getInput("key");
    const typeOfMessage = core.getInput("type");
    const format = core.getInput("format");
    const content = core.getInput("content");
    const channel = core.getInput("channel");
    const workspaceId = core.getInput("workspaceId");
    const apiDomain = core.getInput("apiUrl");
    const apiUrl = `${apiDomain}/api/v3/workspaces/${workspaceId}/chat/channels/${channel}/messages`;
    const headers = {
      Authorization: apiKey,
      accept: "application/json",
      "content-type": "application/json"
    };

    const requestBody = {
      type: typeOfMessage,
      content_format: format,
      content: content
    };

    const requestBodyJson = JSON.stringify(requestBody);
    core.info(`Seding request to channel ${channel}`);

    const config: AxiosRequestConfig = {
      url: apiUrl,
      method: "POST",
      headers: headers,
      data: requestBodyJson
    };

    const response = await axios(config);
    core.setOutput("response-status", response.status.toString());
    const responseData = JSON.stringify(response.data);
    core.setOutput("response-data", responseData);

    core.setOutput("messageId", response.data?.id);
    core.info(`API request succeeded with status code ${response.status.toString()}`);
  } catch (error: any) {
    core.info(`Response error ${JSON.stringify(error)}`);
    core.setFailed(`API request failed: ${error?.message}`);
  }
}
