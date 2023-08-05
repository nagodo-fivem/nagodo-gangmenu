--CLIENT SIDE
exports('OpenGangMenu', function()
    OpenMenu()
end)

function OpenMenu()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "open",
        data = true
    })
end

RegisterNUICallback('fetchMembers', function(data, cb)
    local members = exports['nagodo-gangs']:GetAllMembers()

    cb(members)
end)

RegisterNUICallback('fetchRoles', function(data, cb)
    local roles = exports['nagodo-gangs']:GetAllRoles()
   
    cb(roles)
end)

RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)
