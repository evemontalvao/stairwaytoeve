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

    shipit.blTask('npm', function() {
        return shipit.local('cd '+shipit.config.workspace + ' && npm install');
    });

    shipit.blTask('restart',['npm'], function() {
        shipit.remote('sudo pm2 delete ' + shipit.config.branch + ' || true && sudo pm2 delete server.js'
      + ' && cd ' + shipit.currentPath
      + ' && PORT=' + shipit.config.port + ' pm2 start server.js -f --name=' + shipit.config.branch);
    });

    shipit.start('deploy', 'npm', 'restart');
};