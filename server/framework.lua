Citizen.CreateThread(function()
    local Framework = nil

    if Config.Framework == "qb-core" then
        Framework = exports["qb-core"]:GetCoreObject()

    elseif Config.Framework == "esx" then
        Framework = exports["es_extended"]:getSharedObject()
        
    end

end)