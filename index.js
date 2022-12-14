const process = require("process");
const core = require("@actions/core");
const exec = require("@actions/exec");

async function main() {
  try {
    // Fix for GitHub actions macos-11 screencapture not working
    // REF: https://github.com/actions/runner-images/issues/5960
    const width = core.getInput("resolutionWidth") || "1920";
    const height = core.getInput("resolutionHeight") || "1080";

    await exec.exec(
      `"/Library/Application Support/VMware Tools/vmware-resolutionSet" ${width} ${height}`
    );

    // Run generic screenreader setup
    process.argv.push("--ci");
    require("@guidepup/setup");
  } catch (err) {
    core.setFailed(err);
    process.exit();
  }
}

main();
