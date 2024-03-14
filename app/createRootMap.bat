@echo off
setlocal enabledelayedexpansion

REM Define the path for the output text file (in the current directory of the batch file)
set "output_file=%~dp0rootMap.txt"

REM Get the current directory path
set "starting_point=%cd%"

REM Function to recursively list directories within the subtree and format the output as a directory tree
(for /f "delims=" %%i in ('dir "%starting_point%" /s /b /ad') do (
    set "directory=%%i"
    set "directory=!directory:%starting_point%=!"
    echo !directory:~1! >> "%output_file%"
))

echo Directory structure has been written to %output_file%.
pause


