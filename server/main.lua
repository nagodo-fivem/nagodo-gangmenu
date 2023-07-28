--SERVER SIDE
local fightLocations = {}

Citizen.CreateThread(function()
    InitFightLocations()
end)

function InitFightLocations()
    for k,v in pairs(Config.Locations) do
        local new_fightlocation = FightLocation(k)

        fightLocations[k] = new_fightlocation
    end
end

function FightLocation(id)
    local self = {}

    self.id = id
    self.fightCreated = false
    self.fightStarted = false
   
    return self
end

RegisterServerEvent('nagodo-hobofight:TryToCreateFight', function(location)
    local src = source
    local fightLocation = fightLocations[location]
    if not fightLocation.fightCreated then
        fightLocation.fightCreated = true
        TriggerClientEvent('nagodo-hobofight:CreateFight', -1, location, src)
    end
end)

RegisterServerEvent('nagodo-hobofight:TryToStartFight', function(location)
    local src = source
    local fightLocation = fightLocations[location]
    if fightLocation.fightCreated and not fightLocation.fightStarted then
        fightLocation.fightStarted = true
        TriggerClientEvent('nagodo-hobofight:StartFight', -1, location, src)
    end

end)