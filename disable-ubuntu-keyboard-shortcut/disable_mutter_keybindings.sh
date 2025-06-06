#!/bin/bash

# List key shortcut
# org.gnome.mutter.keybindings
mutter_keybindings=(
    focus-active-notification
    rotate-monitor
    switch-monitor
    tab-popup-cancel
    tab-popup-select
    toggle-tiled-right
    toggle-tiled-left
)

# Disable shortcuts
for i in ${mutter_keybindings[@]}
do
    echo -e "excute::__ gsettings set org.gnome.mutter.keybindings $i "['']" \n"
    gsettings set org.gnome.mutter.keybindings $i "['']"
done

