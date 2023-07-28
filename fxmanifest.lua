fx_version 'cerulean'
game  'gta5' 

author 'Nagodo'

shared_scripts {
    'shared/config.lua'
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    'server/main.lua',
}

ui_page 'web/build/index.html'

files {
  'web/build/index.html',
  'web/build/**/*'
}

escrow_ignore {
    'shared/config.lua'
}

lua54 'yes'