param (
    [string]
    $jsonReportPath="$PSScriptRoot\..\reports\ci.json"
)

function GetFailingTestFilePaths([string] $reportJsonPath)
{
    if(-! $(Test-Path $reportJsonPath))
    {
        throw "Could not find json-formatted Cucumber report at $reportJsonPath";
    }

    function Fixture-HasFailingSubTests($fixture)
    {
        return $fixture.tests | ? { $_.errs.Count -gt 0 };
    }

    $testOutput = Get-Content $reportJsonPath | ConvertFrom-Json;

    return $testOutput.fixtures |
        ? { return Fixture-HasFailingSubTests($_) } |
        % { $_.path }
}


function PrependDevTag([string] $absolutePath)
{
    if(-! $(Test-Path $absolutePath))
    {
        throw "Could not find fixture file $absolutePath";
    }

    $content = Get-Content $absolutePath;
    Set-Content $absolutePath -value '@dev',$content;
}

$paths = GetFailingTestFilePaths($jsonReportPath);
$paths | % { PrependDevTag($_) }