const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

const OPTS = {
  action: core.getInput("action"),
  client_id: core.getInput("client_id"),
  api_key: core.getInput("api_key"),
  system_user: core.getInput("system_user"),
  app_name: core.getInput("app_name"),
  php_version: core.getInput("php_version"),
  ssl: true,
  db: true
};

(async () => {
  if (OPTS.action === "create") {
    try {
      // Create the new application
      const newApp = axios({
        url: "https://api.serverpilot.io/v1/apps",
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          username: OPTS.client_id,
          password: OPTS.api_key
        },
        data: {
          name: "",
          sysuserid: OPTS.system_user,
          runtime: `php${OPTS.php_version}`,
          domains: OPTS.domains
        }
      });

      console.log(newApp.data.data);
    } catch (error) {
      core.setFailed(error.message);
    }
  }

  if (OPTS.action === "delete") {
  }
})();
