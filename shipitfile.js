module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/stairwaytoeve',
            repositoryUrl: 'git@github.com:evemontalvao/stairwaytoeve.git',
            ignores: ['.git', 'node_modules', 'dev', 'articles'],
            keepReleases: 5,
<<<<<<< HEAD
            servers: 'eve@138.197.28.94'
=======
            servers: 'eve@138.197.28.94',
            dirToCopy: '/public'
>>>>>>> b2e46d848ce5837ea58c7be3dd547dac8c55cc2b
        },
        production: {
            deployTo: '/home/eve/stairwaytoeve/production',
            environment: 'production',
            branch: 'master',
            port: '80'
        }
    });
};