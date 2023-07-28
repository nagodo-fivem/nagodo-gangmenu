--CLIENT SIDE
local menuOpen = false
local menuJustClosed = false
local currentLocation = nil
local fightLocations = {}

RegisterNetEvent('nagodo-hobofight:CreateFight', function(location, owner_id)
    local fightLocation = fightLocations[location]
    fightLocation.fightIsCreated = true

    if menuOpen then
        SetNuiFightState()
    end

    local player_id = GetPlayerServerId(PlayerId())
    if player_id == owner_id then
        fightLocation.isOwner = true
    end

    if fightLocation.isOwner then
        fightLocation.SpawnFighters()
    end
    
end)

RegisterNetEvent('nagodo-hobofight:StartFight', function(location, owner_id)
    local fightLocation = fightLocations[location]
    fightLocation.fightIsStarted = true

    if fightLocation.isOwner then
        fightLocation.StartFight()
    end

    SetNuiFightState()
end)

function FightLocation(index, coords)
    local self = {}

    self.index = index
    self.isOwner = false
    self.coords = coords
    self.isPlayerClose = false

    self.fightIsCreated = false

    self.gameMasterPed = nil
    self.fighterPeds = {}

    self.CheckGameMaster = function()
        if not DoesEntityExist(self.gameMasterPed) then
            self.SpawnGameMaster()
        end
    end

    self.SpawnGameMaster = function()
        print("Spawning game master")
        local pedModel = Config.Locations[self.index].gameMaster.ped

        local hash = type(pedModel) == "string" and GetHashKey(pedModel) or pedModel

        LoadPedModel(hash)

        local ped = CreatePed(4, hash, self.coords, Config.Locations[self.index].gameMaster.heading, false, false)
        SetEntityAsMissionEntity(ped, true, true)
        SetPedHearingRange(ped, 0.0)
        SetPedSeeingRange(ped, 0.0)
        SetPedAlertness(ped, 0.0)
        SetPedFleeAttributes(ped, 0, 0)
        SetBlockingOfNonTemporaryEvents(ped, true)
        SetEntityInvincible(ped, true)
        SetPedCombatAbility(ped, 0)
        
        FreezeEntityPosition(ped, true)

        self.gameMasterPed = ped
    end

    self.DeleteGameMaster = function()
        if DoesEntityExist(self.gameMasterPed) then
            DeleteEntity(self.gameMasterPed)
            self.gameMasterPed = nil
        end
    end

    self.SpawnFighters = function()
        local fighter_1 = Fighter(Config.Locations[self.index].spawnPositions[1], Config.Locations[self.index].startPositions[1])
        local fighter_2 = Fighter(Config.Locations[self.index].spawnPositions[2], Config.Locations[self.index].startPositions[2])

        fighter_1.Spawn()
        fighter_2.Spawn()

        self.fighterPeds[1] = fighter_1
        self.fighterPeds[2] = fighter_2
    end

    self.StartFight = function()
        self.fighterPeds[1].SetupPedSettings()
        self.fighterPeds[2].SetupPedSettings()

        self.fighterPeds[1].GotoStartPosition()
        self.fighterPeds[2].GotoStartPosition()

        Citizen.Wait(2500)

        self.fighterPeds[1].StartFight()
        self.fighterPeds[2].StartFight()
    end

    return self
end

function Fighter(spawnPosition, startPosition)
    local self = {}

    self.ped = nil

    self.spawnPosition = spawnPosition
    self.startPosition = startPosition

    self.Spawn = function()
        local pedModel = Config.FighterModels[math.random(1, #Config.FighterModels)]
        local hash = type(pedModel) == "string" and GetHashKey(pedModel) or pedModel

        LoadPedModel(hash)

        local ped = CreatePed(4, hash, self.spawnPosition.coords, self.spawnPosition.heading, true, true)
        SetEntityAsMissionEntity(ped, true, true)
        SetPedHearingRange(ped, 0.0)
        SetPedSeeingRange(ped, 0.0)
        SetPedAlertness(ped, 0.0)
        SetPedFleeAttributes(ped, 0, false)
        SetBlockingOfNonTemporaryEvents(ped, true)
        SetEntityInvincible(ped, true)
        SetPedCombatAbility(ped, 0)
        
        FreezeEntityPosition(ped, true)

        self.ped = ped
    end

    self.SetupPedSettings = function()
        SetEntityOnlyDamagedByRelationshipGroup(self.ped, true, GetHashKey("fighter"))
        SetPedCanBeTargetted(self.ped, false)
		SetPedCanBeTargettedByPlayer(self.ped, PlayerPedId(), false)		
		SetPedRelationshipGroupHash(self.ped, GetHashKey('Hobo'))
    end

    self.GotoStartPosition = function()     
        FreezeEntityPosition(self.ped, false)
        TaskGoStraightToCoord(self.ped, self.startPosition.coords, 2.0, -1, self.startPosition.heading, 1.0)
    end

    self.StartFight = function()
        RegisterHatedTargetsAroundPed(self.ped, 50.0)
		TaskCombatHatedTargetsAroundPed(self.ped, 50.0, 0)
    end

    return self
end


Citizen.CreateThread(function()

    InitFightLocations()

    while true do
		local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)

        for k,v in pairs(fightLocations) do
            local dist = #(playerCoords - v.coords)

            if dist < 50.0 then
                v.isPlayerClose = true
                v.CheckGameMaster()
                
            else
                v.isPlayerClose = false
                v.DeleteGameMaster()
            end
        end 

        Citizen.Wait(5000)
    end
end)


Citizen.CreateThread(function()
    local sleep = 5000
    while true do
        if menuJustClosed then
            menuJustClosed = false
            Citizen.Wait(5000)
        end
        if next(fightLocations) then
            local playerPed = PlayerPedId()
            local playerCoords = GetEntityCoords(playerPed)
            for k, v in pairs(fightLocations) do
                if v.isPlayerClose then
                    sleep = 1000
                    if not menuOpen then
                        local dist = #(playerCoords - v.coords)
                        if dist < 2.0 then
                            currentLocation = v.index
                            OpenNuiMenu()
                            menuOpen = true            
                        end
                    end
                end
            end
        end
        Citizen.Wait(sleep)
    end

end)

function InitFightLocations()
    print("Init fight locations")
    for k,v in pairs(Config.Locations) do
        print("Init fight location: " .. k)
        local fightLocation = FightLocation(k, v.gameMaster.coords)
        fightLocations[k] = fightLocation
    end
end

function InitPedRelationshipGroups()
    AddRelationshipGroup("fighter", GetHashKey("fighter"))
    SetRelationshipBetweenGroups(5, GetHashKey("fighter"), GetHashKey("fighter"))
    SetRelationshipBetweenGroups(5, GetHashKey("fighter"), GetHashKey("PLAYER"))
    SetRelationshipBetweenGroups(5, GetHashKey("PLAYER"), GetHashKey("fighter"))
end

function LoadPedModel(hash)
    RequestModel(hash)
    while not HasModelLoaded(hash) do
        Citizen.Wait(10)
    end
end

function OpenNuiMenu()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "open",
        data = nil
    })

    SetNuiFightState()
end

function SetNuiFightState()
    local fightIsCreated = fightLocations[currentLocation].fightIsCreated
    local fightIsStarted = fightLocations[currentLocation].fightIsStarted
    print("Set fight is created: " .. tostring(fightIsCreated))
    SendNUIMessage({
        action = "setFightIsCreated",
        data = fightIsCreated
    })
    SendNUIMessage({
        action = "setFightIsStarted",
        data = fightIsStarted
    })

end

function CreateFight()
    TriggerServerEvent('nagodo-hobofight:TryToCreateFight', currentLocation)

end

function StartFight()
    TriggerServerEvent('nagodo-hobofight:TryToStartFight', currentLocation)
end

RegisterNUICallback("createFightPressed", function(data, cb)
    CreateFight()
    cb("ok")
end)

RegisterNUICallback('startFightPressed', function(data, cb)
    StartFight()
    cb('ok')
end)



RegisterNuiCallback("close", function(data, cb)
    SetNuiFocus(false, false)
    menuOpen = false
    menuJustClosed = true
    cb("ok")
end)
