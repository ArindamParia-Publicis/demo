const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "sqp_8c7ff1d051ee4d4c700a79725e6e5024688f8eb1",
        options: {
            'sonar.projectName': 'BANK-PROJECT-PS',
            'sonar.projectDescription': 'Fontend part of PS BANK',
            'sonar.projectKey': 'BANK-PROJECT-PS',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)