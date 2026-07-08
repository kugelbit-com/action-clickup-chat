"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
const axios_1 = __importDefault(require("axios"));
async function run() {
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
        const config = {
            url: apiUrl,
            method: "POST",
            headers: headers,
            data: requestBodyJson
        };
        const response = await (0, axios_1.default)(config);
        core.setOutput("response-status", response.status.toString());
        const responseData = JSON.stringify(response.data);
        core.setOutput("response-data", responseData);
        core.setOutput("messageId", response.data?.id);
        core.info(`API request succeeded with status code ${response.status.toString()}`);
    }
    catch (error) {
        core.info(`Response error ${JSON.stringify(error)}`);
        core.setFailed(`API request failed: ${error?.message}`);
    }
}
