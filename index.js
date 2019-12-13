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
      const appRes = await axios({
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
          name: OPTS.app_name,
          sysuserid: OPTS.system_user,
          runtime: `php${OPTS.php_version}`,
          domains: OPTS.domains
        }
      });

      const newApp = appRes.data.data;

      console.log(newApp);

      // Create a database for the application
      await axios({
        url: "https://api.serverpilot.io/v1/dbs",
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          username: OPTS.client_id,
          password: OPTS.api_key
        },
        data: {
          appid: newApp.id,
          name: OPTS.app_name,
          user: {
            name: OPTS.app_name,
            password:
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
          }
        }
      });

      console.log("on to the SSL");

      await axios({
        url: `https://api.serverpilot.io/v1/apps/${newApp.id}/ssl`,
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          username: OPTS.client_id,
          password: OPTS.api_key
        },
        data: {
          auto: true
        }
      });

      console.log("done with the SSL. auto-enabling");

      // Force an SSL
      await axios({
        url: `https://api.serverpilot.io/v1/apps/${newApp.id}/ssl`,
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          username: OPTS.client_id,
          password: OPTS.api_key
        },
        data: {
          force: true
        }
      });

      console.log("all done");
    } catch (error) {
      core.setFailed(error);
    }
  }

  if (OPTS.action === "delete") {
  }
})();
