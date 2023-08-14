
local repoName = "nagodo-fivem/nagodo-fivem-version"
local fileName = "nagodo-gangmenu.md"

function VersionCheck()
    local resource = GetCurrentResourceName()

    local currentversion = GetResourceMetadata(resource, 'version', 0)
    
    if currentversion then
        currentversion = currentversion:match('%d+%.%d+%.%d+')
    end

    if not currentversion then return end

    SetTimeout(2000, function()

        Citizen.CreateThread(function()
            local githubFileURL = string.format("https://raw.githubusercontent.com/%s/main/%s", repoName, fileName)

            PerformHttpRequest(githubFileURL, function(statusCode, responseText, headers)
                if statusCode == 200 then
                    local latestVersion = responseText:match('%d+%.%d+%.%d+')
                    
                    if currentversion ~= latestVersion then
                        print("^3-------------------------------------------------------------^0")
                        print(string.format("^3 A new version of %s is available! ^0", resource))
                        print(string.format("^3 Current version: ^7%s ^3Latest version: ^7%s^0", currentversion, latestVersion))
                        print(string.format("^3 Check out the latest changes here: https://github.com/%s/tree/main/%s ^0", repoName, fileName))
                        print("^3-------------------------------------------------------------^0")
                    end
                
                end
            end, 'GET')
        end)
    end)
end

VersionCheck()