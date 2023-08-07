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

RegisterNUICallback('fetchRoleData', function(data, cb)
    local role_id = data.role_id

    local role_data = exports['nagodo-gangs']:GetRoleData(role_id)

    cb(role_data)
end)

RegisterNUICallback('fetchMemberData', function(data, cb)
    local member_id = data.member_id

    local member_data = exports['nagodo-gangs']:GetMemberData(member_id)

    cb(member_data)
end)

RegisterNUICallback('fetchRankSeletorOptions', function(data, cb)
    local rank_selector_options = exports['nagodo-gangs']:GetRankSelectorOptions()

    cb(rank_selector_options)
end)

RegisterNUICallback('saveMember', function(data, cb)
    local memberData = data.newData.current

    local success = exports['nagodo-gangs']:UpdateMemberRank(memberData)
    cb(success)
end)

RegisterNUICallback('saveRole', function(data, cb)
    local roleData = data.newData.current

    local success = exports['nagodo-gangs']:UpdateRoleData(roleData)
    cb(success)
end)

RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)
