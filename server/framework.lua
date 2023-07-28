Citizen.CreateThread(function()
    local Framework = nil

    if Config.Framework == "qb-core" then
        Framework = exports["qb-core"]:GetCoreObject()

    elseif Config.Framework == "esx" then
        Framework = exports["es_extended"]:getSharedObject()
        
    end

    function GetPlayerCash()

    end

    function GetPlayerBankMoney()

    end

    function RemovePlayerCash()

    end

    function RemovePlayerBankMoney()

    end

end)