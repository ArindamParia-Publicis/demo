const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqp_8c7ff1d051ee4d4c700a79725e6e5024688f8eb1",
    options: {
      "sonar.projectName": "BANK-PROJECT-PS",
      "sonar.projectDescription": "Fontend part of PS BANK",
      "sonar.projectKey": "BANK-PROJECT-PS",
      "sonar.projectVersion": "0.0.1",
      "sonar.sourceEncoding": "UTF-8",
      "sonar.language": "javascript",
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.jsx,**/*.test.js",
      "sonar.tests": "./src",
      "sonar.test.inclusions": "**/*.test.jsx,**/*.test.js",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "test-report.xml",
    },
  },
  () => process.exit(),
);
