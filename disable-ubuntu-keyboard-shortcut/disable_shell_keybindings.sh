#!/bin/bash

# List key shortcut
# org.gnome.shell.keybindings
shell_keybindings=(
    focus-active-notification
    open-application-menu
    screenshot
    screenshot-window
    shift-overview-down
    shift-overview-up
    show-screen-recording-ui
    show-screenshot-ui
    switch-to-application-1
    switch-to-application-2
    switch-to-application-3
    switch-to-application-4
    switch-to-application-5
    switch-to-application-6
    switch-to-application-7
    switch-to-application-8
    switch-to-application-9
    toggle-application-view
    toggle-message-tray
    toggle-overview
)

# Disable shortcuts
for i in ${shell_keybindings[@]}
do
    echo -e "excute::__ gsettings set org.gnome.shell.keybindings $i "['']" \n"
    gsettings set org.gnome.shell.keybindings $i "['']"
done

