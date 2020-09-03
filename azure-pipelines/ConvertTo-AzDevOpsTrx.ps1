<#
.SYNOPSIS
  Fixes issue where testcafe-reporter-trx does not fill in all relevant fields in TRX report

.DESCRIPTION
  This script is a workaround for the above issue, using Regex to pull the Feature (fixture) and test name from the UnitTest name and writing into the TestMethod.className and TestMethod.name

.PARAMETER trxReportPath
  Full path to the trx test report

.EXAMPLE
  .\ConvertTo-AzDevOpsTrx.ps1 -trxReportPath .\test.trx
#>

Param (
    [Parameter(Mandatory=$true)]
    [string] $trxReportPath
)

# Need to define our own `Format-XML` as "pscx" module not installed on build agents
function Format-XML ([xml]$xml, $indent=2)
{
    $StringWriter = New-Object System.IO.StringWriter
    $XmlWriter = New-Object System.XMl.XmlTextWriter $StringWriter
    $xmlWriter.Formatting = "indented"
    $xmlWriter.Indentation = $Indent
    $xml.WriteContentTo($XmlWriter)
    $XmlWriter.Flush()
    $StringWriter.Flush()
    Write-Output $StringWriter.ToString()
}

if(-! (Test-Path $trxReportPath)) {
    Write-Error "Unable to find TRX report $trxReportPath"
}

[xml] $xml = Get-Content $trxReportPath;

$xml.TestRun.TestDefinitions.UnitTest | % {
    # Extract Scenario and Feature using Regex match groups
    $matches = [regex]::Match($_.name,'^test "Scenario: (.+)" in fixture "Feature: (.+)"$');

    if($matches.captures.groups.count -lt 2) {
        Write-Warning "Incorrect number of match groups found for name $($_.name), skipping..."
        return;
    }

    $scenario = $matches.captures.groups[1].value;
    $feature = $matches.captures.groups[2].value;

    $_.TestMethod.className = $feature;
    $_.TestMethod.name = $scenario;

    # Change test name to be in format "<Feature> - <Scenario>"
    $_.name = "$scenario - $feature"
};

Format-XML -xml $xml | Out-File $trxReportPath