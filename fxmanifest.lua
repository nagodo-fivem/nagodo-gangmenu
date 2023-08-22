fx_version 'cerulean'
game  'gta5' 

version '1.0.0'

author 'Nagodo'

shared_scripts {
    'shared/exports.lua'

}

client_scripts {
    'client/main.lua',
}

server_scripts {
    'versioncheck.lua',
}

ui_page 'web/build/index.html'

files {
  'web/build/index.html',
  'web/build/**/*'
}

escrow_ignore {
    'shared/exports.lua'
}

lua54 'yes'