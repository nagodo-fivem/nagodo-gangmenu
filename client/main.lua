local QBCore = exports['qb-core']:GetCoreObject()
local translationsSet = false

function OpenMenu()
   
    if not translationsSet then
        local translations = exports['nagodo-gangs']:GetTranslations()
        SendNUIMessage({
            action = "setTranslations",
            data = translations
        })
        translationsSet = true
    end

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

RegisterNUICallback('fetchAllies', function(data, cb)
    local allies = exports['nagodo-gangs']:GetAllAllies()

    cb(allies)
end)

RegisterNUICallback('sendAllyRequest', function(data, cb)
    local identifier = data.gangIdentifier

    local done = exports['nagodo-gangs']:SendAllyRequest(identifier)

    cb(done)
end)

RegisterNUICallback('fetchAllySelectorOptions', function(data, cb)
    local ally_selector_options = exports['nagodo-gangs']:GetAllySelectorOptions()

    cb(ally_selector_options)

end)

RegisterNUICallback('cancelAllyRequest', function(data, cb)
    local identifier = data.gangIdentifier

    local done = exports['nagodo-gangs']:CancelAllyRequest(identifier)

    cb(done)
end)

RegisterNUICallback('acceptAllyRequest', function(data, cb)
    local identifier = data.gangIdentifier

    local done = exports['nagodo-gangs']:AcceptAllyRequest(identifier)

    cb(done)
end)

RegisterNUICallback('denyAllyRequest', function(data, cb)
    local identifier = data.gangIdentifier

    local done = exports['nagodo-gangs']:DenyAllyRequest(identifier)

    cb(done)
end)

RegisterNUICallback('removeAlly', function(data, cb)
    local identifier = data.gangIdentifier

    local done = exports['nagodo-gangs']:RemoveAlly(identifier)

    cb(done)
end)

RegisterNUICallback('fetchPermission', function(data, cb)
    local permission_name = data.permission_name

    local hasPermission = exports['nagodo-gangs']:DoesLocalPlayerHavePermissionInGang(permission_name)
 
    cb(hasPermission)
end)

RegisterNUICallback('fetchPermissions', function(data, cb)
    local permissions = data.permissions
    
    local hasPermissionList = exports['nagodo-gangs']:DoesLocalPlayerHavePermissionsInGang(permissions)

    cb(hasPermissionList)
end)


RegisterNUICallback('addNewMember', function(data, cb)
    local id = tonumber(data.member_id)

    local done = exports['nagodo-gangs']:AddNewMember(id)

    cb(done)
end)

RegisterNUICallback('kickMember', function(data, cb)
    local id = data.member_id

    local done = exports['nagodo-gangs']:KickMember(id)

    cb(done)
end)

RegisterNUICallback('fetchIsBoss', function(data, cb)
    local Player = QBCore.Functions.GetPlayerData()
    local gang = Player.gang
   
    local isBoss = gang.isboss
    
    if isBoss == nil then
        isBoss = false
    end

    cb(isBoss)

end)

RegisterNUICallback('bankAction', function(data, cb)
    local action = data.type
    local value = data.value
    local account = data.account
   
    local done = exports['nagodo-gangs']:BankAction(action, value, account)

    cb(done)
end)

RegisterNUICallback('fetchAccounts', function(data, cb)
    local accounts = exports['nagodo-gangs']:GetBankAccounts()

    cb(accounts)
end)

RegisterNUICallback('addNewAccount', function(data, cb)
    local accountName = data.account_name

    local done = exports['nagodo-gangs']:AddNewBankAccount(accountName)
   
    cb(done)
end)

RegisterNUICallback('fetchAccountSeletorOptions', function(data, cb)
    local accounts = exports['nagodo-gangs']:GetBankAccountSelectorOptions()

    cb(accounts) 
end)

RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)
