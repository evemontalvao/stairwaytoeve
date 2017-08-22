module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/stairwaytoeve',
            repositoryUrl: 'git@github.com:evemontalvao/stairwaytoeve.git',
            ignores: ['.git', 'node_modules', 'dev', 'articles'],
            keepReleases: 5,
            servers: 'eve@138.197.28.94'
        },
        production: {
            deployTo: '/home/eve/stairwaytoeve/production',
            environment: 'production',
            branch: 'master',
            port: '80'
        }
    });
};