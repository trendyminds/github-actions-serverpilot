const core = require("@actions/core");
const github = require("@actions/github");

try {
  const nameToGreet = core.getInput("client_id");
  console.log(nameToGreet);
} catch (error) {
  core.setFailed(error.message);
}
